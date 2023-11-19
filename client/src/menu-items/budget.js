// assets
import { IconEyeDollar } from '@tabler/icons-react';

// constant
const icons = { IconEyeDollar };


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
      icon: icons.IconEyeDollar,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
