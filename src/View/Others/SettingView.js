import React from 'react';
import AdminNavbar from '../../Components/AdminComponents/AdminNavbar';
import ChangePass from '../../Components/Settings/ChangePassword';
import Back from '../../Components/GoBack';
import { useMutation } from '@apollo/react-hooks';
import { CHANGEPASSWORD } from '../../Mutations';
import { toast } from 'react-toastify';

function SettingView(props) {
	const [ChangePassMutation, { loading }] = useMutation(CHANGEPASSWORD, {
		update(proxy, result) {},
	});
	const BackTORUles = () => {
		props.history.goBack();
	};

	const ChangePassFun = async (e) => {
		let { currentPass, password, confirmPass } = e;
		try {
			await ChangePassMutation({
				variables: { currentPass, password, confirmPass },
			});
			toast.success('Password changed');

			window.location.href = '/admin_home';
		} catch (error) {
			//console.log(error);
		}
	};

	return (
		<div>
			<AdminNavbar />
			<div className="row mt-5 no-gutters px-4">
				<div className="form-group col-12 col-sm-12 col-md-8 col-lg-6 col-xl-4 offset-md-2 offset-lg-3 offset-xl-4">
					<div className="setting_container_changepass">
						<Back Goback={BackTORUles} />
						<div className="fs-4 font-weight-bold">Settings</div>
						<div className="fs-4 text-primary mt-2 mb-3">Change password</div>
					</div>
					<ChangePass ChangePassFun={ChangePassFun} loading={loading} />
				</div>
			</div>
		</div>
	);
}

export default SettingView;
