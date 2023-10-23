import { lazy } from "react"
import Loadable from "../component/Loadable"

const Login = Loadable(lazy(()=> import('../views/pages/authentication/Login')))
const Register = Loadable(lazy(()=> import('../views/pages/authentication/Register')))
const ForgotPassword = Loadable(lazy(()=> import('../views/pages/authentication/ForgotPassword')))
const CheckEmail = Loadable(lazy(()=>import('../views/pages/authentication/CheckEmail')))
const ChangePassword = Loadable(lazy(()=>import('./../views/pages/authentication/ChangePassword')))


const AuthenticationRoutes = {
    path: '/',
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />
      },
      {
        path: '/check-email',
        element: <CheckEmail />
      },
      ,
      {
        path: '/change-password/:id/:uniqueString',
        element: <ChangePassword />
      },
    ]
}

export default AuthenticationRoutes