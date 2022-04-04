import React from 'react'
import {Form, Button} from 'react-bootstrap'
import ReactFileBase64 from 'react-file-base64'

const SubmitMemory = () => {
  return (
    <Form >
        <Form.Group>
            <h1 className='pt-4'>Bir Anıdan Bahset</h1>
        </Form.Group>
        <Form.Group>
            <Form.Label>Başlık</Form.Label>
            <Form.Control name='title' type='text'></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Yazar</Form.Label>
            <Form.Control name='author' type='text'></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Anınız</Form.Label>
            <Form.Control name='content' type='text' as='textarea' rows={4} style={{ marginBottom: '10px' }}></Form.Control>
        </Form.Group>
        <Form.Group >
            <ReactFileBase64 type='file' multiple={false} onDone={()=>{}}  />
        </Form.Group>
        <Button type='submit' style={{width: '100%', marginTop: '10px' }} >Gönder</Button>
    </Form>
  )
}

export default SubmitMemory