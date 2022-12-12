/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import logo from '../../Images/wiznet_logo.png';

function CommonLoginForm(props) {
	const history = useHistory();
	const { register, handleSubmit, errors } = useForm();
	const partnerforgotpassword = () => {
		history.push('reset-password');
	};

	return (
		<div>
			<form onSubmit={handleSubmit(props.LoginPartnerFun)}>
				<div class="row justify-content-center align-items-center ">
					<div class="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
						<div className="form-group mt-3">
							<label className="label text-white" htmlFor="email">
								Email ID
							</label>
							<input
								type="text"
								name="email"
								id="email"
								className={
									errors.email
										? 'bg-white form-control error_input'
										: 'bg-white form-control'
								}
								placeholder="Email ID"
								ref={register({
									required: 'Email ID is required',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Invalid email address',
									},
								})}
							/>
							{errors.email && (
								<div>
									<span className="text-error">{errors.email.message}</span>
								</div>
							)}
						</div>
						<div className=" mt-3">
							<label className="label text-white" htmlFor="password">
								Password
							</label>
							<input
								type="password"
								name="password"
								id="password"
								className={
									errors.password
										? 'bg-white form-control error_input'
										: 'bg-white form-control'
								}
								placeholder="Password"
								ref={register({
									required: 'Passord is required',
								})}
							/>
							{errors.password && (
								<div>
									<span className="text-error">{errors.password.message}</span>
								</div>
							)}
						</div>
						<div className="mt-2">
							{props.role !== undefined && (
								<a className="fs-5 text-white" onClick={partnerforgotpassword}>
									Forgot password
								</a>
							)}
						</div>
						<div className="form-group">
							<button
								className="btn btn-auth btn-block loginbtn"
								disabled={props.loading}>
								{props.loading ? (
									<span className="spinner-border"></span>
								) : (
									'Login'
								)}
							</button>
						</div>
						<div class="row justify-content-center align-items-center ">
							<img src={logo} alt="Images" className="logo_footer" />
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default CommonLoginForm;
