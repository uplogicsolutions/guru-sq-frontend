import BasePage from 'pages/base/BasePage';
import React from 'react'
import { Col, Panel, Row } from 'rsuite';

const OthersProfile = () => {

    const jobs = [
        {
            title: 'Assistant Professor',
            time: 'Full Time',
            college: 'XYZ College',
            start_date: '2020',
            end_date: '',
            subjects: ['Maths', 'English']
        },
        {
            title: 'Assistant Professor',
            time: 'Full Time',
            college: 'XYZ College',
            start_date: '2020',
            end_date: '',
            subjects: ['Maths', 'English']
        }
    ]
    const educations = [
        {
            title: '12th',
            marks: '9 CGPA',
            college: 'XYZ College',
            start_date: '2020',
            end_date: '',
            subjects: ['Maths', 'English']
        },
        {
            title: '10th',
            marks: '9 CGPA',
            college: 'XYZ College',
            start_date: '2020',
            end_date: '',
            subjects: ['Maths', 'English']
        }
    ]
    return (
        <BasePage>
            <Row className="p-3 m-0 overflow-hidden">
                <Col xsHidden md={6}></Col>
                <Col xs={24} md={18}>
                    <div className="border p-5 shadow flex flex-col items-center md:flex-row ">
                        <div>
                            <img
                                className="border"
                                height="150"
                                width="150"
                                alt="user"
                                src="https://thathasthuwellness.com/wp-content/uploads/2020/05/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg" />
                        </div>
                        <div className="flex flex-col items-center md:items-start justify-center mx-5">
                            <p className="font-bold text-3xl md:text-5xl">User Name</p>
                            <p className="font-semibold"> International School</p>
                            <p className="font-medium"> City, State </p>
                        </div>
                    </div>
                    <hr />
                    {/* Job Details */}
                    <Panel
                        bordered
                        shaded
                        header={
                            <p className="text-2xl font-bold">Job Details</p>
                        }
                        className="">

                        {jobs.map(job => {
                            return (
                                <div className="shadow border p-4 mt-3">
                                    <Row>
                                        <Col className="border-r-0 md:border-r-2" xs={24} md={12}>
                                            <p className="text-lg">{job.title}</p>
                                            <p>{job.time}</p>
                                            <p>@ {job.college}</p>
                                        </Col>
                                        <Col className="mt-2 md:mt-0" xs={24} md={12}>
                                            <p>Period:- {job.start_date} - {job.end_date === '' ? 'present' : job.end_date}</p>
                                            <p>Subjects:- {job.subjects.toString()}</p>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })}
                    </Panel>
                    <hr />
                    {/* Education */}
                    <Panel
                        bordered
                        shaded

                        header={
                            <p className="text-2xl font-bold"> Education Details</p>
                        }
                        className="">

                        {educations.map(job => {
                            return (
                                <div className="shadow border p-4 mt-3">
                                    <Row>
                                        <Col className="border-r-0 md:border-r-2" xs={24} md={12}>
                                            <p className="text-lg">{job.title}</p>
                                            <p>{job.marks}</p>
                                            <p>@ {job.college}</p>
                                        </Col>
                                        <Col className="mt-2 md:mt-0" xs={24} md={12}>
                                            <p>Period:- {job.start_date} - {job.end_date === '' ? 'present' : job.end_date}</p>
                                            <p>Major:- {job.subjects.toString()}</p>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })}
                    </Panel>
                </Col>
            </Row>

        </BasePage>
    )
}

export default OthersProfile;