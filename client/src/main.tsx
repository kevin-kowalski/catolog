import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import './index.css';
import App from './App';
import Single from './components/Single';
import { AuthProvider, RequireAuth } from 'react-auth-kit';
import LogIn from './components/authentication/LogIn';
import LogOut from './components/authentication/LogOut';
import Register from './components/authentication/Register';
import Overview from './components/Overview';

const router = createBrowserRouter([
  {
    path: '/',
    element: (<RequireAuth loginPath='/authentication/login'>
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
    element: (<RequireAuth loginPath='/authentication/login'>
                <LogOut />
              </RequireAuth>),
    errorElement: <ErrorPage />,
  },
  {
    path: '/model/:modelId',
    element: (<RequireAuth loginPath='/authentication/login'>
                <Single model={null}/>
              </RequireAuth>),
    errorElement: <ErrorPage />,
  },
  {
    path: '/category/:categoryName',
    element: (<RequireAuth loginPath='/authentication/login'>
                {/* <List models={null}/> */}
                <Overview></Overview>
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
