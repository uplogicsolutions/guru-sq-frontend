import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Navbar,
  Nav,
  Dropdown,
  Icon
} from 'rsuite';
import styles from './CustomNavbar.module.css';
import {FaTimes,  FaBars} from 'react-icons/fa';
import Logo from '../../assets/gurusq.png'

const CustomNavbar = ({ onSelect, activeKey, ...props }) => {

  const [clicked, setClicked] = React.useState(false);
  function handleClick() {
    setClicked(!clicked);
  }
  const menu = clicked ? <FaTimes color={"#443203"}/> : <FaBars color={"#443203"}/>

  return (
      <nav className={`${styles.navbarItems} border z-20`}>
        <h5 className={`${styles.navbarLogo} mb-0 p-0`}>
          <img
            alt=""
            src={Logo}
            width="150"
            height="80"
            className={""}
          />
          </h5>
          <div className={`${styles.menuIcon}`} onClick={handleClick}>
            {menu}
          </div>

        <ul className={ clicked ? [`${styles.navMenu} ${styles.active}`] : `${styles.navMenu}`}>
          <li><NavLink onClick={() => setClicked(false)} className={`${styles.navLinks}`} to="/home">Feed</NavLink></li>
          <li><NavLink onClick={() => setClicked(false)} className={`${styles.navLinks}`} to="/cluster">Cluster</NavLink></li>
          <li><NavLink onClick={() => setClicked(false)} className={`${styles.navLinks}`} to="/notifications">Alerts</NavLink></li>
          <li><NavLink onClick={() => setClicked(false)} className={`${styles.navLinks}`} to="/profile">My Profile</NavLink></li>
        </ul>
      </nav>
    //     <Navbar style={{background:'white'}} {...props}>
    //   <Navbar.Header>
    //     <a href="/home" className="navbar-brand logo">
    //       GURU Sq
    //     </a>
    //   </Navbar.Header>
    //   <Navbar.Body>
    //     <Nav pullRight onSelect={onSelect} activeKey={activeKey}>
    //       <Nav.Item eventKey="1" icon={<Icon icon="home" />}>
    //         <NavLink cals to="/test"> Home </NavLink>
    //       </Nav.Item>
    //       <Nav.Item  eventKey="2">News</Nav.Item>
    //       <Nav.Item eventKey="3">Products</Nav.Item>
    //       <Dropdown title="About">
    //         <Dropdown.Item eventKey="4">Company</Dropdown.Item>
    //         <Dropdown.Item eventKey="5">Team</Dropdown.Item>
    //         <Dropdown.Item eventKey="6">Contact</Dropdown.Item>
    //       </Dropdown>
    //     </Nav>
    //   </Navbar.Body>
    // </Navbar>

  )
}

export default CustomNavbar;