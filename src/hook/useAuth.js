import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

// 這裡會收到provider 裡面設定Auth 的資料(username , pwd)
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
