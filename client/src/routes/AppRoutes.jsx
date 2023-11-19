import { lazy } from 'react';
import Loadable from "../component/Loadable";
import { Navigate } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import PrivateRoute from './PrivateRoutes';

import {
  QuickNotes,
  ArchiveNotes,
  DeletedNotes
} from "../views/pages/finalNotes/index";

import Calendar from "../views/pages/calendar";

import BudgetDashboard from '../views/pages/budget/budgetDash';
import BudgetPage from '../views/pages/budget/BudgetPage';
import ExpensesPage from '../views/pages/budget/ExpensesPage';

const ToDo2 = Loadable(lazy(()=> import('../views/pages/finalTodo')))
const Error = Loadable(lazy(()=> import('../views/error')))
const Journal2 = Loadable(lazy(()=> import('../views/pages/finalJournal')))



const AppRoutes = {
    path: '/',
    element: <PrivateRoute element={<MainLayout />} />,
    children: [
      {
        path: '/',
        element: <PrivateRoute element={<ToDo2 />} />
      },
      {
        path: 'todo',
        children: [
          {
            path: '/todo',
            element: <PrivateRoute element={<ToDo2 />} />
          }
        ]
      },
      {
        path: 'quicknotes',
        children: [
          {
            path: '',
            element: <PrivateRoute element={<QuickNotes />} />,
          },
          {
            path: 'archived',
            element: <PrivateRoute element={<ArchiveNotes />} />,
          },
          {
            path: 'deleted',
            element: <PrivateRoute element={<DeletedNotes />} />,
          },
        ],
      },
      {
        path: 'journal',
        children: [
          {
            path: '/journal',
            element: <PrivateRoute element={<Journal2 />} />,
          }
        ],
      },
      {
        path: 'budget', 
        children: [
          {
            path: '',
            element: <PrivateRoute element={<BudgetDashboard />} />,
          },
          {
            path: ':budgetId', 
            element: <PrivateRoute element={<BudgetPage />} />,
          },
          {
            path: 'expense',
            element: <PrivateRoute element={<ExpensesPage/>}/>
          }
        ],
      },
      {
        path: 'calendar',
        children: [
          {
            path: '/calendar',
            element: <PrivateRoute element={<Calendar />} />,
          }
        ],
      },
      {
        path: '*',
        element: <PrivateRoute element={<Error />} />,
      },
    ],
    
  };
  

export default AppRoutes