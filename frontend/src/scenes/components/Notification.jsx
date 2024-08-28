const NotificationList = ({ notifications }) => {
    return (
      <div>
        {notifications.map((notification) => (
          <div key={notification._id}>
            <p>{notification.type} by {notification.actor_id.name}</p>
          </div>
        ))}
      </div>
    );
  };