// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const journal = {
  id: 'journal',
  title: 'Write your memories',
  caption: '',
  type: 'group',
  children: [
    {
      id: 'journalDefault',
      title: 'Journal',
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
        },
        {
          id: 'journalDaily',
          title: 'Daily',
          type: 'item',
          url: '/journal/daily',
          target: true
        }
      ]
    }
  ]
};

export default journal;
