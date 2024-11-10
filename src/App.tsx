import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/Home';
import Challenges from './pages/Challenges';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import Notifications from './pages/Notifications';
import MessageChannels from './pages/MessageChannels';
import MyProfile from './pages/profile/MyProfile';
import EditProfile from './pages/profile/EditProfile';
import Signin from './pages/Signin';
import SignUp from './pages/Signup';
import FindPassword from './pages/FindPassword';
import FindEmail from './pages/account/FindEmail';
import ChangePassword from './pages/account/ChangePassword';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/detail/:id" element={<PostDetail />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/message-channels" element={<MessageChannels />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="account">
          <Route path="find-email" element={<FindEmail />} />
          <Route path="reset-password" element={<ChangePassword />} />
        </Route>
      </Route>
    </Routes>
  );
}
