import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Container from 'react-bootstrap/Container';

function Day(props) {
    return (
        <button className="day"></button>
    );
}

function Week(props) {

    return (
        <tr className="week">
            <td><Day name="Monday"></Day></td>
            <td><Day name="Tuesday"></Day></td>
            <td><Day name="Wednesday"></Day></td>
            <td><Day name="Thusday"></Day></td>
            <td><Day name="Friday"></Day></td>
            <td><Day name="Saturday"></Day></td>
            <td><Day name="Sunday"></Day></td>
        </tr>
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
            <table>
                <thead>
                    <tr>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                        <th>Sun</th>
                    </tr>
                </thead>
                <tbody>
                    <Week></Week>
                    <Week></Week>
                    <Week></Week>
                    <Week></Week>
                    <Week></Week>
                </tbody>
            </table>
        </div>
    );
}

function Calendar(props) {
    let date = new Date();

    return (
        <Container className="calendar">
            <h1>Sarah's Calendar</h1>
            <Month date={date}></Month>
        </Container>
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
  