import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hook/useAuth";

// 這裡的RequireAuth 是layout 的一種，
const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  //   如果有user 資料表示有登入，有的話就呈現outlet 元件，沒有登入的話轉向登入頁面，並傳遞從哪裡來的資料到login頁面
  console.log('auth', useAuth() )
  return auth?.user ? (
    <Outlet />
  ) : (
    <Navigate to="/protect/login" state={{ from: location }} replace />
  );

  // 如果有不同權限身份可以寫以下方式：(要從父層傳入allowedRoles obj)，如果有登入但沒權限，就顯示unauthorized page，每個權限的路由要外包一個RequireAuth傳入特定的要從父層傳入allowedRoles
  /*
  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/protect/login" state={{ from: location }} replace />
  );
  */
};

export default RequireAuth;
