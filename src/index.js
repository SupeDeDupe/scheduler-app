import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Day(props) {
    return (
        <button className="day">{props.name}</button>
    );
}

function Week(props) {

    return (
        <div className="week">
            <Day name="Monday"></Day>
            <Day name="Tuesday"></Day>
            <Day name="Wednesday"></Day>
            <Day name="Thusday"></Day>
            <Day name="Friday"></Day>
            <Day name="Saturday"></Day>
            <Day name="Sunday"></Day>
        </div>
    );
}

function Month(props) {
    let currentMonth = (props.date).getMonth();
    let monthName = getMonthName(currentMonth);
    // let date = new Date(2019, 8).getDay();
    // let date2 = 32 — new Date(2019, 8, 32).getDate();
    return (
        <div className="month">
            <h2>{monthName}</h2>
            <Week></Week>
            <Week></Week>
            <Week></Week>
            <Week></Week>
            <Week></Week>
        </div>
    );
}

function Calendar(props) {
    let date = new Date();

    return (
        <div className="calendar">
            <h1>Sarah's Calendar</h1>
            <Month date={date}></Month>
        </div>
    );
}

ReactDOM.render(
    <Calendar />,
    document.getElementById('root')
  );

function getMonthName (num) {
    var months = [ "January", "February", "March", "April", "May", "June", 
                "July", "August", "September", "October", "November", "December" ];
    return months[num];
}
  