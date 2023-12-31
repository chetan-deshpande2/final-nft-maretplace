import React, {useState, Fragment} from 'react';
import Breadcrumb from '../common/breadcrumb.component';
import data from '../../data/icons/themifyData';
import IconMarkUp from './icon-markup';
import {Container,Row,Col,Card,CardHeader,CardBody} from 'reactstrap'

const Samplepage = () => {

    const [iTag, setiTag] = useState('');
    const [icon, setIcon] = useState('');
    
    const getItag = (tag) => {
        setiTag({
            iTag: '<i className= "' + tag + '"></i>',
        })
        setIcon({
            icon : '' + tag + ' fa-2x'
        })
    }

    return (
        <Fragment>
            <Breadcrumb title="Themify Icon" parent="Icons"/>
            {/*Container-fluid starts*/}
            <Container fluid={true}>
                {
                    data.map((icons, index) => {
                        return (
                            <Row key={index}>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Arrows & Direction</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.directional.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`${icon}`}></i> {icon}
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
                                            <h5 className="m-b-0"><span className="digits">Web App</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.webapp.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`${icon}`}></i> {icon}
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
                                            <h5 className="m-b-0"><span className="digits">Control</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists">
                                                {icons.control.map((icon, i) => {
                                                    return (
                                                        <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <i className={`${icon}`}></i> {icon}
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
                                                            <i className={`${icon}`}></i> {icon}
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
                                                            <i className={`${icon}`}></i> {icon}
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


export default Samplepage;