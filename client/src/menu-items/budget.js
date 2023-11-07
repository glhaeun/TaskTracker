// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = { IconKey };


const dashboard = {
  id: 'budget',
  title: 'Budget',
  type: 'group',
  children: [
    {
      id: 'budgetDefault',
      title: 'budget',
      type: 'item',
      url: '/budget',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
