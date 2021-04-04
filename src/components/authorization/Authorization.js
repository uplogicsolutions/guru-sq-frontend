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
    let currentUrl = window.location.href.split('/');
    let path = currentUrl[currentUrl.length - 1].trim();
    if(path!= 'landing' && path != 'home' && path != '') {
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