import PrevSunday from '../components/PrevSunday/PrevSunday';
import NextSunday from '../components/NextSunday/NextSunday';
import React, { Component } from 'react';
import { Wrapper, Center } from './containerStyle';
import * as date from '../assets/shopping-sundays-2018.json';
// const moment = require('moment');
import * as moment from 'moment';

class App extends Component {
  state = {
    todayDay: moment().isoWeekday(),
    todayDate: '',
    shoppingSundayList: [],
    nextSundayText: 'niehandlowa',
    prevSundayText: 'niehandlowa',
  };

  getDateList = () => {
    const importedDate = date.shoppingSundays;
    this.setState({ shoppingSundayList: importedDate });
  };

  isDateOnList = fromSetter => {
    const list = [...this.state.shoppingSundayList];
    const check = list.includes(fromSetter);
    return check;
  };

  getDate = () => {
    const currentDate = moment().toISOString();
    const currentDateString = currentDate
      .split('T')
      .slice(0, 1)
      .toString();
    this.setState({ todayDate: currentDateString });
    return currentDateString;
  };

  getDaysToNextSunday = today => {
    const sunday = 7;
    const difference = sunday - today;
    return difference;
  };

  setNextSundayDate = toNextSunday => {
    const nextSundayDate = moment()
      .add(toNextSunday, 'days')
      .format('YYYY-MM-DD');
    return nextSundayDate;
  };

  setPrevSundayDate = toPreviousSunday => {
    const prevSundayDate = moment()
      .subtract(toPreviousSunday, 'days')
      .format('YYYY-MM-DD');
    console.log(prevSundayDate);
    return prevSundayDate;
  };

  setShoppingState = (willBeShoping, wasShopping) => {
    const checkNextShopping = willBeShoping;
    checkNextShopping ? this.setState({ nextSundayText: 'handlowa' }) : null;

    const checkPrevShopping = wasShopping;
    checkPrevShopping ? this.setState({ prevSundayText: 'handlowa' }) : null;
  };

  init = today => {
    this.getDate();

    const daysToNextSunday = this.getDaysToNextSunday(today);
    const nextSundayDate = this.setNextSundayDate(daysToNextSunday);
    const isNextDateOnList = this.isDateOnList(nextSundayDate);

    const prevSundayDate = this.setPrevSundayDate(today);
    const isPrevDateOnList = this.isDateOnList(prevSundayDate);

    this.setShoppingState(isNextDateOnList, isPrevDateOnList);
  };

  componentDidMount() {
    this.init(this.state.todayDay);
  }

  componentWillMount() {
    this.getDateList();
  }

  render() {
    const { nextSundayText, prevSundayText } = this.state;

    return (
      <Center>
        <Wrapper>
          <NextSunday nextSundayText={nextSundayText} />
          <PrevSunday prevSundayText={prevSundayText} />
        </Wrapper>
      </Center>
    );
  }
}

export default App;
