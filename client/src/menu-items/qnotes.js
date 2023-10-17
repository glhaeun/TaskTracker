// assets

import { IconTag } from '@tabler/icons-react';

// constant
const icons = {
  IconTag
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const notes = {
  id: 'quicknotes',
  title: 'Pages',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'quicknotesDefault',
    title: 'Quick Notes',
    type: 'collapse',
    icon: icons.IconTag,
    children: [
      {
        id: 'quicknotesDefault',
        title: 'All',
        type: 'item',
        url: '/quicknotes',
        target: true
      },
      {
        id: 'quicknotesArchived',
        title: 'Archived',
        type: 'item',
        url: '/quicknotes/archived',
        target: true
      },
      {
        id: 'quicknotesDelete',
        title: 'Delete',
        type: 'item',
        url: '/quicknotes/deleted',
        target: true
      }
    ]
    }
  ]
};

export default notes;
