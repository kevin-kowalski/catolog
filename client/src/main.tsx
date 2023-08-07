import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Root from './routes/root';
import ErrorPage from './components/ErrorPage';
import './index.css';
import App from './App';
import Single from './components/Single';
import { AuthProvider } from 'react-auth-kit';
import LogIn from './components/LogIn';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LogIn/>,
    errorElement: <ErrorPage />,
  },
  {
    path: '/models/:modelId',
    element: <Single model={null}/>,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider authType={'cookie'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === 'https:'}
    >
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
