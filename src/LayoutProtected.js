import React from "react";
import { Outlet } from "react-router-dom";

// 權限路由設定
const LayoutProtected = () => {
  return (
    <div className="App protectRoute">
      <h1>Protected route</h1>
      <Outlet />
    </div>
  );
};

export default LayoutProtected;
