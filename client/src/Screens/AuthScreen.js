import React, { useState } from 'react'
import { Container, Row, Col, Form, Button} from 'react-bootstrap'
const AuthScreen = () => {
    const [login, setLogin] = useState(true)
  return (
    <>
    <Container>
        <Row className="justify-content-center">
            <Col sm={12}
              md={6}
              lg={4}
              xl={3}>
                {login ? 
                (<Form className="align-content-center mt-3">
                    <h1 className="text-center mb-3">Giriş Yap</h1>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder="Email Adresinizi Girin">
                        
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label>Şifre</Form.Label>
                        <Form.Control type='password' placeholder="Şifrenizi Girin">
                        
                        </Form.Control>
                    </Form.Group>
                    <Button  type="submit" className="col-12">
                    Giriş Yap
                    </Button>
                    <div className="text-center">
                    <Form.Text as='large' className="text-center ">
                        Henüz bir hesabın yok mu?{' '}<span style={{fontWeight:'bold', cursor: 'pointer'}} onClick={(e)=> setLogin(!login)}> Kayıt Ol</span>
                    </Form.Text>
                    </div>
                </Form>) : (
                    <Form className="align-content-center mt-3">
                    <h1 className="text-center mb-3">Kayıt Ol</h1>
                    <Form.Group style={{display: 'flex'}}>
                        <Form.Control 
                        type='text' 
                        placeholder="İlk adınız"
                        className='me-2' >
                        </Form.Control>

                        <Form.Control 
                        type='text' 
                        placeholder="Soy adınız"
                        className='ms-2' >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mt-2">Email</Form.Label>
                        <Form.Control 
                        type='email'
                        placeholder="Email Adresinizi Girin"
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mt-2">Şifre</Form.Label>
                        <Form.Control 
                        type='email'
                        placeholder="Şifrenizi Girin"
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mt-2">Şifrenizi Doğrulayın</Form.Label>
                        <Form.Control 
                        type='email'
                        placeholder="Şifrenizi Tekrar Girin"
                        ></Form.Control>
                    </Form.Group>
                    <Button type='submit' className="col-12 mt-3">Kayıt Ol</Button>
                    <div className="text-center">
                    <Form.Text>
                        Zaten bir hesabınız var mı?{' '}<span style={{fontWeight: 'bold', cursor:'pointer'}} onClick={(e)=>setLogin(!login)}>Giriş Yap</span>
                    </Form.Text>
                    </div>
                    </Form>)}

            </Col>
        </Row>
    </Container>
    </>
  )
}

export default AuthScreen