import React, { useRef, useState, useEffect, useContext } from "react";
import useAuth from "./hook/useAuth";
// 用Context 的寫法
// import AuthContext from "./context/AuthProvider";

const Login = () => {
  // 從AuthContext裡面拿setAuth，AuthContext裡面有AuthProvider，在index,js 外層包了<AuthProvider>，所以裡面的元件都可以取用Provider裡的資料
  // const { setAuth } = useContext(AuthContext);
  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // 網頁載入時focus使用者input
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // 帳號密碼有誤時清空錯誤訊息
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  // 送到後端驗證
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 這裡會設定Auth
    setAuth({ user, pwd });
    console.log("user, pwd", user, pwd);
    setSuccess(true);
    setUser("");
    setPwd("");
  };
  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in !</h1>
          <br />
          <p>
            <a href="/"> Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            // ref={errRef}這邊要設定focus，網頁的導讀才會發音出來
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            // 網頁導讀設置(maybe for 盲人)
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => {
                setUser(e.target.value);
              }}
              value={user}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account? <br />
            <span>
              <a href="register">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
