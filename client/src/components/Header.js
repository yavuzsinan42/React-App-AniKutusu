import React,{useEffect, useState} from "react";
import { useDispatch, useSelector} from 'react-redux'
import {
  Navbar,
  Nav,
  Button,
  Form,
  FormControl,
  NavDropdown,
  Container,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {RiEditBoxLine, RiLoginCircleLine, RiLogoutCircleLine} from "react-icons/ri"
import { useLocation, useNavigate } from "react-router-dom";
import { logout, getAccessToken } from "../actions/userActions";
import decode from 'jwt-decode'

const Header = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const [user,setUser]= useState()
  const userState = useSelector((state)=>state.user)
  const navigate = useNavigate()
  const exit= async (id) =>{
    await dispatch(logout(id))
    setUser(null)
    navigate("/")
  }
  
  const renewAccessToken = async (id) =>{
    if(!userState.googleLogin){
      await dispatch(getAccessToken(id))
      setUser(JSON.parse(localStorage.getItem('user')))
    }
    
  }
  useEffect(()=>{
   
    if(localStorage.getItem('user')&& !user){
      setUser(JSON.parse(localStorage.getItem('user')))
    }
    const interval = setInterval(()=>{
      const accessToken = user?.accessToken
      if(accessToken){
        const decodedAccessToken = decode(accessToken)
        if(decodedAccessToken.exp * 1000 < new Date().getTime()){
          
          renewAccessToken(user.user._id)
        }
      }
    }, 5000)
   
    
    return () =>{clearInterval(interval)}
  },[location,user])
  
  return (
    <div>
      <Navbar bg="dark" expand="lg" collapseOnSelect variant="dark">
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand href="#">ANI KUTUSU</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Nav>
              {user ?(<>
                <LinkContainer to="/create">
                    <Nav.Link>
                        
                        <Button variant="outline-success">
                          <RiEditBoxLine  size={20} style={{marginRight: "5px"}} />
                          Bir Anı Paylaş
                        </Button>
                    </Nav.Link>
                </LinkContainer>
                
                    <Nav.Link>
                        <Button variant="danger" onClick={(e)=>{
                          exit(user.user._id)
                        }}>
                          <RiLogoutCircleLine  size={20} style={{marginRight: "5px"}} />
                          Çıkış Yap
                        </Button>
                    </Nav.Link>
                

                </>): (<>
                <LinkContainer to="/auth">
                    <Nav.Link>
                        <Button variant="success">
                          <RiLoginCircleLine size={20} style={{marginRight: "5px"}}/>
                          Giriş Yap
                        
                        </Button>
                    </Nav.Link>
                </LinkContainer>
                </>)}
             
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
