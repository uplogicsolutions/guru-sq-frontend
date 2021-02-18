import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import { useForm } from 'react-hook-form';
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from "components/CustomButtons/Button.js";


//TODO Make our own styles
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import CardFooter from 'components/Card/CardFooter';
import Danger from 'components/Typography/Danger';


const useStyles = makeStyles(styles);

const LoginPage = (props) => {
    const classes = useStyles();
		const { register, handleSubmit, errors } = useForm();
    
		const onSubmit = (data) => {
			console.log(data)
		}

    return(
        <div className={classes.container}>
					<GridContainer justify="center">
							<GridItem xs={12} sm={12} md={4}>
									<Card>
										<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
											<CardHeader color="primary" className={classes.cardHeader}>
													<strong><h4>Login</h4></strong>
											</CardHeader>
											<CardBody>
													<CustomInput
															labelText="Username"
															id="username"
															formControlProps={{
																	fullWidth: true
															}}
															error={errors.username ? true : false}
															inputRef={register({
																required: true
															})}
															name={"username"}
															inputProps={{
																	type: "text",
																	endAdornment: (
																	<InputAdornment position="end">
																			<People className={classes.inputIconsColor} />
																	</InputAdornment>
																	),
																	
															}}
													/>
													{errors.username && <Danger>This field is required</Danger>}
													<CustomInput
															labelText="Password"
															id="pass"
															formControlProps={{
																	fullWidth: true
															}}
															error={false}
															name={"password"}
															inputRef={register({ 
																required: true 
															})}
															inputProps={{
																	type: "password",
																	endAdornment: (
																	<InputAdornment position="end">
																			<Icon className={classes.inputIconsColor}>
																			lock_outline
																			</Icon>
																	</InputAdornment>
																	),
																	autoComplete: "off"
															}}
													/>
													{errors.password?.type === "required" && <Danger>This field is required</Danger>}
											</CardBody>
											<CardFooter className={classes.cardFooter}>
												<Button type={"submit"} color="primary" size="lg">
													Get started
												</Button>
										</CardFooter>
										</form>
									</Card>
							</GridItem>
					</GridContainer>            
        </div>
    )
}

export default LoginPage;