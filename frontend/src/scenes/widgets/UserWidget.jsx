import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { FaUserEdit, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import WidgetWrapper from "../components/WidgetWrapper.jsx";
import UserImage from "../components/UserImage.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'
import "../css/UserWidget.css"


const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
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

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <div className="userwidget">
    <WidgetWrapper>
      {/* FIRST ROW */}
      <Container className="mb-3" style={{paddingTop:"20px"}}>
        <div className="d-flex mb-2">
          <div >
          <UserImage image={picturePath} />
            <div>
              <h4 className="mb-0 text"
                style={{ color: "grey", fontWeight: 500, cursor: 'pointer', marginTop:"10px", marginBottom:"-1px"}}
                onClick={() => navigate(`/profile/${userId}`)}
              >
                {firstName} {lastName}
              </h4>
              <p style={{ color: "grey" }}>{friends.length} friends </p>
            </div>

          </div>
        </div>
      </Container>

      <hr />

      {/* SECOND ROW */}
      <Container className="my-3">
        <div className="d-flex mb-2" style={{padding:"10px 0 0 0"}}>
          <div className="col-1">
            <FaMapMarkerAlt size={24} />
          </div>
          <div>
            <p className="text">{location}</p>
          </div>
        </div>
        <div className="d-flex mb-2" >
        <div className="col-1">
            <FaBriefcase size={24} />
          </div>
          <div>
            <p className="text">{occupation}</p>
          </div>
        </div>
      </Container>

      <hr />

      {/* THIRD ROW */}
      <Container className="my-3">
        <div className="d-flex mb-2 justify-content-between" style={{padding:"10px 0 0 0"}}>
          <div>
            <p className="text">Who's viewed your profile</p>
          </div>
          <div className="col-1">
            <strong>{viewedProfile}</strong>
          </div>
        </div>
        <div className="d-flex mb-2 justify-content-between">
          <div>
            <p className="text">Impressions of your post</p>
          </div>
          <div className="col-1">
            <strong>{impressions}</strong>
          </div>
        </div>
      </Container>

      <hr />

      {/* FOURTH ROW */}
      <Container className="my-3">
        <h5 className="mb-3">Social Profiles</h5>
        <Row className="align-items-center mb-2">
          <Col xs="auto">
            <Image src="../assets/twitter.png" rounded style={{ width: "30px", height: "30px" }} />
          </Col>
          <Col>
            <strong>Twitter</strong>
            <p> Twitter @email </p>
          </Col>
          <Col xs="auto">
            <FaUserEdit />
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col xs="auto">
            <Image src="../assets/linkedin.png" rounded style={{ width: "30px", height: "30px" }} />
          </Col>
          <Col>
            <strong>Linkedin</strong>
            <p> LinkedIn @email </p>
          </Col>
          <Col xs="auto">
            <FaUserEdit />
          </Col>
        </Row>
      </Container>
    </WidgetWrapper>
    </div>
  );
};


export default UserWidget;
