import axios from "axios";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

import { logOutUrl } from "../urls";
import { useMessage } from "./useMessage";
import { LoginUserContext } from "../providers/LoginUserProvider";

export const useUserLogOut = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { loginUser, setLoginUser, setUserLoginStatus } = useContext(LoginUserContext);

  const logOut = () => {
    axios
      .delete(logOutUrl, { headers: {
      'uid': loginUser?.uid,
      'access-token': loginUser?.accessToken,
      'client': loginUser?.client,
     }})
      .then(res => {
        setLoginUser(null)
        setUserLoginStatus(false)
        showMessage({title: "ログアウトしました", status: "error"})
        history.push("/login");
      })
      .catch(error => {
        console.log(error);
        showMessage({title: "ログアウトできませんでした", status: "error"})
      })
    };
  return { logOut }
};