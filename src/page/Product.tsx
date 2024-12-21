/** @format */

import { Search } from "lucide-react";
import { InfinitySpin } from "react-loader-spinner";
import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import { motion } from "framer-motion";

// Import SVG assets
import plus from "../assets/icon/plus.svg";
import minus from "../assets/icon/minus.svg";
import price from "../assets/icon/price.svg";
import color from "../assets/icon/color.svg";
import Numb from "../assets/icon/numb.svg";

// Import components
import ProductItem from "../component/ProductItem";
import ProductItem3D from "../component/ProductItem3D";
import {
  SizeFilter,
  AmountFilter,
  CategoryFilter,
  PriceFilter,
} from "../component";
import ColorFilter from "../component/colorFilter";
import { GetRequest } from "../utilz/Request/getRequest";

// Types
interface OpenFilter {
  size: boolean;
  color: boolean;
  amount: boolean;
  category: boolean;
  price: boolean;
}

interface Image {
  id: number;
  product_id: number;
  image_link: string;
  created_at: string;
  updated_at: string;
}

interface Filter {
  size: string;
  color: string;
  amount: string;
  category: string;
  price: string;
  name: string;
  pageCount: number;
}

interface ProductDetail {
  id: number;
  product_id: number;
  stock: number;
  price: number;
  size: string;
  created_at: string;
  updated_at: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  sold: number;
  rate: number;
  category: string;
  created_at: string;
  updated_at: string;
  product_details: ProductDetail[];
  images: Image[];
}

export default function Product() {
  const [isOpen, setIsOpen] = useState<OpenFilter>({
    size: false,
    color: false,
    amount: false,
    category: false,
    price: false,
  });

  const [filterProduct, setFilterProduct] = useState<Product[]>([]);
  const [filter, setFilter] = useState<Filter>({
    size: "all",
    color: "all",
    amount: "all",
    category: "all",
    price: "all",
    name: "",
    pageCount: 1,
  });

  const [sort, setSort] = useState<string>("price");
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setFilter((prev) => ({ ...prev, name: value, pageCount: 1 }));
    }, 500),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const queryParams = new URLSearchParams();

    if (filter.size !== "all") {
      queryParams.append("filter[size]", filter.size);
    }

    if (filter.price !== "all" && typeof filter.price === "string") {
      const [min, max] = filter.price
        .split("-")
        .map((p) => p.replace(/\./g, ""));
      queryParams.append("filter[price][0]", min);
      queryParams.append("filter[price][1]", max);
    }

    if (filter.name) {
      queryParams.append("filter[name]", filter.name);
    }

    if (filter.color !== "all") {
      queryParams.append("filter[color]", filter.color);
    }

    if (filter.category !== "all") {
      queryParams.append("filter[category]", filter.category);
    }

    const url = `api/products?${queryParams.toString()}&sort=${sort}&page=${
      filter.pageCount
    }`;

    try {
      const response = await GetRequest({ route: url });
      if (!response.success) {
        throw new Error("Failed to fetch products");
      }

      setTotalPages(response.data.total_pages);
      setTotalItems(response.data.total_items);
      setFilterProduct(response.data.data);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      // Consider adding error state and UI feedback
    } finally {
      setLoading(false);
    }
  }, [filter, sort]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const toggleFilter = (key: keyof OpenFilter) => {
    setIsOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderPagination = () => {
    if (!filterProduct?.length) {
      return <p className="text-2xl font-light">Không tìm thấy sản phẩm nào</p>;
    }

    return (
      <div className="flex space-x-3">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() =>
              setFilter((prev) => ({ ...prev, pageCount: index + 1 }))
            }
            className={`px-3.5 py-1 border font-thin border-black ${
              filter.pageCount === index + 1 ? "scale-110 border-2" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex md:container md:mx-auto px-4 py-12">
        {/* Sidebar Filters */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-1/5 hidden md:block font-light text-md py-12"
        >
          {[
            {
              title: "SIZE ĐỒ",
              component: (
                <SizeFilter
                  changeLoading={setLoading}
                  filter={filter}
                  changefilter={setFilter}
                />
              ),
              key: "size",
            },
            {
              title: "MÀU SẮC",
              component: (
                <ColorFilter
                  filter={filter}
                  changefilter={setFilter}
                />
              ),
              key: "color",
            },
            {
              title: "SỐ LƯỢNG",
              component: (
                <AmountFilter
                  filter={filter}
                  changefilter={setFilter}
                />
              ),
              key: "amount",
            },
            {
              title: "CATEGORIES",
              component: (
                <CategoryFilter
                  filter={filter}
                  changefilter={setFilter}
                />
              ),
              key: "category",
            },
            {
              title: "MỨC GIÁ",
              component: (
                <PriceFilter
                  filter={filter}
                  changefilter={setFilter}
                />
              ),
              key: "price",
            },
          ].map(({ title, component, key }) => (
            <div
              key={key}
              className="py-5 border-b-2"
            >
              <div
                onClick={() => toggleFilter(key as keyof OpenFilter)}
                className="flex justify-between items-center cursor-pointer w-full"
              >
                <div>{title}</div>
                <div>
                  <img
                    src={!isOpen[key as keyof OpenFilter] ? plus : minus}
                    alt={`Toggle ${key} filter`}
                    className="w-7 h-7"
                  />
                </div>
              </div>
              {isOpen[key as keyof OpenFilter] && component}
            </div>
          ))}
        </motion.div>

        {/* Product Grid */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full"
        >
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between items-center">
            <h5 className="font-light text-xl">
              Danh sách sản phẩm <span>({totalItems})</span>
            </h5>

            <div className="flex space-x-4">
              <div className="relative w-full">
                <Search className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full border border-gray-700 rounded-md py-1 px-2 text-sm md:text-base md:py-3 md:px-6 font-light pl-8 md:pl-14 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>

              <select
                className="border border-gray-700 rounded-md py-1 px-2 text-sm md:text-base md:py-3 md:px-6 font-light"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="price">giá thấp đến cao</option>
                <option value="-price">giá cao xuống thấp</option>
                <option value="-rate">Đánh giá cao nhất</option>
                <option value="-sold">Bán chạy nhất</option>
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          <div className="md:hidden py-4 flex space-x-2">
            {[
              { title: "SỐ LƯỢNG", icon: Numb },
              { title: "MÀU SẮC", icon: color },
              { title: "MỨC GIÁ", icon: price },
            ].map(({ title, icon }, idx) => (
              <button
                key={idx}
                className="flex space-x-1 border p-2 items-center rounded-md text-sm border-gray-400"
              >
                <img
                  src={icon}
                  alt={title}
                  className="w-4 h-4"
                />
                <div className="text-xs">{title}</div>
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center">
            {loading ? (
              <div className="pt-12">
                <InfinitySpin
                  width="200"
                  color="#000000"
                />
              </div>
            ) : (
              <>
                {filter.category !== "custom" ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:p-8">
                      {filterProduct?.map((product) => (
                        <ProductItem
                          key={product.id}
                          product={product}
                        />
                      ))}
                    </div>
                    {renderPagination()}
                  </>
                ) : (
                  <ProductItem3D />
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
