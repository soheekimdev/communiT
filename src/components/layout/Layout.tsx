import { Outlet } from 'react-router-dom';
import Header from './Header';

const userName = '김홍삼';

const Layout = () => {
  return (
    <div className="flex-1 max-h-screen overflow-y-auto">
      <Header userName={userName} />
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
