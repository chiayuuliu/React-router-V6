import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import Layout from "./Layout";
import LayoutProtected from "./LayoutProtected";

// 登入表單驗證練習
import Register from "./Register";
import Login from "./Login";

// 保護路由練習
import LinkPage from "./component/LinkPage";
import Editor from "./component/Editor";
import Admin from "./component/Admin";
import Lounge from "./component/Lounge";
import Unauthorized from "./component/Unauthorized";
import HomeProtect from "./component/HomeProtect";
import LoginProtect from "./component/LoginProtect";
// 權限
import RequireAuth from "./component/RequireAuth";

// 開關燈切換練習
import Form from "./component/Form";
import { createContext } from "react";

export const ThemeContext = createContext(null);

function App() {
  // 開關燈設計，預設一開始是light
  const [theme, setTheme] = useState("light");

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
  ]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  // 網頁跳轉改history>navigate
  const navigate = useNavigate();

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle("");
    setPostBody("");
    // 改用navigate
    navigate("/");
  };

  const handleDelete = (id) => {
    const postsList = posts.filter((post) => post.id !== id);
    setPosts(postsList);
    navigate("/");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Routes>
        {/* 在這個Layout 底下，頁面的樣子都會長成跟layout 裡的架構一樣 */}
        <Route
          path="/"
          element={<Layout search={search} setSearch={setSearch} />}
        >
          <Route index element={<Home posts={searchResults} />} />
          {/* 根目錄同樣是以post 開頭的可以用巢狀方式寫路由 */}
          <Route path="post">
            {/*  index 表示url 是/post 的畫面(post 的根目錄) */}
            <Route
              index
              element={
                <NewPost
                  handleSubmit={handleSubmit}
                  postTitle={postTitle}
                  setPostTitle={setPostTitle}
                  postBody={postBody}
                  setPostBody={setPostBody}
                />
              }
            />
            {/* 因為根目錄是post 所以後面只要接:id即可 */}
            <Route
              path=":id"
              element={<PostPage posts={posts} handleDelete={handleDelete} />}
            />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        {/* 保護機制路由 */}
        <Route path="/protect" element={<LayoutProtected />}>
          {/* Public Routes */}
          <Route path="login" element={<LoginProtect />} />
          <Route path="register" element={<Register />} />
          <Route path="linkpage" element={<LinkPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* 私人路由 */}
          {/* require Auth 裡面會設定 看有沒有auth user資料，有的話就先是以下component，沒有資料的話就轉向登入頁 
        因為根目錄就是需要登入，所以會直接被跳轉到登入頁*/}
          <Route element={<RequireAuth />}>
            {/* 以下元件不用多做設定 */}
            <Route index element={<HomeProtect />} />
            <Route path="editor" element={<Editor />} />
            <Route path="admin" element={<Admin />} />
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>
        {/* 開關燈練習 */}
        <Route path="switch" element={<Form />}></Route>
        <Route path="*" element={<Missing />} />
      </Routes>
    </ThemeContext.Provider>
  );
}

export default App;
