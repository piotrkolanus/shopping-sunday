import React from 'react';
import { Title } from '../sundayStyle';

const prevSunday = props => {
  return <Title>Poprzednia niedziela była {props.prevSundayText}</Title>;
};

export default prevSunday;
