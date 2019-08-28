import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

function Day(props) {
    return (
        <button className="day">{props.date ? props.date : null}</button>
    );
}

function Week(props) {
    let date = props.date;
    let tempValue = date;
    const offset = props.offset ? props.offset : 0;
    
    let week = offset ? new Array(7 - offset) : new Array(7);
    week = week.fill(null).map(() => tempValue++);

    let id=0;
    let blankDays = new Array(offset).fill(null).map(() => <td key={id++}><Day></Day></td>);

    let days = week.map((index) => {
        return (
            <td key={index+offset}><Day date={date <= props.endDate ? date++ : null}></Day></td>
        );
    });

    return (
        <tr className="week">
            {blankDays}
            {days}
        </tr>
    );
}

function Month(props) {
    let month = (props.date).getMonth();
    let monthName = getMonthName(month);
    let year = ((props.date).getFullYear()).toString();
    
    
    let monthAndYear = monthName + " " + year;
    let offset = props.date.getDay();
    let date = 1;
    let endDate = getMonthTotal(year, month);
    const sevenDays = 7;
    return (
        <div className="month">
            <Row md="auto" className="justify-content-md-center">
                <Button id="prev" variant="outline-secondary">Prev</Button>
                <h2>{monthAndYear}</h2>
                <Button id="next" variant="outline-secondary">Next</Button>
            </Row>
            <table>
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody>
                    <Week offset={offset} date={date} endDate={endDate}></Week>
                    <Week date={date+=sevenDays-offset} endDate={endDate}></Week>
                    <Week date={date+=sevenDays} endDate={endDate}></Week>
                    <Week date={date+=sevenDays} endDate={endDate}></Week>
                    <Week date={date+=sevenDays} endDate={endDate}></Week>
                </tbody>
            </table>
        </div>
    );
}

function Calendar(props) {
    let date = new Date(2019, 7);

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

function getMonthTotal (year, month){
    return 32 - new Date(year, month, 32).getDate();
}
  