import React from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import styles from '../Styles/Styles';

function Rejectmanufacturer({
	showRejectModal,
	cancel,
	RejectForm,
	selectedOption,
	handleChange,
	loadingStatus,
}) {
	const { register, errors, handleSubmit } = useForm();

	let options = [
		{ value: 'Basic information', label: 'Basic information' },
		{ value: 'Registered address', label: 'Registered address' },
		{ value: 'Present address', label: 'Present address' },
		{ value: 'Contact details', label: 'Contact details' },
	];

	return (
		<div>
			<Modal
				show={showRejectModal}
				dialogClassName="device_modal_class"
				onHide={cancel}
				backdrop="static"
				keyboard={true}>
				<form onSubmit={handleSubmit(RejectForm)}>
					<div className="">
						<div className="d-flex">
							<div className="modal_header mb-2">Reject manufacturer</div>
							<i
								className="ri-close-line ri-lg fs-6 ml-auto closeModal"
								onClick={cancel}></i>
						</div>
						<div>
							<div className="label mb-2">Reason</div>
							<Select
								isMulti
								value={selectedOption}
								onChange={handleChange}
								options={options}
								styles={styles}
							/>
						</div>
						<div className="label mb-2 mt-3">Description</div>
						<textarea
							name="rejectReason"
							className={
								errors.rejectReason
									? 'form-control error_input'
									: 'form-control'
							}
							placeholder="Please mention the reason for rejecting the manufacturer."
							ref={register({
								required: 'Reason is required',
							})}
						/>
						{errors.rejectReason && (
							<div>
								<span className="text-error">
									{errors.rejectReason.message}
								</span>
							</div>
						)}
						<div className="d-flex mt-4">
							<div className="ml-auto">
								<button
									className="btn btn-secondary mr-2"
									onClick={cancel}
									type="button"
									disabled={loadingStatus}>
									Cancel
								</button>
								<button className="btn btn-danger" disabled={loadingStatus}>
									Reject
									{loadingStatus && (
										<span className="spinner-border float-right"></span>
									)}
								</button>
							</div>
						</div>
					</div>
				</form>
			</Modal>
		</div>
	);
}

export default Rejectmanufacturer;
