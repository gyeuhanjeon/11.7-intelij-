import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './project/pages/Main';
import Login from './project/Login/Login';
import MyPage from './project/pages/MyPage';
import MemberInfo from './project/pages/MemberInfo';
import MemberDrop from './project/pages/MemberDrop';
import SignUp from './project/SingUp/SignUp';
import Exam from './project/pages/Exam';
import Navbar2 from './project/Navbar/Navbar2';
import Home from './project/HOME/Home';
import MessageList from './project/HOME/MessageList';
// import FileUpload from './ImageTest/ImageTest'; // 이거는 되는 거임
// import FileUpload from './ImageTest/ImageTest2';
// import ImageUpload from './ImageTest/ImageTest4';
// import ImageUpload from './ImageTest/ImageTest5';
// import ImageUpload from './ImageTest/ImageUpload';
// import FileUpload from './ImageTest/FileUpload';
// import ImageTest9 from './ImageTest/ImageTest9';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar2 />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/MemberInfo' element={<MemberInfo />} />
        <Route path='/MemberDrop' element={<MemberDrop />} />
        <Route path='/Exam' element={<Exam />} />
        {/* 아래부터는 조혜경이 추가 */}
        <Route path='/MessageList' element={<MessageList />} />
        {/* 아래부터는 테스트 중 */}

      </Routes>
    </Router>
  );
}

export default App;