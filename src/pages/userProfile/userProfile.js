import BasePage from 'pages/base/BasePage';
import React, {useEffect} from 'react'
import { Col, Panel, Row } from 'rsuite';
import { useParams } from 'react-router-dom';

const UserProfile = () => {

    const { user_id } = useParams();
    console.log(user_id);

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

    const core_subjects = ['Maths', 'English']
    const guidance_subjects = ['Maths', 'English']
    const improvement_subjects = ['Maths', 'English']

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
                    <hr />
                    {/* Subjects */}
                    <Panel
                        bordered
                        shaded

                        header={
                            <p className="text-2xl font-bold">Subject Details</p>
                        }>
                        <Row>
                            <Col className="mt-3 md:mt-0" xs={24} md={8}>
                                <p className="font-bold">Core Subjects</p>
                                <Panel bordered>
                                    <ol className="px-4 py-2" style={{ listStyleType: "number" }}>
                                        {core_subjects.map(subject => {
                                            return (
                                                <li className="p-1" key={subject}>{subject}</li>
                                            )
                                        })}
                                    </ol>
                                </Panel>
                            </Col>
                            <Col className="mt-3 md:mt-0" xs={24} md={8}>
                                <p className="font-bold">Improvement Subjects</p>
                                <Panel bordered>
                                    <ol className="px-4 py-2" style={{ listStyleType: "number" }}>
                                        {improvement_subjects.map(subject => {
                                            return (
                                                <li className="p-1" key={subject}>{subject}</li>
                                            )
                                        })}
                                    </ol>
                                </Panel>
                            </Col>
                            <Col className="mt-3 md:mt-0"  xs={24} md={8}>
                                <p className="font-bold">Guidance Subjects</p>
                                <Panel bordered>
                                    <ol className="px-4 py-2" style={{ listStyleType: "number" }}>
                                        {guidance_subjects.map(subject => {
                                            return (
                                                <li className="p-1" key={subject}>{subject}</li>
                                            )
                                        })}
                                    </ol>
                                </Panel>
                            </Col>
                        </Row>

                    </Panel>
                </Col>
            </Row>

        </BasePage>
    )
}

export default UserProfile;