import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Friend from "../components/Friend.jsx";
import WidgetWrapper from "../components/WidgetWrapper.jsx";
import { setFriends } from "../state";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/FriendlistWidget.css'

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  let friends = useSelector((state) => state.user.friends) || [];

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3000/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();

    // Check if the data returned is an array
    if (Array.isArray(data)) {
      dispatch(setFriends({ friends: data }));
    } else {
      console.error("Expected an array but got:", data);
      dispatch(setFriends({ friends: [] }));
    }
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="friendlist">
    <WidgetWrapper>
      <h5 className="mb-4 font-weight-bold text">Friend List</h5>
      <div className="d-flex flex-column gap-4">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName}, ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))
        ) : (
          <p>No friends found.</p>
        )}
      </div>
    </WidgetWrapper>
    </div>
  );
};

export default FriendListWidget;
