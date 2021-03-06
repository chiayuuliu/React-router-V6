import { useNavigate, Link, useLocation } from "react-router-dom";

const Missing = () => {
  const navigate = useNavigate();
  const location = useLocation()
  console.log('location.state',location.state?.from)

//   設定過一秒後回首頁
//   useEffect(() => {
//     setTimeout(() => {
//       navigate("/");
//     }, 1000);
//   }, [navigate]);
  return (
    <main className="Missing">
      <h2>Page Not Found</h2>
      <p>Well, that's disappointing.</p>
      {/* 手動點擊回首頁 */}
      <p><Link to={`/`}>回首頁</Link></p>

      {/* 直接跳轉回首頁 */}
      {/* <Navigate to={"/"} /> */}
    </main>
  );
};

export default Missing;
