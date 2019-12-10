/* eslint-disable react/prop-types */
import React from 'react';
// import { Link } from 'react-router-dom';
import css from './title.css';

function TopTitle(props) {
  const { title } = props;
  return <div className={css['top-title-container']}>{title}</div>;
}

export default TopTitle;
