import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

// 這裡設定useAut回傳AuthProvider的資料(username , pwd)
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
