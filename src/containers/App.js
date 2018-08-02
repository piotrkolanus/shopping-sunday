import PrevSunday from '../components/PrevSunday/PrevSunday';
import NextSunday from '../components/NextSunday/NextSunday';
import React, { Component } from 'react';
import { Wrapper, Center } from './containerStyle';
import * as date from '../assets/shopping-sundays-2018.json';
const moment = require('moment');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayDay: moment().isoWeekday(),
      nextSundayText: 'niehandlowa',
      prevSundayText: 'niehandlowa',
    };
  }

  state = {
    todayDay: '',
    todayDate: '',
    shoppingSundayList: [],
    nextSundayText: '',
    prevSundayText: '',
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

  // getDaysToPreviousSunday = today => {
  //   const toPrevious = today;
  //   return toPrevious;
  // };

  setNextSundayDate = toNextSunday => {
    const nextSundayDate = moment()
      .add(toNextSunday, 'days')
      .format('YYYY-MM-DD');
    return nextSundayDate;
  };

  setPreviousSundayDate = toPreviousSunday => {
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
    const willbeShoppingSunday = this.isDateOnList(
      this.setNextSundayDate(this.getDaysToNextSunday(today))
    );
    const wasShoppingSunday = this.isDateOnList(
      this.setPreviousSundayDate(today)
    );

    this.setShoppingState(willbeShoppingSunday, wasShoppingSunday);
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
