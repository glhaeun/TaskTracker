// assets
import { IconBook } from '@tabler/icons-react';

// constant
const icons = { IconBook };


const journal = {
  id: 'journal',
  title: 'Journal',
  type: 'group',
  children: [
    {
      id: 'journalDefault',
      title: 'Journal',
      type: 'item',
      url: '/journal',
      icon: icons.IconBook,
      breadcrumbs: false
    }
  ]
};

export default journal;
