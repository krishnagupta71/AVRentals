import React, { useCallback, useEffect, useState } from "react";
import { Accordion, Card, Col, Container, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addUserCarAction, fetchOwnerCarsAction } from "../../app/actions";
import logoImage from "../../assets/logo.jpg";
import { getUserCars } from "./HomeSlice";

export function HomeOwner() {
  const userCars = useSelector(getUserCars);
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [regNo, setRegNo] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOwnerCarsAction());
  }, []);

  const addUserCar = useCallback(
    (e) => {
      console.log("HERE");
      if (
        manufacturer.length === 0 ||
        model.length === 0 ||
        regNo.length === 0
      ) {
        alert("Enter Valid Details");
        return false;
      }
      e.preventDefault();
      dispatch(addUserCarAction({ manufacturer, model, regNo }));
    },
    [dispatch, manufacturer, regNo, model]
  );
  const addCarForm = () => {
    return (
      <Card.Body>
        <Card.Title
          className="lead"
          style={{ marginBottom: "2vh", marginLeft: "8vw" }}
        >
          Add Car
        </Card.Title>
        <Form style={{ width: "100%" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Manufacturer</Form.Label>
            <Form.Control
              type="text"
              value={manufacturer}
              placeholder="Enter manufacturer"
              onChange={(e) => setManufacturer(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Model</Form.Label>
            <Form.Control
              type="text"
              value={model}
              placeholder="Enter Model"
              onChange={(e) => setModel(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Reg No</Form.Label>
            <Form.Control
              type="text"
              value={regNo}
              placeholder="Enter plate no"
              onChange={(e) => setRegNo(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Button
              variant="info"
              // type="submit"
              style={{ alignSelf: "center" }}
              onClick={(e) => addUserCar(e)}
            >
              Add Car
            </Button>
          </Form.Group>
        </Form>
      </Card.Body>
    );
  };
  return (
    <Container
      fluid
      style={{
        height: "92vh",
        width: "100vw",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        display: "flex",
      }}
    >
      <Col xs={3}>
        {" "}
        <Card
          style={{
            height: "100vh",
            alignSelf: "center",
            opacity: 0.9,
          }}
        >
          <Card.Img
            variant="top"
            src={logoImage}
            style={{
              width: "6vw",
              height: "12vh",
              alignSelf: "center",
            }}
          />
          {addCarForm()}
        </Card>
      </Col>

      <Col>
        <Accordion>
          {userCars &&
            userCars.map((item, index) => {
              return (
                <Accordion.Item eventKey={index} key={index}>
                  <Accordion.Header>
                    <div
                      style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "space-between",
                      }}
                    >
                      <h5 className="lead" style={{ color: "blue" }}>
                        Car: {item.registration_number}
                      </h5>
                      <h6
                        className="lead"
                        style={{ color: "green", marginRight: "1vw" }}
                      >
                        Revenue: $
                        {item.Revenue ? item.Revenue.toFixed(2) : "0.00"}
                      </h6>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div
                      style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ fontFamily: "sans-serif" }}>
                        <h4 className="lead">
                          {" "}
                          <small className="text-muted">
                            {" "}
                            {item.manufacture}
                          </small>{" "}
                          {item.model}
                        </h4>
                        <h4 className="lead">
                          <small className="text-muted">
                            {" "}
                            Total Trips Completed:
                          </small>{" "}
                          {item.Total_Trips ? item.Total_Trips : 0}
                        </h4>
                      </div>
                      <div>
                        <Button variant="danger" type="submit">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
        </Accordion>
      </Col>
    </Container>
  );
}
