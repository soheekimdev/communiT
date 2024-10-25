import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { SidebarProvider } from './components/ui/sidebar';
import AppSidebar from './components/layout/app-sidebar';
import HomePage from './pages/home';
import Challenges from './pages/challenges';
import Posts from './pages/posts';
import Notifications from './pages/notifications';
import MessageChannels from './pages/message-channels';
import Header from './components/layout/header';
import MyProfile from './components/cards/my-profile';
import EditProfile from './components/cards/edit-profile';

const userName = '김홍삼';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 max-h-screen overflow-y-auto">
            <Header userName={userName} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/message-channels" element={<MessageChannels />} />
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
            </Routes>
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
