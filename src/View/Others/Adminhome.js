import React, { useEffect, useState, useContext } from 'react';
import '../../Styles/adminstyles.css';
import AdminSidebar from '../../Components/AdminComponents/adminSidebar';
import TableComp from '../../Components/AdminComponents/table';
import NavBar from '../../Components/AdminComponents/AdminNavbar';

import Loader from 'react-loader-spinner';
import Loaders from '../../Components/Loader/Loader';

import { useQuery, useLazyQuery, useSubscription } from '@apollo/react-hooks';
import { ADMINSIDEBARDATA, TABLEDATA } from '../../Queries';
import {
	REMINDERSUBSCRIPTION,
	SUBMITEDSUBSCRIPTION,
} from '../../Subscriptions';

import { AuthContext } from '../../Context/auth';

function Adminhome({ history }) {
	const { user } = useContext(AuthContext);

	const [active, setactive] = useState(localStorage.getItem('activeTab') || 'New requests');
	const [remidereDatastate, setremidereDatastate] = useState(null);
	const [formSubmitData, setformSubmitData] = useState(null);
	const {
		loading: loadingSidebar,
		data: dataSidebar,
	} = useQuery(ADMINSIDEBARDATA, { fetchPolicy: 'network-only' });
	const [
		getTableData,
		{ loading: loadingTable, data: dataTable },
	] = useLazyQuery(TABLEDATA, {
		fetchPolicy: 'network-only',
	});
	const { data: dataReminder, error: errorReminder } = useSubscription(
		REMINDERSUBSCRIPTION
	);
	const { data: dataSubmitForm, error: errorSubmitForm } = useSubscription(
		SUBMITEDSUBSCRIPTION
	);

	useEffect(() => {
		getTableData({ variables: { statistic: localStorage.getItem("activeTab") || 'New requests' } });
	}, []);

	useEffect(() => {
		if (dataReminder) {
			setremidereDatastate(dataReminder);
		}
	}, [dataReminder]);
	useEffect(() => {
		if (dataSubmitForm) {
			setformSubmitData(dataSubmitForm);
		}
	}, [dataSubmitForm]);

	if (loadingSidebar) {
		return <Loaders />;
	}

	const SideBarClickFun = async (e, d) => {
		setactive(e);
        localStorage.setItem("activeTab", e);
		// console.log(d);
		// if (d !== 0) {
		try {
			await getTableData({ variables: { statistic: e } });
		} catch (error) {
			//console.log(error);
		}
		//}
	};

	if (remidereDatastate !== null) {
		if (user.admin_country === remidereDatastate.getReminderStatus.country) {
			window.location.reload();
		}
	}
	if (formSubmitData !== null) {
		if (
			user.admin_country === formSubmitData.getFormStatusBoolValue.form_country
		) {
			window.location.reload();
		}
	}

	return (
		<div>
			<NavBar />
			<AdminSidebar
				data={dataSidebar?.getStatisticCounts}
				SideBarClickFun={SideBarClickFun}
				status={active}
			/>

			<div class="main">
				<div className="fs-4 textVerification font-weight-bolder text-primary">
					{active === 'All' ? 'Verification applications' : active}
				</div>
				{loadingTable ? (
					<Loaders />
				) : dataTable?.getListOfFormsSpecificStatus.listOfForms.length > 0 ? (
					<TableComp
                        columnData={dataTable.getListOfFormsSpecificStatus.columnData}
						tableData={dataTable.getListOfFormsSpecificStatus.listOfForms}
					/>
				) : (
					<div className="row no-gutters">
						<div className="alert alert-primary fs-6 px-2 col-11 col-sm-11 col-md-11 col-lg-10 col-xl-7">
							Currently there is no application.
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Adminhome;
