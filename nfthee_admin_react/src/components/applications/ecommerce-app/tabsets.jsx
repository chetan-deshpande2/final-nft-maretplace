import React, { Fragment, useState } from 'react';
import {Card,Row,Col,TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

const Tabset = () => {
    const [activeTab, setActiveTab] = useState('1');
    return (
        <Fragment>
            <Card>
                <Row className="product-page-main m-0">
                    <Col sm="12">
                    <Nav tabs className="borderb-tab-primary">
                        <NavItem  id="myTab" role="tablist">
                            <NavLink href="#" className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                                Febric
                            </NavLink>
                        </NavItem>
                        <NavItem  id="myTab" role="tablist">
                            <NavLink href="#"  className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                                Video
                            </NavLink>
                        </NavItem>
                        <NavItem  id="myTab" role="tablist">
                            <NavLink href="#"  className={activeTab === '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>
                                Details
                            </NavLink>
                        </NavItem>
                        <NavItem   id="myTab" role="tablist">
                            <NavLink href="#"  className={activeTab === '4' ? 'active' : ''} onClick={() => setActiveTab('4')}>
                                Details
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <p className="mb-0 m-t-20"> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                            <p className="mb-0 m-t-20">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                        </TabPane>
                        <TabPane tabId="2">
                        <p className="mb-0 m-t-20">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                                <p className="mb-0 m-t-20">Lorem ipsum dolor sit amet, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                        </TabPane>
                        <TabPane tabId="3">
                        <p className="mb-0 m-t-20"> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                            <p className="mb-0 m-t-20">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                        </TabPane>
                        <TabPane tabId="4">
                        <p className="mb-0 m-t-20">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                                <p className="mb-0 m-t-20">Lorem ipsum dolor sit amet, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                        </TabPane>
                    </TabContent>
                    </Col>
                </Row>
            </Card>
        </Fragment>
    );
}

export default Tabset;