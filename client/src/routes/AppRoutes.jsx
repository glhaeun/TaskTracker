import {lazy} from 'react'
import Loadable from "../component/Loadable"

import MainLayout from '../layouts/MainLayout'

const Dashboard = Loadable(lazy(()=> import('./../views/pages/dashboard')))
const ToDo = Loadable(lazy(()=> import('./../views/pages/todo2')))


const AppRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: 'dashboard',
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />
          }
        ]
      },
      {
        path: 'todo',
        children: [
          {
            path: '/todo',
            element: <ToDo />
          }
        ]
      },
    ]
  };
  

export default AppRoutes