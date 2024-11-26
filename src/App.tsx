import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/Home';
import Challenges from './pages/challenges/Challenges';
import ChallengeForm from './pages/challenges/ChallengeForm';
import ChallengeDetail from './pages/challenges/ChallengeDetail';
import Posts from './pages/posts/Posts';
import NewPost from './pages/posts/NewPost';
import PostDetail from './pages/posts/PostDetail';
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
import { useSelector } from 'react-redux';
import { RootState } from './RTK/store';
import UpdatePost from './pages/posts/UpdatePost';

export default function App() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/challenges/:id" element={<ChallengeDetail />} />
        <Route path="/challenges/create" element={<ChallengeForm />} />
        <Route path="/challenges/:id/edit" element={<ChallengeForm isEditing={true} />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/new-post" element={user ? <NewPost /> : <Navigate to="sign-in" replace />} />
        <Route path="/posts/detail/:id" element={<PostDetail />} />
        <Route path="/posts/update/:id" element={<UpdatePost />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/message-channels" element={<MessageChannels />} />
        <Route
          path="/my-profile"
          element={user ? <MyProfile /> : <Navigate to="/sign-in" replace />}
        />
        <Route
          path="/edit-profile"
          element={user ? <EditProfile /> : <Navigate to="/sign-in" replace />}
        />
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
