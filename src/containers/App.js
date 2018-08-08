import Sunday from '../components/Sunday/Sunday';
import React, { Component } from 'react';
import { Wrapper, Center } from './containerStyle';
import * as date from '../assets/shopping-sundays-2018.json';
import * as moment from 'moment';

class App extends Component {
  componentWillMount() {
    this.getDateList();
  }

  componentDidMount() {
    this.init(this.state.todayDay);
  }

  state = {
    todayDay: moment().isoWeekday(),
    todayDate: '',
    shoppingSundayList: [],
    sundays: [
      { toBe: 'Była', text: '' },
      { toBe: 'Będzie', text: '' },
      { toBe: 'Jest', text: '' },
    ],
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
    const skipTodaySunday = toNextSunday + 7;

    toNextSunday === 0 ? setSunday(skipTodaySunday) : setSunday(toNextSunday);
  };

  setPrevSundayDate = toPreviousSunday => {
    const prevSundayDate = moment()
      .subtract(toPreviousSunday, 'days')
      .format('YYYY-MM-DD');
    return prevSundayDate;
  };

  setShoppingState = (wasShopping, willBeShopping, isShopping) => {
    const sundaysArr = [...this.state.sundays];

    const prevNowNext = [wasShopping, willBeShopping, isShopping];

    const updatedSundays = sundaysArr.map((el, index) => {
      prevNowNext[index] ? (el.text = 'handlowa') : (el.text = 'niehandlowa');
      return { ...el, text: el.text };
    });

    this.setState({ sundays: updatedSundays });
  };

  init = today => {
    const isSunday = this.isSundayCheck();

    if (isSunday) {
      const getTodayDate = this.getDate();
      const isTodayOnList = this.isDateOnList(getTodayDate);

      const daysToNextSunday = this.getDaysToNextSunday(today);
      const nextSundayDate = this.setNextSundayDate(daysToNextSunday);
      const isNextDateOnList = this.isDateOnList(nextSundayDate);

      const prevSundayDate = this.setPrevSundayDate(today);
      const isPrevDateOnList = this.isDateOnList(prevSundayDate);

      this.setShoppingState(isPrevDateOnList, isNextDateOnList, isTodayOnList);
    } else {
      const daysToNextSunday = this.getDaysToNextSunday(today);
      const nextSundayDate = this.setNextSundayDate(daysToNextSunday);
      const isNextDateOnList = this.isDateOnList(nextSundayDate);

      const prevSundayDate = this.setPrevSundayDate(today);
      const isPrevDateOnList = this.isDateOnList(prevSundayDate);
      this.setShoppingState(isPrevDateOnList, isNextDateOnList);
    }
  };

  render() {
    const { sundays, todayDay } = this.state;

    const showSundays = (
      <div>
        {sundays.map((sunday, index) => {
          if (index === 2 && !(todayDay === 7)) {
            null;
          } else {
            return <Sunday verb={sunday.toBe} text={sunday.text} key={index} />;
          }
        })}
      </div>
    );

    return (
      <Center>
        <Wrapper>{showSundays}</Wrapper>
      </Center>
    );
  }
}

export default App;
