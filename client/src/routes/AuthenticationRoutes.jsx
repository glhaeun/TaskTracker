import { lazy } from "react"


import Loadable from "../component/Loadable"
// import Register from "../views/pages/authentication/Register"
// import Login from "../views/pages/authentication/Login"



const Login = Loadable(lazy(()=> import('./../views/pages/authentication/Login')))
const Register = Loadable(lazy(()=> import('./../views/pages/authentication/Register')))

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
      }
    ]
}

export default AuthenticationRoutes