// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = { IconKey };


const dashboard = {
  id: 'journal',
  title: 'Journal',
  type: 'group',
  children: [
    {
      id: 'journalDefault',
      title: 'Journal',
      type: 'item',
      url: '/journal',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
