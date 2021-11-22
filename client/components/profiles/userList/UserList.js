import Link from "next/link";

const UsersList = ({ users, headerText }) => {
  let activeUsers = users.slice(0, 3).map((user) => {
    return (
      <div key={user._id} className="user-list__instance">
        <img src={user.profilePhoto} />
        <h3 className="contacts__instance-name">
          <Link href={`/profiles/${user._id}`}>
            <a>
              {user.user.firstname} {user.user.lastname}{" "}
            </a>
          </Link>
        </h3>
      </div>
    );
  });

  return (
    <div className="user-list">
      <h2 className="user-list__header">{headerText}</h2>
      {activeUsers}
      {users.length - activeUsers.length != 0 ? (
        <p>{users.length - activeUsers.length} more</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default UsersList;
