import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { checkAuth } from 'auth/store';

const Authorization = (props) => {
  const { redirect, redirectUrl } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, []);

  if (redirect) {
    let currentUrl = window.location.href.trim();
    if(currentUrl[currentUrl.length - 1] == '/') currentUrl = currentUrl.slice(0, -1);
    currentUrl = currentUrl.split('/');
    let path = currentUrl[currentUrl.length -1];
    if(currentUrl[currentUrl.length - 2].trim() == 'user-profile') {
      history.push(`/user-profile/${path}`);
    }
    else if(path!= 'landing' && path != 'home' && path != '') {
      history.push(`/${path}`)
    } else {
      history.push(redirectUrl)
    }
  }

  return (
    <>
      {props.children}
    </>
  )

}

export default Authorization;