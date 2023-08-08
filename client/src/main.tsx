import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Root from './routes/root';
import ErrorPage from './components/ErrorPage';
import './index.css';
import App from './App';
import Single from './components/Single';
import { AuthProvider, RequireAuth } from 'react-auth-kit';
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';
import Register from './components/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: (<RequireAuth loginPath='/login'>
                <App />
              </RequireAuth>),
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <Register/>,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LogIn/>,
    errorElement: <ErrorPage />,
  },
  {
    path: '/logout',
    element: (<RequireAuth loginPath='/login'>
                <LogOut />
              </RequireAuth>),
    errorElement: <ErrorPage />,
  },
  {
    path: '/models/:modelId',
    element: (<RequireAuth loginPath='/login'>
                <Single model={null}/>
              </RequireAuth>),
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider authType={'cookie'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === 'https:'}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
