/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { UserPwUPdateUrl } from "../urls";
import { useMessage } from "./useMessage";
import { LoginUserContext } from "../providers/LoginUserProvider";
import { useLocalStrage } from "./useLocalStrage";

export const useUserPasswordUpdate = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { loginUser, setLoginUser, setUserLoginStatus } =
    useContext(LoginUserContext);
  const [loading, setLoading] = useState(false);
  const { loginUserData } = useLocalStrage();

  const userPasswordUpdate = useCallback(
    (password: string, password_confirmation: string, now_password: string) => {
      setLoading(true);

      axios
        .put(UserPwUPdateUrl, {
          password: password,
          password_confirmation: password_confirmation,
          now_password: now_password,
          uid: loginUser?.uid,
          "access-token": loginUser?.accessToken,
          client: loginUser?.client,
        })
        .then((res) => {
          setLoginUser({
            userId: loginUserData[`user_id`],
            name: loginUserData[`name`],
            email: loginUserData[`email`],
            accessToken: loginUserData[`access-token`],
            client: loginUserData[`client`],
            uid: loginUserData[`uid`],
          });
          showMessage({
            title: "ユーザーのパスワードを更新しました",
            status: "success",
          });
          setUserLoginStatus(true);
          setLoading(false);
          history.push("/mypage");
        })
        .catch((error) => {
          setLoading(false);
          showMessage({
            title: `${error.response.data.messages}`,
            status: "error",
          });
        });
    },
    []
  );
  return { userPasswordUpdate, loading };
};
