import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { useHistory } from 'react-router-dom';

function ChangePassword({ ChangePassFun, loading }) {
	let history = useHistory();
	const { register, handleSubmit, errors, watch } = useForm();
	const password = useRef({});
	password.current = watch('password', '');
	const Cancel = () => {
		history.goBack();
	};

	return (
		<div>
			<form onSubmit={handleSubmit(ChangePassFun)}>
				<div className="row login-card box_style">
					<div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
						<label className="label" htmlFor="currentPass">
							Current password
						</label>
						<input
							type="password"
							name="currentPass"
							id="currentPass"
							className={
								errors.currentPass
									? 'form-control error_input'
									: 'form-control'
							}
							placeholder="Current password"
							ref={register({
								required: 'Current password is required',
							})}
						/>

						{errors.currentPass && (
							<div>
								<span className="text-error">
									{errors.currentPass.message}
								</span>
							</div>
						)}
					</div>

					<div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
						<label className="label" htmlFor="password">
							New password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							className={
								errors.password
									? 'form-control error_input'
									: 'form-control'
							}
							placeholder="New password"
							ref={register({
								required: 'New password is required',
							})}
						/>

						{errors.password && (
							<div>
								<span className="text-error">{errors.password.message}</span>
							</div>
						)}
					</div>
					<div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
						<label className="label" htmlFor="confirmPass">
							Confirm new password
						</label>
						<input
							type="password"
							name="confirmPass"
							id="confirmPass"
							className={
								errors.confirmPass
									? 'form-control error_input'
									: 'form-control'
							}
							placeholder="Confirm new password"
							ref={register({
								validate: (value) =>
									value === password.current || 'The passwords do not match',
							})}
						/>

						{errors.confirmPass && (
							<div>
								<span className="text-error">
									{errors.confirmPass.message}
								</span>
							</div>
						)}
					</div>
					<div className="d-flex ml-auto mr-3 mt-3">
						<button
							className="btn btn-secondary mr-2"
							type="button"
							onClick={Cancel}>
							Cancel
						</button>
						{loading ? (
							<span className="spinner-border float-right mt-1"></span>
						) : (
							<button className="btn btn-primary  ">Save</button>
						)}
					</div>
				</div>
			</form>
		</div>
	);
}

export default ChangePassword;
