import React, { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  // 使用者名稱/判斷是否為有效名稱
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  // 密碼/判斷是否為有效密碼
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  // 確認密碼/判斷兩次密碼是否符合
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // **研究useRef
  useEffect(() => {
    // 當網頁載入的時候username 的欄位會自動focus
    userRef.current.focus();
  }, []);

  //   判斷username 是否正確格式
  useEffect(() => {
    // result 會是收到布林值
    const result = USER_REGEX.test(user);
    console.log("result", result);
    console.log("user", user);
    setValidName(result);
  }, [user]);

  //   判斷密碼格式＆兩次密碼是否吻合
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log("result", result);
    console.log("pwd", pwd);
    setValidPwd(result);
    // 判斷兩次密碼是否一致，是的話設定為true
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  // 如果使用者在更動user , pwd 就把錯誤訊息先清空
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Register</h1>
      <form>
        <label htmlFor="username">
          Username:
          {/* 有效名子會顯示 */}
          <span className={validName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          {/* 非有效name 且 user input 是空值就要隱藏X，但如果非有效name 但input 有值就要顯示X */}
          <span className={validName || !user ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => {
            setUser(e.target.value);
          }}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <p
          id="uidnote"
          className={
            userFocus && user && !validName ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters. <br />
          Must begin with a letter. <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>

        {/* 密碼區 */}
        <label htmlFor="password">
          Password:
          <span className={validPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPwd || !pwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => {
            setPwd(e.target.value);
          }}
          required
          // **研究aria-invalid屬性
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        {/* 密碼要包含大小寫跟數字以及特殊符號 */}
        {/* 當密碼input 被focus 且 還未輸入有效密碼時，顯示密碼設定的規則，當密碼成立時取消顯示密碼規則 */}
        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters. <br />
          Must include uppercase and lowercase letters, a number ans a special
          characters.
          <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>

        {/* 密碼確認欄位 */}
        <label htmlFor="confirm_pwd">
          Confirm Password:
          <span className={validMatch && matchPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="confirm_pwd"
          onChange={(e) => {
            setMatchPwd(e.target.value);
          }}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
        </p>
        {/* 如果沒有名稱、密碼、密碼不符，button 設定 disable */}
        <button
          // disabled={!validName || !validPwd || !validMatch ? true : false}
        >
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default Register;
