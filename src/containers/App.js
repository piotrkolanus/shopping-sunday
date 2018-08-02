import * as date from '../assets/shopping-sundays-2018.json';
import React, { Component } from 'react';
import './App.css';
import NextSunday from '../components/NextSunday/NextSunday';
import PreviousSunday from '../components/PreviousSunday/PreviousSunday';
const moment = require('moment');
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayDay: moment().isoWeekday(),
      nextSundayText: 'niehandlowa',
      previousSundayText: 'niehandlowa',
    };
  }

  state = {
    todayDay: '',
    todayDate: '',
    shoppingSundayList: [],
    nextSundayText: '',
    previousSundayText: '',
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

  setShoppingState = willBeShoppingSunday => {
    const ss = willBeShoppingSunday;
    if (ss) {
      this.setState({ nextSundayText: 'handlowa' });
    }
  };
  init = today => {
    this.getDate();
    const willbeShoppingSunday = this.isDateOnList(
      this.setNextSundayDate(this.getDaysToNextSunday(today))
    );
    const wasShoppingSunday = this.isDateOnList(
      this.setPreviousSundayDate(today)
    );
    this.setShoppingState(willbeShoppingSunday);
  };
  componentDidMount() {
    this.init(this.state.todayDay);
  }

  componentWillMount() {
    this.getDateList();
  }

  render() {
    console.log('hello');

    // console.log(this.state);
    // const currentDateString = moment().date();
    // console.log(currentDateString);

    return (
      <div>
        <NextSunday nextSundayText={this.state.nextSundayText} />
        <PreviousSunday previousSundayText={this.state.previousSundayText} />
      </div>
    );
  }
}

export default App;
