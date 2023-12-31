import React, { Fragment } from 'react';
import Breadcrumb from '../../../common/breadcrumb.component';
import StepZilla from "react-stepzilla";
import Registration from './registration';
import Email from './email';
import Birthdate from './birthdate';
import {Container,Row,Col,Card,CardHeader,CardBody} from 'reactstrap'

const FormWizard = () => {
    const steps =
        [
            { name: 'Step 1', component: <Registration /> },
            { name: 'Step 2', component: <Email /> },
            { name: 'Step 3', component: <Birthdate /> },
            
        ]
    return (
        <Fragment>
            <Breadcrumb title="Form Wizard" parent="Form"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Form Wizard With Icon</h5>
                            </CardHeader>
                            <CardBody>
                            <StepZilla 
                                steps={steps} 
                                showSteps={true} 
                                showNavigation={true} 
                                stepsNavigation={true}
                                prevBtnOnLastStep={true}
                                dontValidate={true} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>


        </Fragment>
    );
};

export default FormWizard;