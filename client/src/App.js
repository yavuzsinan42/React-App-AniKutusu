
import './App.css';
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen';
import  CreateScreen from './Screens/CreateScreen';
import {Container} from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import UpdateScreen from './Screens/UpdateScreen';
import AuthScreen from './Screens/AuthScreen';
import { gapi } from 'gapi-script';

function App() {
  gapi.load('client:auth2', () => {
    gapi.client.init({
        clientId: 607806607407-eq38l9tecp2ppvp6u5n9ho34rt5io8m5.apps.googleusercontent.com,
        plugin_name: 'chat',
    });
});
  return (
    <Router>
      <Header/>
      <Container>
      <Routes>
      <Route path='/' element={<HomeScreen/>} exact/>
      <Route path='/create' element={<CreateScreen/>}/>
      <Route path='/update/:id' element={<UpdateScreen/>}/>
      <Route path='/auth' element={<AuthScreen/>}/>
      
      </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
