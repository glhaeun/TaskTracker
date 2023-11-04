// YourComponent.js
import React, { useEffect, useState } from 'react';
import NotificationList from './NotificationList';
import taskApi from '../../../../api/taskApi';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await taskApi.getUpcoming();
        setNotifications(response); 
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchData();
  }, []); // Run this effect only once when the component mounts

  return (
    <div>
      <NotificationList notifications={notifications} />
    </div>
  );
};

export default Notification;
