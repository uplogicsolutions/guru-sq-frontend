import BasePage from 'pages/base/BasePage';
import React, { useEffect, useState } from 'react'
import { Col, Loader, Panel, Row } from 'rsuite';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from './store';

const UserProfile = () => {
    const { user_id } = useParams();
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.userProfile);
    // console.log(profile);
    const [loading, setLoading] = useState(true)

    const loadData = async () => {
        await dispatch(getProfile(user_id))
        setLoading(false)
    }
    useEffect(() => {
        if (user_id) {
            loadData()
        }
    }, [user_id]);


    return (
        loading
            ?
            <Loader size='md' center={true} /> :
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
                                <p className="font-bold text-3xl md:text-5xl">{`${profile.first_name} ${profile.last_name}`}</p>
                                <p className="font-semibold">{profile.username}</p>
                                {/* <p className="font-medium"> City, State </p> */}
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
                            {profile.professional_details?.length === undefined ? 'No information provided' :
                                profile.professional_details.map(job => {
                                    return (
                                        <div className="shadow border p-4 mt-3">
                                            <Row>
                                                <Col className="border-r-0 md:border-r-2" xs={24} md={12}>
                                                    <p className="text-lg">{job.job_title}</p>
                                                    <p>{job.form_of_contract}</p>
                                                    <p>@ {job.educational_institute_name}</p>
                                                </Col>
                                                <Col className="mt-2 md:mt-0" xs={24} md={12}>
                                                    <p>Period:- {job.start_date} - {job.end_date === '' ? 'present' : job.end_date}</p>
                                                    <p>Core Subjects:- {job.job_core_subjects.toString()}</p>
                                                    <p>Supplementary Subjects:- {job.job_supplementary_subjects.toString()}</p>
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                })
                            }
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
                            {profile.educational_details && profile.educational_details?.length === 0 ? 'No information provided' :
                                profile.educational_details.map(education => {
                                    return (
                                        <div className="shadow border p-4 mt-3">
                                            <Row>
                                                <Col className="border-r-0 md:border-r-2" xs={24} md={12}>
                                                    <p className="text-lg">{education.degree_name}</p>
                                                    <p>{education.passing_grade}</p>
                                                    <p>@ {education.institute_name}</p>
                                                </Col>
                                                <Col className="mt-2 md:mt-0" xs={24} md={12}>
                                                    <p>Period:- {education.start_year} - {education.end_date === '' ? 'present' : education.end_year}</p>
                                                    <p>Major:- {profile.education_major_subject.toString()}</p>
                                                    <p>Minor:- {profile.education_minor_subject.toString()}</p>
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                })

                            }
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
                                        {profile.core_subjects.length === 0 ? 'No information provided' :
                                            <ol className="px-4 py-2" style={{ listStyleType: "number" }}>
                                                {profile.core_subjects.map(subject => {
                                                    return (
                                                        <li className="p-1" key={subject}>{subject}</li>
                                                    )
                                                })}
                                            </ol>
                                        }
                                    </Panel>
                                </Col>
                                <Col className="mt-3 md:mt-0" xs={24} md={8}>
                                    <p className="font-bold">Improvement Subjects</p>
                                    <Panel bordered>
                                        {profile.improvement_subjects.length === 0 ? 'No information provided' :
                                            <ol className="px-4 py-2" style={{ listStyleType: "number" }}>
                                                {profile.improvement_subjects.map(subject => {
                                                    return (
                                                        <li className="p-1" key={subject}>{subject}</li>
                                                    )
                                                })}
                                            </ol>
                                        }
                                    </Panel>
                                </Col>
                                <Col className="mt-3 md:mt-0" xs={24} md={8}>
                                    <p className="font-bold">Guidance Subjects</p>
                                    <Panel bordered>
                                        {profile.guidance_subjects?.length === 0 ? 'No information provided' :
                                            <ol className="px-4 py-2" style={{ listStyleType: "number" }}>
                                                {profile.guidance_subjects.map(subject => {
                                                    return (
                                                        <li className="p-1" key={subject}>{subject}</li>
                                                    )
                                                })}
                                            </ol>
                                        }
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