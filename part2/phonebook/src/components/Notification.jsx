const Notification = ({ message, errorBoolean }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={`notification ${errorBoolean ? "error" : "success"}`}>
      {message}
    </div>
  );
};

export default Notification;
