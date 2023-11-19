import { IconDashboard } from '@tabler/icons-react';

const icons = { IconDashboard };


const dashboard = {
  id: 'ToDo',
  title: 'To Do',
  type: 'group',
  children: [
    {
      id: 'todoDefault',
      title: 'To Do List',
      type: 'item',
      url: '/todo',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
