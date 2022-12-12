/** @format */

import gql from 'graphql-tag';



export const ADMINLOGIN = gql`
	mutation adminLogin($email: String!, $password: String!) {
		adminLogin(email: $email, password: $password) {
			id
			email
			role
			current_status
			admin_country
			token
		}
	}
`;

export const CHANGEPASSWORD = gql`
	mutation resetAdminPassword(
		$currentPass: String!
		$password: String!
		$confirmPass: String!
	) {
		resetAdminPassword(
			currentPass: $currentPass
			password: $password
			confirmPass: $confirmPass
		)
	}
`;

export const UPDATEFORMSTATUSADMIN = gql`
	mutation updateFormStatus(
		$formId: ID!
		$userId: ID!
		$formStatus: String!
		$rejectHeader: [String]!
		$rejectReason: String!
	) {
		updateFormStatus(
			formId: $formId
			userId: $userId
			formStatus: $formStatus
			rejectHeader: $rejectHeader
			rejectReason: $rejectReason
		)
	}
`;

export const FORMSUBMIT = gql`
	mutation submitRequestForm($formdata: Formdata) {
		submitRequestForm(formdata: $formdata)
	}
`;

export const REMINDERMUTATION = gql`
	mutation update_reminder($form_status: String!, $form_id: Int) {
		update_reminder(form_status: $form_status, form_id: $form_id) {
			reminder_status
			form_status
			country
		}
	}
`;

export const FORGOTPASSWORDLINK = gql`
	mutation getForgetPasswordLink($email: String!) {
		getForgetPasswordLink(email: $email)
	}
`;

export const UPDATEPASSWORD = gql`
	mutation updatePassword(
		$token: String!
		$password: String!
		$confirm_password: String!
	) {
		updatePassword(
			token: $token
			password: $password
			confirm_password: $confirm_password
		)
	}
`;
