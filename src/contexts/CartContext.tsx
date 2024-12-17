/** @format */

import { ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { GetPostRequestWithCre } from "../utilz/Request/postRequest";
import { DeleteRequestWithCre } from "../utilz/Request/DeteleRequest";
import { PatchRequestWithCre } from "../utilz/Request/PatchRequest";
interface ProductDetail {
  id: number;
  product_id: number;
  price: number;
  size: string;
  stock: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  sold: number;
  rate: number;
  category: string;
}

interface ProductData {
  product_detail: ProductDetail;
  product: Product;
  first_image: string;
  amount: number;
  created_at: string;
  updated_at: string;
}
interface DetailCart {
  productId: string;
  image: string;
  amount: string;
  productdetailId: string;
  category: string;
  size: string;
  name: string;
  price: string;
}

export interface StateContextType {
  cart: DetailCart[] | null | undefined;
  AddCart: (cart: DetailCart) => void;
  DeleteCart: (productdetailId: string) => void;
  MinusCart: (productdetailId: string) => void;
  getTotal: () => number;
}

export const StateContext = createContext<StateContextType>({
  cart: [],
  AddCart: () => {},
  DeleteCart: () => {},
  MinusCart: () => {},
  getTotal: () => 0,
});

interface UserContextProviderProps {
  children: ReactNode;
}

export const CartContextProvider = ({ children }: UserContextProviderProps) => {
  const [cart, setCart] = useState<DetailCart[] | null | undefined>(() => {
    try {
      const saveCart = localStorage.getItem("CART_DATA");
      return saveCart ? JSON.parse(saveCart) : JSON.parse("");
    } catch (error) {
      console.error("Error parsing user data from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    const validate = async () => {
      if (localStorage.getItem("TOKEN")) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL_SERVER}/api/carts`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
              },
              credentials: "include",
            }
          );
          if (response.ok) {
            const data = await response.json();
            const temp =
              (data?.data?.length > 0 &&
                data?.data?.map((cart: ProductData) => {
                  return {
                    productId: cart.product.id,
                    image: cart.first_image,
                    amount: cart.amount,
                    productdetailId: cart.product_detail.id.toString(),
                    size: cart.product_detail.size,
                    name: cart.product.name,
                    price: cart.product_detail.price,
                    category: cart.product.category,
                  };
                })) ||
              [];
            setCart(temp);
          }
        } catch (error) {
          console.error("Token validation error", error);
        }
      }
    };

    validate();
  }, []);
  const AddCart = async (Cart: DetailCart) => {
    if (Cart) {
      const safeCartData = {
        productId: Cart.productId,
        image: Cart.image,
        amount: Cart.amount,
        productdetailId: Cart.productdetailId,
        size: Cart.size,
        name: Cart.name,
        price: Cart.price,
        category: Cart.category,
      };
      console.log(safeCartData);

      const tempdata =
        !cart?.find(
          (c) => c.productdetailId === safeCartData.productdetailId
        ) || cart.length === 0
          ? cart?.concat([safeCartData])
          : cart.map((c) => {
              if (c.productdetailId === safeCartData.productdetailId)
                return { ...c, amount: (Number(c.amount) + 1).toString() };
              return c;
            });
      localStorage.setItem("CART_DATA", JSON.stringify(tempdata));

      setCart(tempdata);
      if (localStorage.getItem("TOKEN")) {
        try {
          await GetPostRequestWithCre({
            route: "api/carts",
            token: localStorage.getItem("TOKEN"),
            body: {
              product_detail_id: Number(Cart.productdetailId),
              amount: Number(
                cart?.find((c) => c.productdetailId === Cart.productdetailId)
                  ?.amount || 0 + 1
              ),
            },
          });
        } catch (error) {
          console.error("Token validation error", error);
        }
      }
    }
  };
  const DeleteCart = async (productdetailId: string) => {
    const tempdata = cart?.filter((c) => c.productdetailId !== productdetailId);
    localStorage.setItem("CART_DATA", JSON.stringify(tempdata));
    setCart(tempdata);
    if (localStorage.getItem("TOKEN")) {
      try {
        await DeleteRequestWithCre({
          route: `api/carts/${productdetailId}`,
          token: localStorage.getItem("TOKEN"),
        });
      } catch (error) {
        console.error("Token validation error", error);
      }
    }
  };
  const getTotal = () => {
    const total = cart?.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.amount),
      0
    );
    return total || 0;
  };
  const MinusCart = async (productdetailId: string) => {
    let Amount = 0;
    const updatedCart = cart
      ?.map((c) => {
        if (c.productdetailId === productdetailId) {
          const updatedAmount = Number(c.amount || 0) - 1;
          Amount = updatedAmount;
          return updatedAmount > 0
            ? { ...c, amount: updatedAmount.toString() }
            : null;
        }
        return c;
      })
      .filter((item): item is DetailCart => item !== null); // Type guard to remove `null`

    localStorage.setItem("CART_DATA", JSON.stringify(updatedCart));
    setCart(updatedCart);
    if (localStorage.getItem("TOKEN")) {
      try {
        console.log("Số sản phẩm còn lại ");
        if (Amount < 1) return DeleteCart(productdetailId);
        await PatchRequestWithCre({
          route: `api/carts/${productdetailId}`,
          token: localStorage.getItem("TOKEN"),
          body: {
            amount:
              Number(
                cart?.find((c) => c.productdetailId === productdetailId)
                  ?.amount || 0
              ) + -1,
          },
        });
      } catch (error) {
        console.error("Token validation error", error);
      }
    }
  };
  return (
    <StateContext.Provider
      value={{
        MinusCart,
        cart,
        getTotal,
        AddCart,
        DeleteCart,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStateCartContext = () => {
  return useContext(StateContext);
};
