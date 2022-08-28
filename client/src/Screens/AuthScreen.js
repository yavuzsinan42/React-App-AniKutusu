import React, { useState } from 'react'
import { Container, Row, Col, Form, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signup,signin } from '../actions/userActions'
import Message from '../components/Message'

const AuthScreen = ({}) => {
    const initialFormData = {
        firstName: "",
        lastName:"",
        email: "",
        password: "",
        confirmPassword: "",

    }
    const userState= useSelector((state)=> state.user)
    const {error} =userState
    const [login, setLogin] = useState(true)
    const [form, setForm] = useState(initialFormData)
    const navigate = useNavigate()
    const dispatch = useDispatch()
  return (
    <>
    <Container>
        <Row className="justify-content-center">
            <Col sm={12}
              md={6}
              lg={4}
              xl={3}>
                {login ? 
                (<Form 
                    onSubmit={(e)=>{
                        e.preventDefault()
                        if(login){
                            dispatch(signin(form, navigate))
                        }
                    }}
                className="align-content-center mt-3">
                    <h1 className="text-center mb-3">Giriş Yap</h1>
                    {error && <Message>{error}</Message>}
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                        type='email' 
                        placeholder="Email Adresinizi Girin"
                        onChange={(e)=>setForm({...form, email:e.target.value})}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label>Şifre</Form.Label>
                        <Form.Control 
                        type='password' 
                        placeholder="Şifrenizi Girin"
                        onChange={(e)=>setForm({...form, password:e.target.value})}
                        ></Form.Control>
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
                    <Form 
                    onSubmit={(e)=> {
                        e.preventDefault();
                        if(!login){
                            dispatch(signup(form,navigate))
                        }
                    }}
                    className="align-content-center mt-3">
                    <h1 className="text-center mb-3">Kayıt Ol</h1>
                    {error && <Message>{error}</Message>}
                    <Form.Group style={{display: 'flex'}}>
                        <Form.Control 
                        type='text' 
                        placeholder="İlk adınız"
                        className='me-2' 
                        onChange={(e) => setForm({...form, firstName: e.target.value})} 
                        ></Form.Control>

                        <Form.Control 
                        type='text' 
                        placeholder="Soy adınız"
                        className='ms-2' 
                        onChange={(e) => setForm({...form, lastName: e.target.value})}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mt-2">Email</Form.Label>
                        <Form.Control 
                        type='email'
                        placeholder="Email Adresinizi Girin"
                        onChange={(e) => setForm({...form, email: e.target.value})}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mt-2">Şifre</Form.Label>
                        <Form.Control 
                        type='password'
                        placeholder="Şifrenizi Girin"
                        onChange={(e) => setForm({...form, password: e.target.value})}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mt-2">Şifrenizi Doğrulayın</Form.Label>
                        <Form.Control 
                        type='password'
                        placeholder="Şifrenizi Tekrar Girin"
                        onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
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