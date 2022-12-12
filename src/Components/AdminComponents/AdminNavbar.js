import React, { useContext } from 'react';
import logo from '../../Images/logoTransparent.png';
import { AuthContext } from '../../Context/auth';

import { useHistory } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

function AdminNavbar() {
	const { logout } = useContext(AuthContext);
	const history = useHistory();
	const Settings = () => {
		history.push('/settings');
	};
	const adminhome = () => {
		history.push('/admin_home');
	};

	return (
		<div>
			<Navbar
				collapseOnSelect
				expand="lg"
				className=" fixed-top bg-dark-color py-4">
				<img
					src={logo}
					alt="Wiznet_image"
					className="logo_auth_page ml-2"
					onClick={adminhome}
				/>
				<div className="d-flex ml-auto">
					<div className="fs-5 pr-4 on-hover text-white" onClick={Settings}>
						Setting
					</div>
					<div className="fs-5 pr-4 on-hover text-white" onClick={logout}>
						Logout
					</div>
				</div>
			</Navbar>
			<br></br>
			<br></br>
		</div>
	);
}

export default AdminNavbar;
