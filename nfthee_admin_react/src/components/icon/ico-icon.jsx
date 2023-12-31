import React, {Fragment,useState} from 'react';
import Breadcrumb from '../common/breadcrumb.component';
import data from '../../data/icons/icoData';
import IconMarkUp from './icon-markup';
import {Container,Row,Col,Card,CardHeader,CardBody} from 'reactstrap'

const IcoIcon = () => {

    const [iTag, setiTag] = useState('');
    const [icon, setIcon] = useState('');

    const getItag = (tag) => {
        setiTag({
            iTag: '<i className="icofont icofont-' + tag + '"></i>',
        })
        setIcon({
            icon : 'icofont icofont-' + tag + ' fa-2x'
        })
    }

    return (
        <Fragment>
            <Breadcrumb title="ico-icon" parent="Icons"/>
            {/*Container-fluid starts*/}
            <Container fluid={true}>
                {
                    data.map((icons, index) => {
                        return (
                            <Row key={index}>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Abstract</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.abstract.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Animal</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.animal.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Brand</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.brand.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Business</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.business.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Chart</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.chart.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Construction</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.construction.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Currency</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.currency.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Device</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.device.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Directional</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.directional.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Education</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.eduction.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Emotion</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.emotion.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">File Type</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.file.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Food</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.food.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Kids & Toys</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.kids.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Law</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.law.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Mathematical</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.mathematical.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Medical</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.medical.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Mobile UI</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.mobileui.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Multimedia</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.multimedia.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Payment</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.payment.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Person</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.person.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Search</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.search.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Social</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.social.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Sport</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.sport.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Text Editor</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.texteditor.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Transport</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.transport.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Travel</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.travel.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Weather</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.weather.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Web Application</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.webapplication.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`icofont icofont-${icon}`}></i> {icon}
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        )
                    })
                }
            </Container>
            <IconMarkUp itag={iTag} icons={icon} />
            {/*Container-fluid Ends*/}
        </Fragment>
    )
}


export default IcoIcon;