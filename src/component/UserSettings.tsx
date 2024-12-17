/** @format */

import { PatchRequestWithCre } from "../utilz/Request/PatchRequest";
import { GetPostRequestFormDataWithCre } from "../utilz/Request/PatchRequest";

export const updatePassword = async ({
    current_password,
    new_password,
    new_password_confirmation,
    accesstoken,
    refreshtoken,
  }: {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
    accesstoken: string | null;
    refreshtoken: string | null;
  }) => {
    const body = {
      current_password,
      new_password,
      new_password_confirmation,
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
    avatar,
    accesstoken,
    refreshtoken,
  }: {
    name?: string;
    avatar?: File;
    accesstoken: string | null;
    refreshtoken: string | null;
  }) => {
    const formdata = new FormData();
    if (name) formdata.append("name", name);
    if (avatar) formdata.append("avatar", avatar);
  
    return await GetPostRequestFormDataWithCre({
      route: "update-user",
      formdata,
      accesstoken,
      refreshtoken,
    });
  };
  