/** @format */

export const GetPostRequest = async ({
  route,
  body,
}: {
  route: string;
  body: object;
}) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL_SERVER}/${route}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (response.ok) {
      return { success: true, data: await response.json(), response };
    } else {
      const data = await response.json();
      throw new Error((await data?.msg) || " Lấy dữ liệu ko thành công");
    }
  } catch (e) {
    if (e instanceof Error) {
      return { success: false, msg: e.message };
    } else return { success: false, msg: "Lỗi khi lấy dữ liệu" };
  }
};
export const GetPostRequestWithCre = async ({
  route,
  body,
  token,
}: {
  route: string;
  body: object;
  token: string | null;
}) => {
  console.log("Hello");
  try {
    if (token) {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL_SERVER}/${route}`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Properly format Authorization header
          },
          credentials: "include",
          body: JSON.stringify(body),
        }
      );
      if (response.ok) {
        return { success: true, data: await response.json() };
      } else {
        const data = await response.json();
        throw new Error((await data?.msg) || " Lấy dữ liệu ko thành công");
      }
    } else throw new Error("Xác thực thất bại vui lòng thử lại");
  } catch (e) {
    if (e instanceof Error) {
      return { success: false, msg: e.message };
    } else return { success: false, msg: "Lỗi khi lấy dữ liệu" };
  }
};
export const GetPostRequestFormDataWithCre = async ({
  route,
  formdata,
  token,
}: {
  route: string;
  formdata: FormData;
  token: string | null;
}) => {
  try {
    if (token) {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL_SERVER}/${route}`,

        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: formdata,
        }
      );
      if (response.ok) {
        return { success: true, data: await response.json() };
      } else {
        const data = await response.json();
        throw new Error((await data?.msg) || " Lấy dữ liệu ko thành công");
      }
    } else throw new Error("Xác thực thất bại vui lòng thử lại");
  } catch (e) {
    if (e instanceof Error) {
      return { success: false, msg: e.message };
    } else return { success: false, msg: "Lỗi khi lấy dữ liệu" };
  }
};
