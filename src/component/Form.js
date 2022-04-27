import React, { useContext } from "react";
import ReactSwitch from "react-switch";
// 寫在app 裡面的provider 還是可以被引用
import { ThemeContext } from "../App";

function Form() {
  // useContext()裡面包提供資料的Provider
  const { theme, setTheme } = useContext(ThemeContext);
  // toggle function
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <div className="App" id={theme}>
      <div className="main">
        <p className="sign" align="center">
          Sign in
        </p>
        <form className="form1">
          <input className="username" type="text" placeholder="Username" />
          <input className="password" type="password" placeholder="Password" />
          <a className="submit" align="center">
            Sign in
          </a>
          <p className="forgot" align="center">
            <a href="#">Forgot Password? </a>
          </p>
        </form>
        <div className="switch">
          <label>{theme === "light" ? "Light mode" : "Dark Mode"}</label>
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        </div>
      </div>
    </div>
  );
}

export default Form;
