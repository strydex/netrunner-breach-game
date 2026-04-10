function UserDisplayStatus(props: { user: any }) {
  const user = props.user;

  return (
    <>
      <div className="inlineBoxLeft item" style={{ paddingLeft: "2%" }}>
        <div>
          <img
            src={user._pfp}
            width="72"
            title={"фото профиля " + user._alias}
            alt="профиль пользователя"
          />
        </div>
        <div style={{ lineHeight: "0.5" }}>
          <p className="ircText">
            <strong>{user._name} / {user._alias}</strong> [
            {user._connectionStatus}]
          </p>
          <p className="ircText">
            <em>{user._status}</em>
          </p>
          <br />
        </div>
      </div>
    </>
  );
}

export default UserDisplayStatus;
