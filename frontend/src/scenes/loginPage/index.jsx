import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Form from './Form.jsx';

const LoginPage = () => {
  const isNonMobileScreens = window.matchMedia('(min-width: 1000px)').matches;

  return (
    <div>
      <div className="text-center py-3 bg-dark">
        <h1 className="font-weight-bold" style={{color:"#39FF14"}}> INSTAKILO</h1>
      </div>

      <Container>
        <Row className="justify-content-center my-4">
          <Col md={isNonMobileScreens ? 6 : 11}>
            <Card className="p-4 rounded-3 bg-dark">
              <h5 className="font-weight-bold text-center" style={{color:"#39FF14", padding:"10px 0 0 0"}} >
                Welcome to INSTAKILO! 
              </h5>
              <Form />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
