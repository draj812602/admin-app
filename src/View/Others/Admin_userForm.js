/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
import { useMutation } from '@apollo/react-hooks';

import Application from '../../Components/ApplicationForm';
import Back from '../../Components/GoBack';

import NavBar from '../../Components/AdminComponents/AdminNavbar';

import { useQuery } from '@apollo/react-hooks';
import { GETFORMDATABYID } from '../../Queries';
import { UPDATEFORMSTATUSADMIN } from '../../Mutations';
import { ToastContainer, toast } from 'react-toastify';

import RejectModal from '../../Modals/Rejectmanufacturer';
import Loaders from '../../Components/Loader/Loader';

function Admin_userForm(props) {
	let d = props.match.params.form_data;

	let c = d.split('-');
	let formId = parseInt(c[0]);
	let formStatus = c[1];
	let userId = parseInt(c[2]);

	const [selectedOption, setselectedOption] = useState('');
	const [showbtns, setshowbtns] = useState(true);
	const [showRejectModal, setshowRejectModal] = useState(false);

	const [updateAdminStatus, { loading: loadingStatus }] = useMutation(
		UPDATEFORMSTATUSADMIN,
		{
			update(proxy, result) {
				setshowbtns(false);
				setshowRejectModal(false);
			},
		}
	);

	const { loading, data } = useQuery(GETFORMDATABYID, {
		variables: { form_id: parseInt(formId) },
		fetchPolicy: 'network-only',
	});

	if (loading) {
		return <Loaders/>;
	
	}

	const BackTORUles = () => {
		props.history.goBack();
	};
	const processingModal = async (d) => {
		if (d === 'Approved') {
			try {
				updateAdminStatus({
					variables: {
						formId,
						userId,
						formStatus: 'Approved',
						rejectHeader: '',
						rejectReason: '',
					},
				});
				toast.success('Application approved');
				setTimeout(() => {
					window.location.href = '/admin_home';
				}, 3000);
			} catch (error) {
				//console.log(error);
			}
		}
		if (d === 'Rejected') {
		
			setshowbtns(false);
			setshowRejectModal(true);
		}
	};
	const cancel = () => {
		setshowbtns(true);
		setshowRejectModal(false);
	};
	const handleChange = (selectedOption) => {
		setselectedOption(selectedOption);
	};
	const RejectForm = async (e) => {
		let d = [];
		await selectedOption.map((li) => {
			d.push(li.value);
			// console.log(e);
		});
		
		try {
			updateAdminStatus({
				variables: {
					formId,
					userId,
					formStatus: 'Rejected',
					rejectHeader: d,
					rejectReason: e.rejectReason,
				},
			});
			toast.success('Application rejected');
			setTimeout(() => {
				window.location.href = '/admin_home';
			}, 3000);
			// window.location.href = '/admin_home';
		} catch (error) {
			//console.log(error);
		}
	};

	return (
		<div className="partners_application">
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnVisibilityChange
				draggable
				pauseOnHover
			/>
			<ToastContainer />
			<NavBar />
			<RejectModal
				showRejectModal={showRejectModal}
				cancel={cancel}
				RejectForm={RejectForm}
				handleChange={handleChange}
				selectedOption={selectedOption}
				loadingStatus={loadingStatus}
			/>
			<div className="formAdmin ">
				<div className="d-flex">
					<div className="">
						<Back Goback={BackTORUles} />

						<div className="fs-4 font-weight-bold">Verification form</div>
					</div>
					<div className="ml-auto mr-4 ">
						{(formStatus === 'In process' || formStatus === 'New request') &&
							showbtns === true && (
								<>
									<button
										className="btn btn-primary"
										disabled={loadingStatus}
										onClick={() => {
                                            processingModal('Approved')
                                            localStorage.setItem("activeTab", "Approved")    
                                        }}>
										Approved
										{loadingStatus && (
											<span className="spinner-border float-right"></span>
										)}
									</button>

									<button
										className="btn btn-secondary ml-2"
										onClick={() => {
                                            processingModal('Rejected')
                                            localStorage.setItem("activeTab", "Rejected")
                                        }}
										disabled={loadingStatus}>
										Reject
									</button>
								</>
							)}
					</div>
				</div>
				<Application data={data.getFormDataById} />
				<br></br>
			</div>
		</div>
	);
}

export default Admin_userForm;
