function Account(props) {
  return (
    <div>
      <p>{props.data.username}</p>
      <p>{props.data.email}</p>
      <p>{props.data.role}</p>
      <div className="account-edit">
        <a href={`/edit/${props.data.username}`}>Edit</a>
      </div>
      <div className="account-delete">
        <a href={`/delete/${props.data.username}`}>Delete</a>
      </div>
    </div>
  );
}

export default Account;
