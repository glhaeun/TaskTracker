import { lazy } from 'react';
import Loadable from "../component/Loadable";

import MainLayout from '../layouts/MainLayout';
import PrivateRoute from './PrivateRoutes';
// import {
//   QuickNotes,
//   ArchiveNotes,
//   DeletedNotes
// } from "../views/pages/qnote/index";

import {
  QuickNotes,
  ArchiveNotes,
  DeletedNotes
} from "../views/pages/finalNotes/index";


const ToDo2 = Loadable(lazy(()=> import('../views/pages/finalTodo')))

const ToDo = Loadable(lazy(()=> import('../views/pages/kanbanTes')))
const Main = Loadable(lazy(()=> import('../views/pages/todo/main')))
const Journal = Loadable(lazy(()=> import('../views/pages/journalTes')))
const Journal2 = Loadable(lazy(()=> import('../views/pages/finalJournal')))




const AppRoutes = {
    path: '/',
    element: <PrivateRoute element={<MainLayout />} />,
    children: [
      {
        path: '/',
        element: <PrivateRoute element={<ToDo />} />
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
    ],
  };
  

export default AppRoutes