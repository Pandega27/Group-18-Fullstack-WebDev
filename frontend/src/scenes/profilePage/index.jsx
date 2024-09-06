import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/index.jsx";
import FriendListWidget from "../widgets/FriendListWidget.jsx";
import MyPostWidget from "../widgets/MyPostWidget.jsx";
import PostsWidget from "../widgets/PostsWidget.jsx";
import UserWidget from "../widgets/UserWidget.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <div>
      <Navbar />
      <div className="container-fluid py-4 px-lg-5">
    <div className="row g-3">
      <div className="col-12 col-md-3">
        <UserWidget userId={userId} picturePath={user.picturePath} />
      </div>
      <div className="col-12 col-md-6">
        <MyPostWidget picturePath={user.picturePath} />
        <PostsWidget userId={userId} isProfile/>
      </div>
      <div className="col-12 col-md-3">
        <FriendListWidget userId={userId} />
      </div>
    </div>
  </div>
      </div>
  );
};

export default ProfilePage;
