import React from 'react';
import { Title } from '../sundayStyle';

const nextSunday = props => {
  return <Title>Następna niedziela jest {props.nextSundayText}</Title>;
};

export default nextSunday;
