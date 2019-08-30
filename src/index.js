import React, { useState } from 'react';
import { Fragment } from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Keyframes, animated } from 'react-spring/renderprops';
import { Icon } from 'antd';
import delay from 'delay';

// Creates a spring with predefined animation slots
const Sidebar = Keyframes.Spring({
    // Slots can take arrays/chains,
    peek: [{ x: 0, from: { x: -140 }, delay: 500 }, { x: -140, delay: 800 }],
    // single items,
    open: { delay: 0, x: 0 },
    // or async functions with side-effects
    close: async call => {
      await delay(400)
      await call({ delay: 0, x: -140 })
    },
  })
  
  // Creates a keyframed trail
  const Content = Keyframes.Trail({
    peek: [
      { x: 0, opacity: 1, from: { x: -140, opacity: 0 }, delay: 600 },
      { x: -140, opacity: 0, delay: 0 },
    ],
    open: { x: 0, opacity: 1, delay: 100 },
    close: { x: -140, opacity: 0, delay: 0 },
  })

  const items = [
     <Fragment>
        <Button
        size="small"
        type="primary"
        variant="outline-dark"
        className="sidebar-button"
        children="View Day"
        />
    </Fragment>
  ]

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

    let month = (props.fullDate).getMonth();
    let year = ((props.fullDate).getFullYear()).toString();
    let date = 1;
    const endDate = getMonthTotal(year, month);
    const offset = props.fullDate.getDay();
    const sevenDays = 7;

    return (
        <div className="month">
            <Row md="auto" className="justify-content-md-center">
                <Button 
                    id="prev" 
                    variant="outline-dark"
                    onClick={() => props.onClick(--month)}
                >
                    Prev
                </Button>
                <h2>{props.header}</h2>
                <Button 
                    id="next" 
                    variant="outline-dark"
                    onClick={() => props.onClick(++month)}
                >
                    Next
                </Button>
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
                    <Week date={date+=(sevenDays-offset)} endDate={endDate}></Week>
                    <Week date={date+=sevenDays} endDate={endDate}></Week>
                    <Week date={date+=sevenDays} endDate={endDate}></Week>
                    <Week date={date+=sevenDays} endDate={endDate}></Week>
                </tbody>
            </table>
        </div>
    );
}

function Calendar(props) {
    let date = new Date();
    date.setDate(1);
    const [fullDate, setDate] = useState(date);
    
    const [header, setHeader] = useState(getMonthName(fullDate.getMonth()) + " " + (fullDate.getFullYear()).toString());

    function setMonth(newMonth) {
        let tempDate = fullDate;
        tempDate.setMonth(newMonth);
        setDate(tempDate);
        setHeader(getMonthName(fullDate.getMonth()) + " " + (fullDate.getFullYear()).toString());
    }

    return (
        <Container className="calendar">
            <h1>Sarah's Calendar</h1>
            <Month 
                header={header} 
                fullDate={fullDate} 
                onClick={(m) => setMonth(m)}
            />
        </Container>
    );
}

export default class App extends React.Component {
    state = { open: undefined }
    toggle = () => this.setState(state => ({ open: !state.open }))

    render() {
        const state =
        this.state.open === undefined
            ? 'peek'
            : this.state.open
            ? 'open'
            : 'close'
        const icon = this.state.open ? 'fold' : 'unfold'

        return (
            <Container fluid={true} className="full-height">
                <Row className="full-height">
                    <Col xs={3} className="sidebar-col">
                        <Icon
                        type={`menu-${icon}`}
                        className="sidebar-toggle"
                        onClick={this.toggle}
                        />
                        <Sidebar native state={state}>
                        {({ x }) => (
                            <animated.div
                            className="sidebar"
                            style={{
                                transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                            }}>
                            <Content
                                native
                                items={items}
                                keys={items.map((_, i) => i)}
                                reverse={!this.state.open}
                                state={state}>
                                {(item, i) => ({ x, ...props }) => (
                                <animated.div
                                    style={{
                                    transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                                    ...props,
                                    }}>
                                    
                                    {item}
                                </animated.div>
                                )}
                            </Content>
                            </animated.div>
                        )}
                        </Sidebar>
                    </Col>
                    
                    <Col xs={6}>
                        <Calendar></Calendar>
                    </Col>
                </Row>
            </Container>
        );
    }
}

ReactDOM.render(
    <App />,
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