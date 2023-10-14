// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const notes = {
  id: 'pages',
  title: 'Pages',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'notesDefault',
      title: 'Quick Notes',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'journalAll',
          title: 'All',
          type: 'item',
          url: '/journal/all',
          target: true
        },
        {
          id: 'journalPersonal',
          title: 'Personal',
          type: 'item',
          url: '/journal/personal',
          target: true
        }
      ]
    }
  ]
};

export default notes;
