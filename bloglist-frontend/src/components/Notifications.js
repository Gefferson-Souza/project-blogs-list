const Notifications = ({ message }) => {
  if (message) {
    return <h3 className="message">{message}</h3>;
  }
};

export default Notifications;
