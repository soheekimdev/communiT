import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { SidebarProvider } from './components/ui/sidebar';
import { Provider } from 'react-redux';
import AppSidebar from './components/layout/app-sidebar';
import App from './App.tsx';
import store from './RTK/store.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <SidebarProvider>
          <AppSidebar />
          <App />
        </SidebarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
);
