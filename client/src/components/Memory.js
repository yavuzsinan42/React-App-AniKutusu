import React from "react";
import { Button, Card } from "react-bootstrap";
import moment from 'moment'
import { LinkContainer } from "react-router-bootstrap";
import {RiEdit2Fill, RiDeleteBin5Line} from 'react-icons/ri'
import { deleteMemory } from "../actions/memoryActions";
import { useDispatch } from "react-redux";

const Memory = ({ memory }) => {
  const dispatch = useDispatch()
  return (
    <Card style={{ width: "18rem" }} className='rounded mb-3' >
      <Card.Img variant="top" src={memory.image} />
      <Card.Body>
        <Card.Title style={{color:'orange'}}>{memory.title}</Card.Title>
        <Card.Text>
          {memory.content}
        </Card.Text>
        <Card.Title style={{fontSize:'13px'}} ><span style={{color:'orange'}}>Yazar: </span> {memory.creator}</Card.Title>
        <Card.Subtitle>{moment(memory.createdAt).fromNow()} </Card.Subtitle>
      </Card.Body>
      <Card.Footer style={{display:'flex', justifyContent: 'space-between'}}>
        <LinkContainer to={`/update/${memory._id}`} style={{cursor: 'pointer'}} >
          <RiEdit2Fill color='white' size='20'/>

          </LinkContainer>
          <RiDeleteBin5Line color="red" size='20' style={{cursor: 'pointer'}} onClick={() => dispatch(deleteMemory(memory._id))} />
      </Card.Footer>
    </Card>
  );
};

export default Memory;
