import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state";
import UserImage from "./UserImage.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const isFriend = Array.isArray(friends) && friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-3">
        <UserImage image={userPicturePath} size="55px" />
        <div
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
          style={{ cursor: "pointer" }}
        >
          <h5
            className="mb-0" // This replaces 'main' from the MUI theme
            onMouseOver={(e) => (e.target.style.color = "#5a6268")} // This replaces the hover effect
            onMouseOut={(e) => (e.target.style.color = "")}
          >
            {name}
          </h5>
          <p className="mb-0" style={{ fontSize: "0.75rem" }}>
            {subtitle}
          </p>
        </div>
      </div>
      <button
        className="btn btn-light"
        onClick={() => patchFriend()}
        style={{ padding: "0.6rem", backgroundColor: "#d1e7dd" }} // This replaces 'primaryLight' from the MUI theme
      >
        {isFriend ? (
          <i className="bi bi-person-dash" style={{ color: "#0c5460" }}></i> // This replaces 'PersonRemoveOutlined'
        ) : (
          <i className="bi bi-person-plus" style={{ color: "#0c5460" }}></i> // This replaces 'PersonAddOutlined'
        )}
      </button>
    </div>
  );
};

export default Friend;
