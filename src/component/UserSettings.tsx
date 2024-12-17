/** @format */

import { PatchRequestWithCre } from "../utilz/Request/PatchRequest";
import { GetPostRequestFormDataWithCre } from "../utilz/Request/PatchRequest";

export const updatePassword = async ({
    email,
    password,
    password_confirmation,
    accesstoken,
    refreshtoken,
  }: {
    email: string;
    password: string;
    password_confirmation: string;
    accesstoken: string | null;
    refreshtoken: string | null;
  }) => {
    const body = {
        email,
        password,
        password_confirmation,
    };
    return await PatchRequestWithCre({
      route: "update-password", 
      body,
      accesstoken,
      refreshtoken,
    });
  };
  
  export const updateUser = async ({
    name,
    email,
    avatar,
    accesstoken,
    refreshtoken,
  }: {
    name?: string;
    email?: string;
    avatar?: File;
    accesstoken: string | null;
    refreshtoken: string | null;
  }) => {
    const formdata = new FormData();
    if (name) formdata.append("name", name);
    if (email) formdata.append("email", email);
    if (avatar) formdata.append("avatar", avatar);
  
    return await GetPostRequestFormDataWithCre({
      route: "update-user",
      formdata,
      accesstoken,
      refreshtoken,
    });
  };
  