import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './CustomNavbar.module.css';
import { FaTimes, FaBars } from 'react-icons/fa';
import Logo from '../../assets/gurusq.png'
import { useSelector, useDispatch } from 'react-redux';
import { getUnreadNotificationsCount } from 'pages/notifications/store';

const CustomNavbar = ({ onSelect, activeKey, ...props }) => {
  const dispatch = useDispatch()
  const { unreadNotificationsCount } = useSelector(state => state.notifications)

  const [clicked, setClicked] = React.useState(false);
  function handleClick() {
    setClicked(!clicked);
  }
  const menu = clicked ? <FaTimes color={"#443203"} /> : <FaBars color={"#443203"} />

  useEffect(() => {
    dispatch(getUnreadNotificationsCount())
  },[])

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

      <ul className={clicked ? [`${styles.navMenu} ${styles.active}`] : `${styles.navMenu}`}>
        <li><NavLink onClick={() => setClicked(false)} className={`${styles.navLinks}`} to="/home">Feed</NavLink></li>
        <li><NavLink onClick={() => setClicked(false)} className={`${styles.navLinks}`} to="/cluster">Cluster</NavLink></li>
        <li><NavLink onClick={() => setClicked(false)} className={`${styles.navLinks}`} to="/notifications">Alerts</NavLink></li>
        <li><NavLink onClick={() => setClicked(false)} className={`${styles.navLinks}`} to="/profile">My Profile</NavLink></li>
        <li><NavLink onClick={() => setClicked(false)} className={`${styles.navLinks}`} to="/others-profile">Other Profile</NavLink></li>
      </ul>
    </nav>

  )
}

export default CustomNavbar;