import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const Layout = ({ search, setSearch }) => {
  // layout 主要是用來放固定的元件
  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      {/* 其他component 都會以outlet代表，所以在App.js裡面的其他元件都會判定放在outlet 位置 */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
