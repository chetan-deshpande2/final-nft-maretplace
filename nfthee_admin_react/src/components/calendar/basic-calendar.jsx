import React, { Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb.component';
import { Calendar, momentLocalizer,Views} from 'react-big-calendar'
import moment from 'moment'
import myEventsList from "./Events";
import {Container,Row,Col,Card,CardHeader,CardBody} from 'reactstrap'
const localizer = momentLocalizer(moment)
let allViews = Object.keys(Views).map(k => Views[k])

const BasicCalender = () => {

    return (
        <Fragment>
            <Breadcrumb title="Basic Calender" parent="Calendar"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Basic Calendar</h5>
                            </CardHeader>
                            <CardBody>
                                <Calendar
                                    localizer={localizer}
                                    scrollToTime={new Date(1970, 1, 1, 6)}
                                    defaultDate={new Date(2019, 3, 12)}
                                    onSelectEvent={event => alert(event.title)}
                                    views={allViews}
                                    events={myEventsList}
                                    eventOverlap
                                    dragRevertDuration={500}
                                    dragScroll
                                    droppable={true}
                                    showMultiDayTimes
                                    step={60}
                                    startAccessor="start"
                                    endAccessor="end"
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default BasicCalender;