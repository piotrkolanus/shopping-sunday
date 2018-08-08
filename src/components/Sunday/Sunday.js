import React from 'react';
import { Title } from '../sundayStyle';

const Sunday = props => {
  return (
    <Title>
      {props.placement} niedziela {props.verb} {props.text}
    </Title>
  );
};

export default Sunday;
