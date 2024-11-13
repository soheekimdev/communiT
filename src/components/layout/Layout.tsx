import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="flex-1 max-h-screen overflow-y-auto">
      <Header />
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
