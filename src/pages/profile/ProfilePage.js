import BasePage from 'pages/base/BasePage';
import React, { useState } from 'react';
import {
	Col,
	Grid,
	Row,
	Panel,
} from 'rsuite';
import PersonalDetails from './PersonalDetails';
import SchoolDetails from './SchoolDetails';
import SubjectDetails from './SubjectDetails';
import { FaEdit } from 'react-icons/fa';

const ProfilePage = () => {
	const [editPersonalDetails, setEditPersonalDetails] = useState(false);
	const [editSubjects, setEditSubjects] = useState(false);
	const [editSchoolDetails, setEditSchoolDetails] = useState(false);

	return (
		<BasePage>
			<Grid fluid>
				<Row className="m-3 md:m-0">
					<Col xsHidden md={5}>
						<Panel className="mt-5 fixed w-1/5" bordered>
							<p><b>My Profile</b></p>
							<a className="block my-2" href="#section-1">Personal Details</a>
							<a className="block my-2" href="#section-2">School Details</a>
							<a className="block my-2" href="#section-3">Subject Details</a>
						</Panel>
					</Col>
					<Col xs={24} md={19}>
						<Row className="m-0">
							<Col>
								<div id="section-1">
									<Panel className="custom-card mt-5" bordered>
										<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
											<h4>Personal Details</h4>
											{
												!editPersonalDetails &&
												<FaEdit
													onClick={() => setEditPersonalDetails(true)}
													style={{ cursor: 'pointer' }}
												/>
											}
										</div>
										<PersonalDetails edit={editPersonalDetails} setEdit={setEditPersonalDetails} />
									</Panel>
								</div>
								<div id="section-2">
									<Panel className="custom-card mt-5" bordered>
										<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
											<h4>School Details</h4>
											{
												!editSchoolDetails &&
												<FaEdit
													onClick={() => setEditSchoolDetails(true)}
													style={{ cursor: 'pointer' }}
												/>
											}
										</div>
										<SchoolDetails edit={editSchoolDetails} setEdit={setEditSchoolDetails} />
									</Panel>
								</div>
								<div id="section-3">
									<Panel className="custom-card mt-5" bordered>
										<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
											<h4>Subjects Details</h4>
											{!editSubjects &&
												<FaEdit
													onClick={() => setEditSubjects(true)}
													style={{ cursor: 'pointer' }}
												/>
											}
										</div>
										<SubjectDetails edit={editSubjects} setEdit={setEditSubjects} />
									</Panel>
								</div>
							</Col>
						</Row>
					</Col>
				</Row >
			</Grid >
		</BasePage >
	)
}

export default ProfilePage;