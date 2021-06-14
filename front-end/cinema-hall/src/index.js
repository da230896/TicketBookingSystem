import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import reportWebVitals from './reportWebVitals';
import SeatManager from './components/SeatManager';
import DropDownManager from './components/DropDownManager';
import PaymentDetailsBox from './components/PaymentDetailsBox';
import BookButton from './components/BookButton';
import TotalAmount from './components/TotalAmount'

ReactDOM.render(
  <React.StrictMode>
      <DropDownManager/>
      <SeatManager />
      <TotalAmount/>
      <PaymentDetailsBox/>
      <br></br>
      <BookButton/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
