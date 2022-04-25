import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthProvider";
import axios from "./api/axios";

const Login = () => {
  const Login_URL = "/Membership/Login";

  // 從AuthContext裡面拿setAuth，AuthContext裡面有AuthProvider
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // 網頁載入時在使用者
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
    try {
      const response = await axios.post(
        Login_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err.message);
    }
    console.log(user, pwd);
    setUser("");
    setPwd("");
    setSuccess(true);
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
