import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../navbar/index';
import UserWidget from '../widgets/UserWidget.jsx';
import MyPostWidget from '../widgets/MyPostWidget.jsx';
import PostsWidget from '../widgets/PostsWidget.jsx';
import AdvertWidget from '../widgets/AdvertWidget.jsx';
import FriendListWidget from '../widgets/FriendListWidget.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'

const HomePage = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
 
  return (
<div>
  <Navbar />
  <div className="container-fluid py-4 px-lg-5" >
    <div className="row g-3">
      <div className="col-12 col-md-3">
        <UserWidget userId={_id} picturePath={picturePath} />
      </div>
      <div className="col-12 col-md-6">
        <MyPostWidget picturePath={picturePath} />
        <PostsWidget userId={_id} />
      </div>
      <div className="col-12 col-md-3">
        <AdvertWidget />
      <div className="my-4" />
        <FriendListWidget userId={_id} />
      </div>
    </div>
  </div>
</div>
)};
 
export default HomePage;