/** @format */

import React from 'react';
import classNames from 'classnames';
import { Container } from 'reactstrap';
import { Switch, Route } from 'react-router-dom';
import Home from '../../Views/Others/home';
import AddUser from '../../Views/Others/add-user';
import ActiveUSer from '../../Views/Others/active_users';
import Login from '../../Views/Auth/Login';
import DeviceMmanagment from '../../Views/Others/Device/Device_managment';
import UploadDevice from '../../Views/Others/Device/Upload';
import RegisterDevice from '../../Views/Others/Device/Register';
import ActivateDevice from '../../Views/Others/Device/Activate';

import Test from '../../Views/Others/test';
import { AuthRoute } from './authRoute';
import { LoginRoute } from './LoginRoute';

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
	<Container fluid className={classNames('')}>
		<Switch>
			<LoginRoute exact path="/" component={Login} />
			<AuthRoute path="/home" component={Home} />
			<AuthRoute exact path="/user" component={() => 'yee'} />
			<AuthRoute path="/user/add_user" component={AddUser} />
			<AuthRoute path="/user/active_users" component={ActiveUSer} />
			<AuthRoute exact path="/device_managment" component={DeviceMmanagment} />
			<AuthRoute path="/device_managment/upload" component={UploadDevice} />
			<AuthRoute path="/device_managment/register" component={RegisterDevice} />
			<AuthRoute path="/device_managment/activate" component={ActivateDevice} />

			<AuthRoute path="/groups" component={() => 'groups'} />
			<AuthRoute path="/Page-1" component={() => 'Pages-1'} />
			<AuthRoute path="/test" component={Test} />
			<AuthRoute
				exact
				path="/*"
				component={() => 'OOpss page22222222222222222222222 not found'}
			/>
		</Switch>
	</Container>
);

export default Content;
