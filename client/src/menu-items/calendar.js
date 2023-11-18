// assets
import { IconCalendar } from '@tabler/icons-react';

// constant
const icons = { IconCalendar };


const calendar = {
  id: 'calendar',
  title: 'Calendar',
  type: 'group',
  children: [
    {
      id: 'calendar',
      title: 'Calendar',
      type: 'item',
      url: '/calendar',
      icon: icons.IconCalendar,
      breadcrumbs: false
    }
  ]
};

export default calendar;
