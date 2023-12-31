import React, { Component } from 'react';

// import Custom Componenets
import Breadcrumb from '../../common/breadcrumb.component';


class Steps extends Component {

    render() {

        return (
            <div>
                <Breadcrumb title="Steps" parent="Advance"/>

                {/*Container-fluid starts*/}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Default Step</h5>
                                </div>
                                <div className="card-body">
                                    <div className="u-steps row">
                                        <div className="u-step col-sm-4">
                                            <span className="u-step-number">1</span>
                                            <div className="u-step-desc">
                                                <span className="u-step-title">Shopping</span>
                                                <p>Choose what you want</p>
                                            </div>
                                        </div>

                                        <div className="u-step col-sm-4 current">
                                            <span className="u-step-number">2</span>
                                            <div className="u-step-desc">
                                                <span className="u-step-title">Billing</span>
                                                <p>Pay for the bill</p>
                                            </div>
                                        </div>

                                        <div className="u-step col-sm-4">
                                            <span className="u-step-number">3</span>
                                            <div className="u-step-desc">
                                                <span className="u-step-title">Getting</span>
                                                <p>Waiting for the goods</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Step with icon</h5>
                                </div>
                                <div className="card-body">
                                    <div className="u-steps row">
                                        <div className="u-step col-md-4">
                                            <span className="u-step-icon icon-shopping-cart-full"
                                                  aria-hidden="true"></span>
                                            <div className="u-step-desc">
                                                <span className="u-step-title">Shopping</span>
                                            </div>
                                        </div>

                                        <div className="u-step col-md-4 current">
                                            <span className="u-step-icon icon-notepad" aria-hidden="true"></span>
                                            <div className="u-step-desc">
                                                <span className="u-step-title">Billing</span>
                                            </div>
                                        </div>

                                        <div className="u-step col-md-4">
                                            <span className="u-step-icon icon-time" aria-hidden="true"></span>
                                            <div className="u-step-desc">
                                                <span className="u-step-title">Getting</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Step States</h5>
                                    <span>A u-step with classname <code>.done</code> A u-step with classname <code>.error</code>A u-step with classname <code>.current</code>A u-step with classname <code>.disabled</code></span>
                                </div>
                                <div className="card-body">
                                    <div className="row row-lg">
                                        <div className="col-xl-3 col-lg-6">
                                            <div className="u-step done bg-primary">
                                                <span className="u-step-number txt-primary">1</span>
                                                <div className="u-step-desc">
                                                    <span className="u-step-title">Getting</span>
                                                    <p>Waiting for the goods</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-lg-6 steps-md-mt">
                                            <div className="u-step error bg-secondary">
                                                <span className="u-step-number txt-secondary">2</span>
                                                <div className="u-step-desc">
                                                    <span className="u-step-title">Getting</span>
                                                    <p>Waiting for the goods</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-lg-6 lg-mt">
                                            <div className="u-step current bg-success ">
                                                <span className="u-step-number txt-success">3</span>
                                                <div className="u-step-desc">
                                                    <span className="u-step-title">Getting</span>
                                                    <p>Waiting for the goods</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-lg-6 lg-mt">
                                            <div className="u-step disabled">
                                                <span className="u-step-number">4</span>
                                                <div className="u-step-desc">
                                                    <span className="u-step-title">Getting</span>
                                                    <p>Waiting for the goods</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Step Sizing</h5>
                                    <span>A step with classname <code>.u-steps-xs</code> <code>.u-steps-sm</code> <code>.u-steps-lg</code> </span>
                                </div>
                                <div className="card-body">
                                    <div className="u-steps row u-steps-xs steps-sizing-sm-mb">
                                        <div className="u-step col-md-4">
                                            <span className="u-step-icon icon wb-shopping-cart"
                                                  aria-hidden="true"></span>
                                            <div className="u-step-desc">
                                                <span className="u-step-title">Shopping</span>
                                            </div>
                                        </div>
                                        <div className="u-step col-md-4 current">
                                            <span className="u-step-icon icon wb-pluse" aria-hidden="true"></span>
                                            <div className="u-step-desc">
                                                <span className="u-step-title">Billing</span>
                                            </div>
                                        </div>
                                        <div className="u-step col-md-4">
                                            <span className="u-step-icon icon wb-time" aria-hidden="true"></span>
                                            <div className="u-step-desc">
                                                <span className="u-step-title">Getting</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="u-steps row u-steps-sm steps-sizing-sm-mb">
                                        <div className="u-step col-md-4">
                                            <span className="u-step-icon icon wb-shopping-cart"
                                                  aria-hidden="true"></span>
                                            <div className="u-step-desc">
                                                <span className="u-step-title">Shopping</span>
                                            </div>
                                        </div>
                                        <div className="u-step col-md-4 current">
                                            <span className="u-step-icon icon wb-pluse" aria-hidden="true"></span>
                                            <div className="u-step-desc">
                                                <span className="u-step-title">Billing</span>
                                            </div>
                                        </div>
                                        <div className="u-step col-md-4">
                                            <span className="u-step-icon icon wb-time" aria-hidden="true"></span>
                                            <div className="u-step-desc">
                                                <span className="u-step-title">Getting</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="u-steps row steps-sizing-sm-mb">
                                        <div className="u-step col-md-4">
                                            <span className="u-step-icon icon wb-shopping-cart"
                                                  aria-hidden="true"></span>
                                            <div className="u-step-desc">
                                                <span className="u-step-title">Shopping</span>
                                            </div>
                                        </div>
                                        <div className="u-step col-md-4 current">
                                            <span className="u-step-icon icon wb-pluse" aria-hidden="true"></span>
                                            <div className="u-step-desc">
                                                <span className="u-step-title">Billing</span>
                                            </div>
                                        </div>
                                        <div className="u-step col-md-4">
                                            <span className="u-step-icon icon wb-time" aria-hidden="true"></span>
                                            <div className="u-step-desc">
                                                <span className="u-step-title">Getting</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="u-steps row u-steps-lg">
                                        <div className="u-step col-md-4">
                                            <span className="u-step-icon icon wb-shopping-cart"
                                                  aria-hidden="true"></span>
                                            <div className="u-step-desc">
                                                <span className="u-step-title">Shopping</span>
                                            </div>
                                        </div>
                                        <div className="u-step col-md-4 current">
                                            <span className="u-step-icon icon wb-pluse" aria-hidden="true"></span>
                                            <div className="u-step-desc">
                                                <span className="u-step-title">Billing</span>
                                            </div>
                                        </div>
                                        <div className="u-step col-md-4">
                                            <span className="u-step-icon icon wb-time" aria-hidden="true"></span>
                                            <div className="u-step-desc">
                                                <span className="u-step-title">Getting</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Vertical Step</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="u-steps u-steps-vertical">
                                                <div className="u-step">
                                                    <span className="u-step-number">1</span>
                                                    <div className="u-step-desc">
                                                        <span className="u-step-title">Shopping</span>
                                                        <p>Choose what you want</p>
                                                    </div>
                                                </div>
                                                <div className="u-step current">
                                                    <span className="u-step-number">2</span>
                                                    <div className="u-step-desc">
                                                        <span className="u-step-title">Billing</span>
                                                        <p>Pay for the bill</p>
                                                    </div>
                                                </div>
                                                <div className="u-step">
                                                    <span className="u-step-number">3</span>
                                                    <div className="u-step-desc">
                                                        <span className="u-step-title">Getting</span>
                                                        <p>Waiting for the goods</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Default Pearls Steps</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="u-pearl done col-4">
                                            <span className="u-pearl-number">1</span>
                                            <span className="u-pearl-title">Account Info</span>
                                        </div>
                                        <div className="u-pearl current col-4">
                                            <span className="u-pearl-number">2</span>
                                            <span className="u-pearl-title">Billing Info</span>
                                        </div>
                                        <div className="u-pearl col-4">
                                            <span className="u-pearl-number digits">3</span>
                                            <span className="u-pearl-title">Confirmation</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Pearls Steps with icon</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="u-pearl done col-4">
                                            <div className="u-pearl-icon"><i className="icon-shopping-cart"
                                                                             aria-hidden="true"></i></div>
                                            <span className="u-pearl-title">Account Info</span>
                                        </div>
                                        <div className="u-pearl current col-4">
                                            <div className="u-pearl-icon"><i className="icon-write"
                                                                             aria-hidden="true"></i></div>
                                            <span className="u-pearl-title">Billing Info</span>
                                        </div>
                                        <div className="u-pearl col-4">
                                            <div className="u-pearl-icon"><i className="icon-check"
                                                                             aria-hidden="true"></i></div>
                                            <span className="u-pearl-title">Confirmation</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Pearls Step Sizing</h5>
                                    <span>A Pearls step with classname <code>.u-pearls-xs</code> <code>.u-pearls-sm</code> <code>.u-pearls-lg</code> </span>
                                </div>
                                <div className="card-body">
                                    <div className="u-pearls-xs row mb-5">
                                        <div className="u-pearl done col-4">
                                            <span className="u-pearl-number">1</span>
                                            <span className="u-pearl-title">Account Info</span>
                                        </div>
                                        <div className="u-pearl current col-4">
                                            <span className="u-pearl-number">2</span>
                                            <span className="u-pearl-title">Billing Info</span>
                                        </div>
                                        <div className="u-pearl col-4">
                                            <span className="u-pearl-number digits">3</span>
                                            <span className="u-pearl-title">Confirmation</span>
                                        </div>
                                    </div>

                                    <div className="u-pearls-sm row mb-5">
                                        <div className="u-pearl done col-4">
                                            <span className="u-pearl-number">1</span>
                                            <span className="u-pearl-title">Account Info</span>
                                        </div>
                                        <div className="u-pearl current col-4">
                                            <span className="u-pearl-number">2</span>
                                            <span className="u-pearl-title">Billing Info</span>
                                        </div>
                                        <div className="u-pearl col-4">
                                            <span className="u-pearl-number digits">3</span>
                                            <span className="u-pearl-title">Confirmation</span>
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="u-pearl done col-4">
                                            <span className="u-pearl-number">1</span>
                                            <span className="u-pearl-title">Account Info</span>
                                        </div>
                                        <div className="u-pearl current col-4">
                                            <span className="u-pearl-number">2</span>
                                            <span className="u-pearl-title">Billing Info</span>
                                        </div>
                                        <div className="u-pearl col-4">
                                            <span className="u-pearl-number digits">3</span>
                                            <span className="u-pearl-title">Confirmation</span>
                                        </div>
                                    </div>

                                    <div className="u-pearls-lg row">
                                        <div className="u-pearl done col-4">
                                            <span className="u-pearl-number">1</span>
                                            <span className="u-pearl-title">Account Info</span>
                                        </div>
                                        <div className="u-pearl current col-4">
                                            <span className="u-pearl-number">2</span>
                                            <span className="u-pearl-title">Billing Info</span>
                                        </div>
                                        <div className="u-pearl col-4">
                                            <span className="u-pearl-number digits">3</span>
                                            <span className="u-pearl-title">Confirmation</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Pearls Step States</h5>
                                    <span>A pearls step states with different class<code>.done</code> <code>.currunt</code> <code>.error</code> <code>.disabled</code></span>
                                </div>
                                <div className="card-body">
                                    <div className="row mb-5">
                                        <div className="u-pearl current col-4">
                                            <div className="u-pearl-icon">1</div>
                                            <span className="u-pearl-title">Account Info</span>
                                        </div>
                                        <div className="u-pearl disabled col-4">
                                            <div className="u-pearl-icon">2</div>
                                            <span className="u-pearl-title">Billing Info</span>
                                        </div>
                                        <div className="u-pearl disabled col-4">
                                            <div className="u-pearl-icon digits">3</div>
                                            <span className="u-pearl-title">Confirmation</span>
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="u-pearl done col-4">
                                            <div className="u-pearl-icon">1</div>
                                            <span className="u-pearl-title">Account Info</span>
                                        </div>
                                        <div className="u-pearl current col-4">
                                            <div className="u-pearl-icon">2</div>
                                            <span className="u-pearl-title">Billing Info</span>
                                        </div>
                                        <div className="u-pearl disabled col-4">
                                            <div className="u-pearl-icon digits">3</div>
                                            <span className="u-pearl-title">Confirmation</span>
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="u-pearl done col-4">
                                            <div className="u-pearl-icon">1</div>
                                            <span className="u-pearl-title">Account Info</span>
                                        </div>
                                        <div className="u-pearl current error col-4">
                                            <div className="u-pearl-icon">2</div>
                                            <span className="u-pearl-title">Billing Info</span>
                                        </div>
                                        <div className="u-pearl disabled col-4">
                                            <div className="u-pearl-icon digits">3</div>
                                            <span className="u-pearl-title">Confirmation</span>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="u-pearl done col-4">
                                            <div className="u-pearl-icon">1</div>
                                            <span className="u-pearl-title">Account Info</span>
                                        </div>
                                        <div className="u-pearl done col-4">
                                            <div className="u-pearl-icon">2</div>
                                            <span className="u-pearl-title">Billing Info</span>
                                        </div>
                                        <div className="u-pearl current col-4">
                                            <div className="u-pearl-icon digits">3</div>
                                            <span className="u-pearl-title">Confirmation</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Container-fluid Ends*/}
            </div>
        )
    }
}
export default Steps;
