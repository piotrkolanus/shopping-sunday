import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PrevSunday from '../PrevSunday';
configure({ adapter: new Adapter() });

// describe('<Sunday />', () => {
//   it('should render paragraph', () => {
//     const wrapper = shallow(<PrevSunday />);
//     expect(wrapper.find()).to
//   });
// });
