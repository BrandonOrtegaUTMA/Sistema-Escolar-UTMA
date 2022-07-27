import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import Logo from '../assets/images/Logo.png';


function Header(){
    return(
        <div id="header">
           <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">                       
                        <img className="logo" src={Logo}></img>                                          
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/students/list">Alumnos</Nav.Link>                                                
                    </Nav>
                    <Nav className="me-auto">
                        <Nav.Link href="/teachers/list">Maestros</Nav.Link>                                                
                    </Nav>
                    <Nav className="me-auto">
                        <Nav.Link href="/administrative/list">Administrativos</Nav.Link>                                                
                    </Nav>
                    <Nav className="me-auto">
                        <Nav.Link href="/career/list">Carreras</Nav.Link>                                                
                    </Nav>
                    <Nav className="me-auto">
                        <Nav.Link href="/user/list">Usuarios</Nav.Link>                                                
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}


export default Header;
