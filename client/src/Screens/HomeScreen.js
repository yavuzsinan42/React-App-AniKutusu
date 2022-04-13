import React, { useState, useEffect } from "react";
import { Spinner, Row, Col } from "react-bootstrap";
import Memory from "../components/Memory";
import { useDispatch, useSelector} from "react-redux";
import { fetchMemories } from "../actions/memoryActions.js";
const HomeScreen = () => {
  const dispatch= useDispatch()
  const memories = useSelector((state)=>state.memories)
  useEffect(() => {
    if(!memories[0]){
      dispatch(fetchMemories())
    }
  }, [dispatch])
  
  return (
    <>
      <h1 className="pt-2">EN GUNCEL ANILAR</h1>
      {!memories.length ? (
        <Spinner animation="border" />
      ) : (
        <Row>
          {memories.map((memory) => (
            <Col
              sm={12}
              md={6}
              lg={4}
              xl={3}
              className="m-auto"
              key={memory._id}
            >
              <Memory memory={memory} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
