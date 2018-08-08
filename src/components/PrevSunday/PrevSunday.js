import React from 'react';
import { Title } from '../sundayStyle';

const prevSunday = props => {
  return <Title>Poprzednia niedziela była {props.prevSunday}</Title>;
};

export default prevSunday;
