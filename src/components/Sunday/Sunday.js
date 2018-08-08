import React from 'react';
import { Title } from '../sundayStyle';

const Sunday = props => {
  return (
    <Title>
      {props.verb} niedziela {props.text}
    </Title>
  );
};

export default Sunday;
