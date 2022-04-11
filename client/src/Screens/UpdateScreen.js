import React from 'react'
import UpdateMemory from '../components/UpdateMemory'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const UpdateScreen = () => {
    const {id} = useParams()
  return (
    <>
    <Container>
        <UpdateMemory id={id}/>
    </Container>
      </>
  )
}

export default UpdateScreen