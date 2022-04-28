import React, { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      // 設定回傳的資料
      return { count: state.count + 1 };
    case "minus":
      return { count: state.count - 1 };
    case "toggle":
      return { count: state.count, showText: !state.showText };
    //   預設回傳整個state
    default:
      return state;
  }
};

const Reducer = () => {
  // useReducer (reducer(名子可改，改的話上面的reducer func 也要同步改變), 初始值狀態(count 是0，設定文字顯示true)
  const [state, dispatch] = useReducer(reducer, { count: 0, showText: true });

  return (
    <div>
      <h1>{state.count}</h1>
      <button
        onClick={() => {
          //  這裡會設定要執行哪個action
          dispatch({ type: "toggle" });
        }}
      >
        Click Here
      </button>
      <button
        onClick={() => {
          dispatch({ type: "add" });
        }}
      >
        Add
      </button>
      <button
        onClick={() => {
          dispatch({ type: "minus" });
        }}
      >
        minus
      </button>

      {state.showText && <p>This is a text</p>}
    </div>
  );
};

export default Reducer;
