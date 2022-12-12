import React, { useContext } from 'react';
import LoginForm from './CommonLoginForm';
import { useMutation } from '@apollo/react-hooks';
import { ADMINLOGIN } from '../../Mutations/index';
import { AuthContext } from '../../Context/auth';
import logo from '../../Images/wiznet_logo.png';

function SignUpAdminComp() {
	const context = useContext(AuthContext);

	const [signIn, { loading }] = useMutation(ADMINLOGIN, {
		update(proxy, result) {
			let res = result.data.adminLogin;
			context.login(res);

			window.location.href = '/admin_home';
		},
	});
	const AdminSingnin = async (e) => {
		let { email, password } = e;
		try {
			await signIn({ variables: { email, password } });
		} catch (err) {
			//console.log(err);
		}

		//history.push('admin_home');
	};

	return (
		<div>
			<div className="">
			
				<div className="row pl-4 pr-5 pt-1 no-gutters">
					<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
					</div>
				</div>
			
			</div>
			<div className="containerLogin ">
				<div className="container">
				<div class="row justify-content-center align-items-center">
				<div>
						<div className="fs-5 text-white">
						<img src={logo} alt="Images" className="logo_login mr-1"/> partner’s administrationt
						</div>
						<div className="text-white fs-2 ml-1 ">Admin sign in</div>
					</div>
					</div>
				
				<div >
					
				</div>
				<LoginForm
					LoginPartnerFun={AdminSingnin}
					loading={loading}
					role="admin"
				/>
			</div>
			</div>
		</div>
	);
}

export default SignUpAdminComp;
