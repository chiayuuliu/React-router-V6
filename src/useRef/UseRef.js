import React, { useRef } from "react";

const UseRef = () => {
  // 在ref 屬性裡面包inputRef，可以獲取input 的value
  const inputRef = useRef(null);

  const onClick = () => {
    // 得到裡面的值
    console.log(inputRef.current.value);
  };
  const focus = () => {
    // 讓input 欄位被focus
    inputRef.current.focus();
  };
  const clear = () => {
    // 讓input 的value被清空
    inputRef.current.value = "";
  };
  return (
    <div>
      <h1>Name</h1>
      <input type="text" placeholder="Ex..." ref={inputRef} />

      <button onClick={onClick}>Change Name</button>
      <br />
      <button onClick={focus}>Focus input</button>
      <br />
      <button onClick={clear}>clear input value</button>
    </div>
  );
};

export default UseRef;
