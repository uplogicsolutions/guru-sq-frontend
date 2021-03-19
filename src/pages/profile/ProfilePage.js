import BasePage from 'pages/base/BasePage';
import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import {
	Col,
	Grid,
	Row,
	Sidenav,
	Nav,
	Icon,
	Panel,
	Avatar,
	FlexboxGrid,
	Form,
	InputPicker,
	Button,
	Input,
	Alert,
	InputNumber,
	PanelGroup,
	TagPicker,
	Checkbox
} from 'rsuite';
import { useForm, Controller } from "react-hook-form";
import Danger from 'components/alerts/Danger';
import { useDispatch, useSelector } from 'react-redux'
import { getOptions } from 'api/options'
import { parseArrayOfObject } from 'utils/parse';
import { resetRegisterStates, registerSuccess, registerFailure, registerPending } from 'pages/register/store/registerSlice'


const ProfilePage = props => {

	const [showBasicProfileModal, setShowBasicProfileModal] = useState(false)
	const handleClose = () => setShowBasicProfileModal(false);
	const { control, errors, register, handleSubmit, trigger } = useForm();
	const [isWorking, setIsWorking] = useState(false)

	const [subjectsData, setSubjectsData] = useState([])
	const [formOfContractsData, setFormOfContractsData] = useState([])
	const [employerTypesData, setEmployerTypesData] = useState([])
	const [ageGroupsData, setAgeGroupsData] = useState([])

	const [coreSubjects, setCoreSubjects] = useState([])
	const [supplementarySubjects, setSupplementarySubjects] = useState([])
	const [ageGroups, setAgeGroups] = useState([])
	// const [jobs, setJobs] = useState([])

	const dispatch = useDispatch()
	const { loading, redirect, redirectUrl, error } = useSelector(state => state.register)

	const parseOption = [{ oldKey: 'option_id', newKey: 'value' }, { oldKey: 'label', newKey: 'label' }]
	const parseSubject = [{ oldKey: 'subject_id', newKey: 'value' }, { oldKey: 'subject_name', newKey: 'label' }]

	const loadOptions = async () => {
		let subjectData = await getOptions('subjects')
		setSubjectsData(parseArrayOfObject(parseSubject, subjectData.data.data))
		let formData = await getOptions('formOfContracts')
		setFormOfContractsData(parseArrayOfObject(parseOption, formData.data.data))
		let ageDataResponse = await getOptions('studentAgeGroups')
		let ageData = []
		ageDataResponse.data.data.map((value) => {
			ageData.push({
				label: `${value.start_age} - ${value.end_age}`,
				value: value.group_id
			})
		})
		setAgeGroupsData(ageData)
		let employerDataResponse = await getOptions('employerTypes')
		let employerData = []
		employerDataResponse.data.data.map((value) => {
			employerData.push({
				label: value,
				value: value
			})
		})
		setEmployerTypesData(employerData)
	}

	useEffect(() => {
		dispatch(resetRegisterStates())
		loadOptions()
	}, [])

	// console.log(subjectsData)
	const jobs = [
		{
			job_id: 1,
			job_title: 'Job1',
			employer_type: 'School',
			start_year: 2014,
			end_year: 2018,
			form_of_contract: 1,
			description: 'Test',
			age_group: '0',
			core_subjects: [1, 2]
		},
		{
			job_id: 2,
			job_title: 'Job2',
			employer_type: 'School',
			start_year: 2016,
			end_year: 2018,
			form_of_contract: 1,
			description: 'Test',
			age_group: '0',
			core_subjects: [1, 2]
		}
	]

	const handleJobSubmit = data => {
		console.log("Heelo")
		console.log(data)
	}


	return (
		<BasePage>
			<Row className="m-0">
				<Col xsHidden md={6}>

				</Col>
				<Col xs={24} md={18}>
					<Row>
						<Col>
						
							<Panel className="custom-card" bordered>

								{jobs &&
									<div>
										<h4>Your Jobs</h4>

										{/* <PanelGroup style={{ marginTop: 10 }} accordion bordered>
													{jobs && jobs.map((job, index) => {
														return (
															<Form onSubmit={handleSubmit((data) => console.log(data))}>
																<input name="job_id" ref={register} type="hidden" value={job.job_id} />
																<Panel key={index} header={job.job_title}>
																	<Row style={{ marginTop: 15 }} className="show-grid">
																		<Col xs={24} md={24}>
																			<Controller
																				name="job_title"
																				control={control}
																				defaultValue={job.job_title}
																				rules={{
																					required: true
																				}}
																				render={({ onChange, value }) =>
																					<Input
																						onChange={(text, e) => onChange(e)}
																						value={value}
																						placeholder="Job Title" />
																				}
																			/>
																			{errors.job_title?.type === 'required' && <Danger>* Required</Danger>}

																		</Col>
																	</Row >
																	<Row style={{ marginTop: 15 }}>
																		<Col xs={24} sm={24} md={24}>
																			<Controller
																				name="employer_type"
																				control={control}
																				defaultValue={job.employer_type}
																				rules={{ required: true }}
																				options={employerTypesData}
																				as={<InputPicker
																					name="employer_type"
																					block
																					value={`${job.employer_type}`}
																					placeholder="Employer Type"
																					data={employerTypesData} />
																				}
																			/>
																			{errors.employer_type?.type === 'required' && <Danger>* Required</Danger>}

																		</Col>
																	</Row>
																	<Row style={{ marginTop: 15 }} className="">
																		<Col xs={24} md={24}>
																			<Controller
																				name="employer_name"
																				control={control}
																				defaultValue=""
																				rules={{ required: true }}
																				render={({ onChange, value }) =>
																					<Input
																						name="employer_name"
																						onChange={(text, e) => onChange(e)}
																						value={value}
																						placeholder="Employer Name" />
																				}
																			/>
																			{errors.employer_name?.type === 'required' && <Danger>* Required</Danger>}

																		</Col>
																	</Row>
																	<Row style={{ marginTop: 15 }} className="show-grid">
																		<Col xs={24} md={12}>
																			<Controller
																				name="start_year"
																				control={control}
																				defaultValue={`${job.start_year}`}
																				rules={{
																					required: true
																				}}
																				render={({ onChange, value }) =>
																					<InputNumber
																						name="start_year"
																						value={value}
																						onChange={(text, e) => onChange(e)}
																						placeholder="Start Year" />
																				}
																			/>
																			{errors.start_year?.type === 'required' && <Danger>* Required</Danger>}

																		</Col>
																		<Col xs={24} md={12}>
																			<Controller
																				name="end_year"
																				control={control}
																				defaultValue={`${job.end_year}`}
																				rules={{
																					required: !isWorking
																				}}
																				render={({ onChange, value }) =>
																					<InputNumber
																						disabled={isWorking ? true : false}
																						name="end_year"
																						value={value}
																						onChange={(text, e) => onChange(e)}
																						placeholder="End Year" />
																				}
																			/>
																			{errors.end_year?.type === 'required' && <Danger>* Required</Danger>}

																		</Col>
																	</Row>
																	<Row>
																		<Col xs={24}>
																			<Checkbox onChange={(val, checked) => { setIsWorking(checked); trigger('end_year'); }}> Currently working here ?</Checkbox>
																		</Col>
																	</Row>
																	<Row style={{ marginTop: 15 }} className="show-grid">
																		<Col xs={24} sm={24} md={24}>
																			<Controller
																				name="form_of_contract"
																				control={control}
																				defaultValue={job.form_of_contract}
																				rules={{ required: true }}
																				options={formOfContractsData}
																				as={<InputPicker
																					name="form_of_contract"
																					block
																					value={`${job.form_of_contract}`}
																					placeholder="Form of Contract"
																					data={formOfContractsData} />
																				}
																			/>
																			{errors.form_of_contract?.type === 'required' && <Danger>* Required</Danger>}
																		</Col>
																	</Row>
																	<Row style={{ marginTop: 15 }} className="">
																		<Col xs={24} md={24}>
																			<Controller
																				name="description"
																				control={control}
																				defaultValue=""
																				rules={{
																					required: true
																				}}
																				render={({ onChange, value }) =>
																					<Input
																						onChange={(text, e) => onChange(e)}
																						value={value}
																						placeholder="Description (Optional)" />
																				}
																			/>
																		</Col>
																	</Row>
																	<Row style={{ marginTop: 15 }}>
																		<Col xs={24} sm={24} md={24}>
																			<Controller
																				name="age_group"
																				control={control}
																				defaultValue={ageGroups}
																				rules={{ required: true }}
																				options={ageGroupsData}
																				as={<TagPicker
																					name="age_group"
																					block
																					placeholder="Age group of students"
																					data={ageGroupsData} />
																				}
																			/>
																			{errors.age_group?.type === 'required' && <Danger>* Required</Danger>}
																		</Col>
																	</Row>
																	<Row style={{ marginTop: 15 }}>
																		<Col xs={24} sm={24} md={24}>
																			<Controller
																				name="core_subjects"
																				control={control}
																				rules={{ required: true }}
																				defaultValue={job.core_subjects}
																				options={subjectsData}
																				as={
																					<TagPicker
																						name="core_subjects"
																						block
																						value={job.core_subjects}
																						placeholder="Core Subject"
																						data={subjectsData} />
																				}
																			/>
																			{errors.core_subjects?.type === 'required' && <Danger>* Required</Danger>}
																		</Col>
																	</Row>
																	<Row style={{ marginTop: 15 }}>
																		<Col xs={24} sm={24} md={24}>
																			<Controller
																				name="supplementary_subjects"
																				control={control}
																				defaultValue={supplementarySubjects}
																				options={subjectsData}
																				as={
																					<TagPicker
																						name="supplementary_subjects"
																						block
																						placeholder="Supplementary Subject"
																						data={subjectsData}
																					/>
																				}
																			/>
																		</Col>
																	</Row>
																	<Row style={{ marginTop: 15 }} className="show-grid">

																		<Col xs={24} sm={24} md={6}>
																			<Button block type="submit" appearance="primary"> Save </Button>
																		</Col>
																	</Row>
																</Panel>
															</Form>

														)
													})}
												</PanelGroup> */}
										{/* <Row>
													<Col xs={24} md={12}>
														<Button onClick={() => { }} block style={{ marginTop: 10 }}> Add More</Button>

													</Col>
													<Col xs={24} md={12}>
														<button type='submit' onClick={() => handleSubmit(handleJobSubmit)} style={{ marginTop: 10 }} > Save </button>

													</Col>
												</Row> */}
									</div>

								}
							</Panel>
						</Col>
					</Row>
				</Col>
			</Row>

		</BasePage >
	)

}

export default ProfilePage;