import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from "./login/login";
import Home from "./main/home";
import MapSearch from './map/map';
// import Pause from "./startpage/pause";
import BeforeStart from './startpage/BeforeStart'
import Group from "./group/group";
import MyPage from "./mypage/mypage";
import Signup from './signup/Signup';
import Signup2 from "./signup/Signup2";
import Signup3 from "./signup/Signup3";
import Signup4 from "./signup/Signup4";
import Write from "./main/write"; 
import Notice from './main/notice';
import Friend from './main/friend';
import Follower from './mypage/follower';
import Following from './mypage/following';
import GroupDetail from './group/group_detail';
import MyGroup from './mypage/mygroup';
import Unfinished_route from './startpage/Unfinished_route';
import Start from './startpage/Start'
import ProtectedRoute from './ProtectedRoute.jsx';
import { TokenProvider } from './context/tokenContext.jsx';


export default function App() {
  return (
      <TokenProvider>
        <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup2" element={<Signup2 />} />
            <Route path="/signup3" element={<ProtectedRoute><Signup3/></ProtectedRoute>} />
            <Route path="/signup4" element={<ProtectedRoute><Signup4 /></ProtectedRoute>} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/map" element={<ProtectedRoute><MapSearch /></ProtectedRoute>} />
            <Route path="/BeforeStart" element={<ProtectedRoute><BeforeStart /></ProtectedRoute>} />
            <Route path="/Start" element={<ProtectedRoute><Start /></ProtectedRoute>} />
            <Route path="/Unfinished_route" element={<ProtectedRoute><Unfinished_route /></ProtectedRoute>} />
            <Route path="/group" element={<ProtectedRoute><Group /></ProtectedRoute>} />
            <Route path="/mypage" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
            <Route path="/write" element={<ProtectedRoute><Write /></ProtectedRoute>} />
            <Route path="/notice" element={<ProtectedRoute><Notice /></ProtectedRoute>} />
            <Route path="/friend" element={<ProtectedRoute><Friend /></ProtectedRoute>} />
            <Route path="/follower" element={<ProtectedRoute><Follower /></ProtectedRoute>} />
            <Route path="/following" element={<ProtectedRoute><Following /></ProtectedRoute>} />
            <Route path="/group_detail" element={<ProtectedRoute><GroupDetail /></ProtectedRoute>} />
            <Route path="/mygroup" element={<ProtectedRoute><MyGroup /></ProtectedRoute>} />
      </Routes>
      </TokenProvider>

  );
}