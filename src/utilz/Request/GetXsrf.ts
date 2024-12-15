/** @format */
export default async function GetXsrf() {
   await fetch(`${import.meta.env.VITE_API_URL_SERVER}/sanctum/csrf-cookie`,{
    method: "GET",
    credentials: 'include',
  })
}
