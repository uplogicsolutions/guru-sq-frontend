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
    history.push(redirectUrl)
  }

  return (
    <>
      {props.children}
    </>
  )

}

export default Authorization;