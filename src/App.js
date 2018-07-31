import * as date from './assets/shopping-sundays-2018.json';
import React, { Component } from 'react';
import './App.css';
const moment = require('moment');
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayDay: moment().isoWeekday(),
    };
  }

  state = {
    todayDate: '',
    // previousSunday,
    // incomingSunday,
    // today: 1,
    // daysToNextSunday: '',
    // daysToPreviousSunday: '',o
  };

  //fetching list of shopping sundays from JSON
  getDateList = () => {
    const importedDate = date.shoppingSundays;
    this.setState({ shoppingSundayList: importedDate });
    // console.log('getDateList' + importedDate);
  };
  //checks if date on the shopping-sundays JSON
  isDateOnList = () => {
    const date = this.state.currentDate;
    let list = [...this.state.shoppingSundayList];

    const check = list.includes(date);
    // console.log(date);
    // console.log(list);
    console.log(check);
  };

  getSplittedISODate = () => {
    const currentDate = moment().toISOString();
    const currentDateString = currentDate
      .split('T')
      .slice(0, 1)
      .toString();
    // const currentDateString = moment()
    //   .date()
    //   .toString();
    this.setState({ currentDate: currentDateString });
  };
  // getDaysToNextSunday = () => {
  //   //1-monday, 7-sunday
  //   const weekISO = [1, 2, 3, 4, 5, 6, 7];
  //   // ten state zmienić na parametry zwykłe
  //   const todayFromStateTest = this.state.today;
  //   const todayIndex = weekISO.indexOf(todayFromStateTest);
  //   const daysToNextSunday = weekISO.filter(x => x > todayIndex).length;
  //   // const daysToNextSundayNumber = daysToNextSunday.length;
  //   // const daysToNextSunday = weekISO.reduce((acc, item) => {
  //   // item > todayIndex ? [...acc, item] : acc, [];
  //   // }
  //   // });
  //   console.log(daysToNextSunday);
  //   this.setState({ daysToNextSunday: daysToNextSunday });
  // };

  getDaysToNextSunday = today => {
    //today as parameter
    // const today = this.state.todayDay;
    const sunday = 7;
    const difference = sunday - today;
    console.log(today);
    // const differenceBetweenSundayAndToday = (sunday - today) % 7;
    return difference;
  };

  getDaysToPreviousSunday = () => {
    const today = this.state.todayDay;
    const toPrevious = today > 0 ? today * -1 : 0;
    console.log('to previous ' + toPrevious);
    return toPrevious;

    // const daysToPreviousSunday = sunday - today;
    // this.setState({ daysToPreviousSunday: daysToPreviousSunday });
  };
  setNextSundayDate = () => {
    const date = this.getDaysToNextSunday(this.state.todayDay);
    const nextSundayDate = moment()
      .add(date, 'days')
      .format('YYYY-MM-DD');
    console.log(typeof nextSundayDate);
    return nextSundayDate.locale;
  };
  setNextPreviousDate = () => {
    const date = this.getDaysToNextSunday(this.state.todayDay);
    const prevSundayDate = moment().subtract(date, 'days');
    console.log(prevSundayDate);
    return prevSundayDate.lo;
  };

  componentWillMount() {
    this.getSplittedISODate();
    this.getDateList();
  }

  componentDidMount() {
    this.isDateOnList();
    this.getDaysToNextSunday();
    this.getDaysToPreviousSunday();
    this.setNextSundayDate();
  }

  render() {
    console.log('hello');
    console.log(this.state);
    const currentDateString = moment().date();
    console.log(currentDateString);

    return <div>{}</div>;
  }
}

export default App;
