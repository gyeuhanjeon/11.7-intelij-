import { Link } from "react-router-dom";
import '../CSS/Style_Login.css';

function Main() {
  // ▼ 로그인되어 있으면 바로 HOME 으로 이동
  const isLogin = window.localStorage.getItem("isLogin");
  if(isLogin === "TRUE") window.location.replace("/home");
  // ▲ 로그인되어 있으면 바로 HOME 으로 이동

  return(
    <div className="Container">
      <div> 엠비티아이셔</div>
      <span><Link to="/login"><button>시작하기</button></Link></span>
    </div>
  );
}
export default Main;