import React, { useState, useEffect, Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb.component';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Table,
} from 'reactstrap';
// import backendInstance from "../../../backendInstance";
import backendInstance from '../../backendInstance';
import { countries } from './countryData';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import instance from '../../axios';
import axios from 'axios';
import Swal from 'sweetalert2';
const EditProfile = () => {
  // const[user,setUser]=useState([])
  const data = JSON.parse(localStorage.getItem('adminLoggedin'));
  const [userData, setUserData] = useState({
    username: '' || data.username,
    email_address: data.email_address || '',
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    bio: data.about || '',
    company: data.company || '',
    address: data.address || '',
    city: data.city || '',
    postalCode: data.postalCode || '',
    phoneNumber: '',
    country: data.country || '',
    profile_image: data.profile_image || '',
  });
  console.log({data})
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber || "");
  const [profile_image, setProfileimage] = useState(data.profile_image||'');
  // const handleProfilePic = (e) => {
  //   setProfileimage(URL.createObjectURL(e.target.files[0]));
  //   setUserData({
  //     ...userData,
  //     profile_image: e.target.files[0],
  //   });
  // };
  const handleProfilePic = async (e) => {
    const formData = new FormData();
    formData.append('uploadFile', e.target.files[0]);
    console.log({ formData });
    const result = await instance
      .post('api/uploadImageTest', formData)
      .then((response) => {
        return response.data;
      });
    console.log('image Data===>>', { result });
    setProfileimage(result);
    setProfileimage(URL.createObjectURL(e.target.files[0]));
  setUserData({
    ...userData,
    profile_image: result,
  });
  localStorage.setItem(
    'adminLoggedin',
    JSON.stringify(result))

  };

  // const handleProfilePic = (e) => {
  //   setProfileimage(URL.createObjectURL(e.target.files[0]));
  //   setUserData({
  //     ...userData,
  //     profile_image: e.target.files[0],
  //   });
  // };

  // const handleProfilePic = (e) => {
  //   setProfileimage(URL.createObjectURL(e.target.files[0]));
  //   setUserData({
  //     ...userData,
  //     profile_image: e.target.files[0],
  //   });
  // };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const handlePostal = (e) => {
    const limit = 6;

    // 👇️ only take first N characters
    setUserData({
      ...userData,
      [e.target.name]: parseInt(e.target.value.slice(0, limit)),
    });
  };
  console.log({ userData }, { phoneNumber });
  useEffect(() => {
    // http://192.168.1.143:8002/api/followingList?id=63737c4fe305d4f9b67d3acd
    instance
      .post(`/user/login`)
      // .then(res=> ( setUser(res.data.data)))
      .then((res) => console.log(res.data.data));
  }, []);
  const handleSub = (e) => {
    e.preventDefault();
    let data = userData;
    data.phoneNumber = phoneNumber;
    instance.post("/api/updateAdmin", data).then((res) => {
      if (res.status === 200) { 
        setUserData(res.data.data);
        localStorage.setItem('adminLoggedin', JSON.stringify(res.data.data));

        Swal.fire({
          icon: 'success',
          title: 'Profile Updated Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <Fragment>
      <Breadcrumb title='Edit Profile' parent='Users' />
      <Container fluid={true}>
        <div className='edit-profile'>
          <Row>
            <Col xl='4'>
              <Card>
                <CardHeader>
                  <h4 className='card-title mb-0'>My Profile</h4>
                  <div className='card-options'>
                    <a
                      href='#javaScript'
                      className='card-options-collapse'
                      data-toggle='card-collapse'
                    >
                      <i className='fe fe-chevron-up'></i>
                    </a>
                    <a
                      href='#javaScript'
                      className='card-options-remove'
                      data-toggle='card-remove'
                    >
                      <i className='fe fe-x'></i>
                    </a>
                  </div>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row className='mb-2'>
                      <div className='col-auto'>
                        <img
                          className='rounded-circle'
                          style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                          }}
                          alt=''
                          src={data.profile_image}
                        />
                      </div>
                      <div className='col'>
                        <h4 className='mb-0'>{data.username}</h4>
                        <p className='mb-4 '>Admin</p>
                      </div>
                    </Row>
                    <Row className='mb-2'>
                      <div className='col'>
                        <h6 className='form-label'>
                          <span>First Name: </span> {data.firstName}
                        </h6>
                        {/* <h3 className="mb-0 text-sm"> {data.firstName}</h3> */}
                        <h6 className='form-label'>
                          Last Name: {data.lastName}
                        </h6>
                        {/* <h4 className="mb-0">{data.lastName}</h4> */}
                      </div>
                    </Row>
                    <Row className='mb-2'>
                      <div className='col'>
                        <h6 className='form-label'>Phone Number </h6>
                        <h3 className='mb-0'> {data.phoneNumber}</h3>
                      </div>
                    </Row>
                    {/* <FormGroup>
                                                <h6 className="form-label">Bio</h6>
                                                <textarea className="form-control" rows="5" defaultValue="On the other hand, we denounce with righteous indignation" />
                                            </FormGroup>
                                            <FormGroup>
                                                <label className="form-label">Email-Address</label>
                                                <input className="form-control" placeholder="your-email@domain.com" />
                                            </FormGroup>
                                            <FormGroup>
                                                <label className="form-label">Password</label>
                                                <input type="password" className="form-control" defaultValue="password" />
                                            </FormGroup> */}
                    {/* <FormGroup>
                                                <label className="form-label">Website</label>
                                                <input className="form-control" placeholder="http://Uplor .com" />
                                            </FormGroup> */}
                    {/* <div className="form-footer">
                                                <button className="btn btn-primary btn-block">Save</button>
                                            </div> */}
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col xl='8'>
              <Form className='card' onSubmit={handleSub}>
                <CardHeader>
                  <h4 className='card-title mb-0'>Edit Profile</h4>
                  <div className='card-options'>
                    <a
                      href='#javaScript'
                      className='card-options-collapse'
                      data-toggle='card-collapse'
                    >
                      <i className='fe fe-chevron-up'></i>
                    </a>
                    <a
                      href='#javaScript'
                      className='card-options-remove'
                      data-toggle='card-remove'
                    >
                      <i className='fe fe-x'></i>
                    </a>
                  </div>
                </CardHeader>
                <CardBody>
                  <Row className='mb-6 pd-6'>
                    <div className='col-auto' style={{ margin: 'auto' }}>
                      <label className='form-label'>
                        <img
                          className='img-100 rounded-circle'
                          style={{
                            cursor: 'grab',
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                          }}
                          alt=''
                          src={
                            profile_image ||
                            require('../../assets/images/user/11.png')
                          }
                        />
                        <input
                          type='file'
                          onChange={handleProfilePic}
                          name='profile_image'
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                  </Row>
                  <Row>
                    <Col md='5'>
                      <FormGroup>
                        <label className='form-label'>
                          Company
                          <input
                            required
                            type='text'
                            className='form-control'
                            name='company'
                            value={userData.company}
                            onChange={handleChange}
                            placeholder='Company'
                          />
                        </label>
                      </FormGroup>
                    </Col>
                    <Col sm='6' md='3'>
                      <FormGroup>
                        <label className='form-label'>
                          Username
                          <input
                            type='text'
                            className='form-control'
                            name='username'
                            value={userData.username}
                            onChange={handleChange}
                            placeholder='Username'
                          />
                        </label>
                      </FormGroup>
                    </Col>
                    <Col sm='6' md='4'>
                      <FormGroup>
                        <label className='form-label'>
                          Email address
                          <input
                            type='email'
                            className='form-control'
                            name='email_address'
                            value={userData.email_address}
                            onChange={handleChange}
                            placeholder='Email'
                          />
                        </label>
                      </FormGroup>
                    </Col>
                    <Col sm='6' md='6'>
                      <FormGroup>
                        <label className='form-label'>
                          First Name
                          <input
                            type='text'
                            className='form-control'
                            name='firstName'
                            value={userData.firstName}
                            onChange={handleChange}
                            placeholder='Company'
                          />
                        </label>
                      </FormGroup>
                    </Col>
                    <Col sm='6' md='6'>
                      <FormGroup>
                        <label className='form-label'>
                          Last Name
                          <input
                            type='text'
                            className='form-control'
                            name='lastName'
                            value={userData.lastName}
                            onChange={handleChange}
                            placeholder='Last Name'
                          />
                        </label>
                      </FormGroup>
                    </Col>
                    <Col md='12'>
                      <FormGroup>
                        <label className='form-label'>
                          Address
                          <input
                            type='text'
                            className='form-control'
                            name='address'
                            value={userData.address}
                            onChange={handleChange}
                            placeholder='Home Address'
                          />
                        </label>
                      </FormGroup>
                    </Col>
                    <Col sm='6' md='4'>
                      <FormGroup>
                        <label className='form-label'>
                          City
                          <input
                            type='text'
                            className='form-control'
                            name='city'
                            value={userData.city}
                            onChange={handleChange}
                            placeholder='City'
                          />
                        </label>
                      </FormGroup>
                    </Col>
                    <Col sm='6' md='3'>
                      <FormGroup>
                        <label className='form-label'>Postal Code</label>
                        <input
                          type='number'
                          className='form-control'
                          name='postalCode'
                          value={userData.postalCode}
                          onChange={handlePostal}
                          placeholder='ZIP Code'
                        />
                      </FormGroup>
                    </Col>
                    <Col md='5'>
                      <FormGroup>
                        <label className='form-label'>
                          Country
                          <select
                            className='form-select countrypicker form-control w-100 mb-3'
                            style={{
                              webkitAppearance: 'menulist',
                              height: '45px',
                            }}
                            data-live-search='true'
                            placeholder='Country'
                            onChange={handleChange}
                            name='country'
                            value={userData.country}
                          >
                            {countries.map((item, index) => {
                              return (
                                <>
                                  <option
                                    key={index}
                                    className='opion'
                                    value={item.code}
                                  >
                                    {item.name}
                                  </option>
                                </>
                              );
                            })}
                          </select>
                        </label>
                      </FormGroup>
                    </Col>
                    <Col md='12'>
                      <FormGroup className='mb-0'>
                        <label className='form-label'>
                          Phone no.
                          <PhoneInput
                            country={userData.country.toLowerCase()}
                            value={phoneNumber}
                            inputProps={{
                              name: 'phoneNumber',
                            }}
                            onChange={(phonenumber) =>
                              setPhoneNumber(phonenumber)
                            }
                          />
                        </label>
                      </FormGroup>
                    </Col>
                    <Col md='12'>
                      <FormGroup className='mb-0'>
                        <label className='form-label'>
                          About Me
                          <textarea
                            rows='3'
                            className='form-control'
                            name='bio'
                            value={userData.bio}
                            onChange={handleChange}
                            placeholder='Enter About your description'
                          ></textarea>
                        </label>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <div className='card-footer text-right'>
                  <button onClick={handleSub} className='btn btn-primary'>
                    Update Profile
                  </button>
                </div>
              </Form>
            </Col>
            <Col md='12'>
              <Card>
                <CardHeader>
                  <h4 className='card-title mb-0'>Add projects And Upload</h4>
                  <div className='card-options'>
                    <a
                      href='#javaScript'
                      className='card-options-collapse'
                      data-toggle='card-collapse'
                    >
                      <i className='fe fe-chevron-up'></i>
                    </a>
                    <a
                      href='#javaScript'
                      className='card-options-remove'
                      data-toggle='card-remove'
                    >
                      <i className='fe fe-x'></i>
                    </a>
                  </div>
                </CardHeader>
                <div className='table-responsive'>
                  <Table className='card-table table-vcenter text-nowrap'>
                    <thead>
                      <tr>
                        <th>Project Name</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <a href='#javaScript' className='text-inherit'>
                            Untrammelled prevents{' '}
                          </a>
                        </td>
                        <td>28 May 2018</td>
                        <td>
                          <span className='status-icon bg-success'></span>{' '}
                          Completed
                        </td>
                        <td className='digits'>$56,908</td>
                        <td className='text-right'>
                          <a
                            href='#javaScript'
                            className='btn btn-primary btn-sm'
                          >
                            <i className='fa fa-pencil'></i> Edit
                          </a>

                          <a
                            href='#javaScript'
                            className='btn btn-green btn-sm'
                          >
                            <i className='fa fa-link'></i> Update
                          </a>

                          <a
                            href='#javaScript'
                            className='btn btn-danger btn-sm'
                          >
                            <i className='fa fa-trash'></i> Delete
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href='#javaScript' className='text-inherit'>
                            Untrammelled prevents
                          </a>
                        </td>
                        <td>12 June 2018</td>
                        <td>
                          <span className='status-icon bg-danger'></span> On
                          going
                        </td>
                        <td className='digits'>$45,087</td>
                        <td className='text-right'>
                          <a
                            href='#javaScript'
                            className='btn btn-primary btn-sm'
                          >
                            <i className='fa fa-pencil'></i> Edit
                          </a>

                          <a
                            href='#javaScript'
                            className='btn btn-green btn-sm'
                          >
                            <i className='fa fa-link'></i> Update
                          </a>

                          <a
                            href='#javaScript'
                            className='btn btn-danger btn-sm'
                          >
                            <i className='fa fa-trash'></i> Delete
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href='#javaScript' className='text-inherit'>
                            Untrammelled prevents
                          </a>
                        </td>
                        <td>12 July 2018</td>
                        <td>
                          <span className='status-icon bg-warning'></span>{' '}
                          Pending
                        </td>
                        <td className='digits'>$60,123</td>
                        <td className='text-right'>
                          <a
                            href='#javaScript'
                            className='btn btn-primary btn-sm'
                          >
                            <i className='fa fa-pencil'></i> Edit
                          </a>

                          <a
                            href='#javaScript'
                            className='btn btn-green btn-sm'
                          >
                            <i className='fa fa-link'></i> Update
                          </a>

                          <a
                            href='#javaScript'
                            className='btn btn-danger btn-sm'
                          >
                            <i className='fa fa-trash'></i> Delete
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href='#javaScript' className='text-inherit'>
                            Untrammelled prevents
                          </a>
                        </td>
                        <td>14 June 2018</td>
                        <td>
                          <span className='status-icon bg-warning'></span>{' '}
                          Pending
                        </td>
                        <td className='digits'>$70,435</td>
                        <td className='text-right'>
                          <a
                            href='#javaScript'
                            className='btn btn-primary btn-sm'
                          >
                            <i className='fa fa-pencil'></i> Edit
                          </a>

                          <a
                            href='#javaScript'
                            className='btn btn-green btn-sm'
                          >
                            <i className='fa fa-link'></i> Update
                          </a>

                          <a
                            href='#javaScript'
                            className='btn btn-danger btn-sm'
                          >
                            <i className='fa fa-trash'></i> Delete
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href='#javaScript' className='text-inherit'>
                            Untrammelled prevents
                          </a>
                        </td>
                        <td>25 June 2018</td>
                        <td>
                          <span className='status-icon bg-success'></span>{' '}
                          Completed
                        </td>
                        <td className='digits'>$15,987</td>
                        <td className='text-right'>
                          <a
                            href='#javaScript'
                            className='btn btn-primary btn-sm'
                          >
                            <i className='fa fa-pencil'></i> Edit
                          </a>

                          <a
                            href='#javaScript'
                            className='btn btn-green btn-sm'
                          >
                            <i className='fa fa-link'></i> Update
                          </a>

                          <a
                            href='#javaScript'
                            className='btn btn-danger btn-sm'
                          >
                            <i className='fa fa-trash'></i> Delete
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};
export default EditProfile;
