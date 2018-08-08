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
    todaySundayText: 'niehandlowa',
    prevSundayText: 'niehandlowa',
  };

  getDateList = () => {
    const importedDate = date.shoppingSundays;
    this.setState({ shoppingSundayList: importedDate });
  };

  getDate = () => {
    const currentDate = moment().toISOString();
    const currentDateString = currentDate
      .split('T')
      .slice(0, 1)
      .toString();
    this.setState({ todayDate: currentDateString });
    console.log(currentDateString);
    return currentDateString;
  };

  isSundayCheck = today => {
    //dać tu ten parametr this.todayDay
    const checkDay = today;
    let isSunday;
    checkDay === 7 ? (isSunday = true) : (isSunday = false);
    return isSunday;
  };

  isDateOnList = fromSetter => {
    const list = [...this.state.shoppingSundayList];
    const check = list.includes(fromSetter);
    return check;
  };

  getDaysToNextSunday = today => {
    const sunday = 7;
    const difference = sunday - today;
    return difference;
  };

  setNextSundayDate = toNextSunday => {
    const setSunday = function(days) {
      const nextSundayDate = moment()
        .add(days, 'days')
        .format('YYYY-MM-DD');
      return nextSundayDate;
    };
    //if today is sunday, add one week to check the next sunday
    const skipTodaySunday = toNextSunday + 7;
    toNextSunday === 0 ? setSunday(skipTodaySunday) : setSunday(toNextSunday);
  };

  setPrevSundayDate = toPreviousSunday => {
    const prevSundayDate = moment()
      .subtract(toPreviousSunday, 'days')
      .format('YYYY-MM-DD');
    return prevSundayDate;
  };

  setShoppingState = (willBeShoping, wasShopping, isShopping) => {
    const checkNextShopping = willBeShoping;
    checkNextShopping ? this.setState({ nextSundayText: 'handlowa' }) : null;

    const checkPrevShopping = wasShopping;
    checkPrevShopping ? this.setState({ prevSundayText: 'handlowa' }) : null;

    const checkTodayShopping = isShopping;
    checkTodayShopping ? this.setState({ todaySundayText: 'handlowa' }) : null;
  };

  init = today => {
    const isSunday = this.isSundayCheck();
    // const getTodayDate = this.getDate();
    // const isTodayOnList = this.isDateOnList();

    if (isSunday) {
      const getTodayDate = this.getDate();
      const isTodayOnList = this.isDateOnList(getTodayDate);

      const daysToNextSunday = this.getDaysToNextSunday(today);
      const nextSundayDate = this.setNextSundayDate(daysToNextSunday);
      const isNextDateOnList = this.isDateOnList(nextSundayDate);

      const prevSundayDate = this.setPrevSundayDate(today);
      const isPrevDateOnList = this.isDateOnList(prevSundayDate);

      this.setShoppingState(isNextDateOnList, isPrevDateOnList, isTodayOnList);
    } else {
      const daysToNextSunday = this.getDaysToNextSunday(today);
      const nextSundayDate = this.setNextSundayDate(daysToNextSunday);
      const isNextDateOnList = this.isDateOnList(nextSundayDate);

      const prevSundayDate = this.setPrevSundayDate(today);
      const isPrevDateOnList = this.isDateOnList(prevSundayDate);
      this.setShoppingState(isNextDateOnList, isPrevDateOnList);
    }
    // jeżeli jest niedziela to wtedy getDate musi być sprawdzone czy jest na liście
    // i ustawiony state todaySunday na handlowa
  };

  componentDidMount() {
    this.init(this.state.todayDay);
  }

  componentWillMount() {
    this.getDateList();
  }

  render() {
    const { nextSundayText, prevSundayText, todaySundayText } = this.state;

    return (
      <Center>
        <Wrapper>
          <NextSunday
            nextSunday={nextSundayText}
            todaySunday={todaySundayText}
          />
          <PrevSunday prevSunday={prevSundayText} />
        </Wrapper>
      </Center>
    );
  }
}

export default App;
