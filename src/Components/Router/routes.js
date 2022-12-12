/** @format */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUpAdmin from '../../View/Authentication.js/SignUpAdmin';
import welcomeAdmin from '../../View/Others/Adminhome';
import UserForm from '../../View/Others/Admin_userForm';
import Settings from '../../View/Others/SettingView';

import NotFound from '../../Components/Error/Pagenotfound';

import ForgotPassworduser from '../../View/Authentication.js/ForgotPassword';
import ResetPassword from '../../View/Authentication.js/ResetPassword';
import Linkexpiredview from '../../View/Authentication.js/Linkexpiredpage';
import EmailVarification from '../../View/Authentication.js/EmailVarificationPage';

import { AuthRoute } from './authRoute';
import { LoginRoute } from './LoginRoute';

function Rout(props) {
	return (
		<div>
			<div>
				<Switch>
					<LoginRoute exact path="/" component={SignUpAdmin} guest />
					<LoginRoute
						exact
						path="/reset-password"
						component={ForgotPassworduser}
					/>
					<LoginRoute
						path="/email_varification"
						component={EmailVarification}
					/>
					<LoginRoute
						path="/reset-password/:token_id"
						component={ResetPassword}
					/>
					<LoginRoute path="/link_expired" component={Linkexpiredview} />
					<AuthRoute exact path="/admin_home" component={welcomeAdmin} admin />
					<AuthRoute path="/admin_home/:form_data" component={UserForm} admin />
					<AuthRoute path="/Settings" component={Settings} admin />
					<Route path="/*" component={NotFound} />
				</Switch>
			</div>
		</div>
	);
}

export default Rout;
