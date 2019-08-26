import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Day(props) {
    return <div className="day">{props.name}</div>
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
    

    return (
        <div className="month">
            <Week></Week>
            <Week></Week>
            <Week></Week>
            <Week></Week>
            <Week></Week>
        </div>
    );
}

class Calendar extends React.Component{

    render(){
        return (
            <div className="calendar">
                <Month></Month>
            </div>
        );
    }
}

ReactDOM.render(
    <Calendar />,
    document.getElementById('root')
  );
  