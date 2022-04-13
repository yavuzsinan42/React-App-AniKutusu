import React from 'react'
import { Row,Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
        <Row className='fixed-bottom ' style={{background:'gray'}}>
            <Col className='text-center py-1 text-white '>Copyright &copy; Anı Kutusu</Col>
        </Row>
    </footer>
  )
}

export default Footer