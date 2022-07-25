import React, { useEffect, useState } from 'react'
import { Container, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import { FaBuilding, FaMapMarkerAlt, FaSearch } from "react-icons/fa"
import { API_URL } from '../config'
import '../styling/JobList.css'

export default function JobList() {
    const [jobList, setJobList] = useState([])
    const [fetchDepartment, setDeparment] = useState([])
    const [fetchCity, setCity] = useState([])
    const [fetchFunction, setFunction] = useState([])
    const [selectDepartment, setSelectDepartment] = useState('')
    const [selectLocation, setSelectLocation] = useState('')
    const [selectFunction, setSelectFunction] = useState('')
    const [searchTxt, setSearchTxt] = useState('')

    useEffect(() => {
        fetch(`${API_URL}/v1/jobs`)
            .then(res => res.json())
            .then(res => {
                setJobList(res)
            })

    }, [jobList])

    useEffect(() => {
        fetch(`${API_URL}/v1/departments`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setDeparment(res)
            })
    }, [])

    useEffect(() => {
        fetch(`${API_URL}/v1/locations`)
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                setCity(res)
            })
    }, [])

    useEffect(() => {
        fetch(`${API_URL}/v1/functions`)
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                setFunction(res)
            })
    }, [])

    const handleDepartment = (e) => {
        setSelectDepartment(e.target.value)
        const departmentFilter = jobList.filter(item => item.department !== null).map((item) => {
            console.log({ item })
            return item.department.title === selectDepartment;
        })
        console.log(departmentFilter)
    }

    const handleView = (url) => {
        window.open(url.toString());
    }

    const handleApply = (id) => {
        window.open(`https://demo.jobsoid.com/apply/${id}`)
    }

    const handleSearch = () => {
        let SearchFilter = jobList.filter((item) => {
            return item.title.toLowerCase() === searchTxt.toLowerCase()
        })
        // console.log(SearchFilter)
        setJobList(SearchFilter)
    }

    const handleLocation = (e) => {
        setSelectLocation(e.target.value)
        let locationFilter = jobList.filter((item) => {
            return item.location.city === selectLocation
        })
        // console.log(locationFilter)
        setJobList(locationFilter)
    }

    const handleFuntion = (e) => {
        setSelectFunction(e.target.value)
        let functionFilter = jobList.filter((item) => {
            return item.title === selectFunction
        })
        setJobList(functionFilter)
    }

    return (
        <React.Fragment>
            <Container className="container-background">
                <Row>
                    <Col className="container-space">
                        <InputGroup className="mb-3">
                            <Form.Control aria-label="Search" placeholder="Job Title" onChange={(e) => setSearchTxt(e.target.value)} />
                            <InputGroup.Text onClick={handleSearch}><FaSearch /></InputGroup.Text>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Select aria-label="Department" onChange={handleDepartment}>
                            <option>Department</option>
                            {fetchDepartment.map((department, key) => {
                                return <option value={department.title}>{department.title}</option>
                            })}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select aria-label="Location" onChange={handleLocation}>
                            <option>Location</option>
                            {fetchCity.map((city, key) => {
                                return <option value={city.city}>{city.city}</option>
                            })}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select aria-label="Function" onChange={handleFuntion}>
                            <option>Function</option>
                            {fetchFunction.map((functions, key) => {
                                return <option value={key.id}>{functions.title}</option>
                            })}
                        </Form.Select>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    {/* {jobList.map((item) => { */}
                    {jobList.filter(item => item.department !== null).map((item) => {
                        return <div>
                            <div class="d-flex ">
                                <div class="p-2 flex-grow-1 text-info"><h3>{(item.department !== null) ? item.department.title : 'Value - Null'}</h3>
                                    <h5 className="text-primary text-left">{(item.title !== null) ? item.title : ''}</h5></div>
                                <div class="p-2 "><Button onClick={() => handleApply(item.id)} >Apply</Button></div>
                                <div class="p-2 "><Button onClick={() => handleView(item.hostedUrl)} variant="light">View</Button></div>
                            </div>

                            <div style={{ display: 'flex', }}>
                                <span><FaBuilding /> {(item.department !== null) ? item.department.title : ''}</span>
                                <span><FaMapMarkerAlt />{item.location.city ? item.location.city : ''}, {item.location.state ? item.location.state : ''}  </span>
                            </div>  <hr></hr> </div>
                    })}
                </Row>
            </Container>
        </React.Fragment>
    )
}
