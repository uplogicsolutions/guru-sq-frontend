import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Navbar,
    Nav,
    Dropdown,
    Icon
} from 'rsuite';
import './style.css'

const CustomNavbar = ({ onSelect, activeKey, ...props }) => {
    return (
        <Navbar style={{background:'white'}} {...props}>
      <Navbar.Header>
        <a href="/home" className="navbar-brand logo">
          GURU Sq
        </a>
      </Navbar.Header>
      <Navbar.Body>
        <Nav pullRight onSelect={onSelect} activeKey={activeKey}>
          <Nav.Item eventKey="1" icon={<Icon icon="home" />}>
            <NavLink cals to="/test"> Home </NavLink>
          </Nav.Item>
          <Nav.Item  eventKey="2">News</Nav.Item>
          <Nav.Item eventKey="3">Products</Nav.Item>
          <Dropdown title="About">
            <Dropdown.Item eventKey="4">Company</Dropdown.Item>
            <Dropdown.Item eventKey="5">Team</Dropdown.Item>
            <Dropdown.Item eventKey="6">Contact</Dropdown.Item>
          </Dropdown>
        </Nav>
      </Navbar.Body>
    </Navbar>
    )
}

export default CustomNavbar;