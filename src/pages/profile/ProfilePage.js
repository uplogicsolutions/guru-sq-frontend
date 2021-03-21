import BasePage from 'pages/base/BasePage';
import React, { useState, useEffect } from 'react';
import {
	Col,
	Grid,
	Row,
	Panel,
} from 'rsuite';
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { getOptions } from 'api/options'
import { parseArrayOfObject } from 'utils/parse';
import { resetRegisterStates, registerSuccess, registerFailure, registerPending } from 'pages/register/store/registerSlice'
import EditPersonalDetails from './EditPersonalDetialsModal';
import EditJobDetails from './EditJobDetails';
import EditSchoolTeacher from './EditSchoolDetails';
import EditSubjectDetails from './EditSubjectDetails';


const ProfilePage = props => {

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
										<h4>Personal Details</h4>
										<EditPersonalDetails />
									</Panel>
								</div>
								<div id="section-2">
									<Panel className="custom-card mt-5" bordered>
										<h4>School Details</h4>
										<EditSchoolTeacher />
									</Panel>
								</div>
								<div id="section-3">
									<Panel className="custom-card mt-5" bordered>
										<h4>Subjects Details</h4>
										<EditSubjectDetails />
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