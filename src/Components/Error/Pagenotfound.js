/** @format */

import React from 'react';
import img_not_found from '../../Images/notfound.png';

import '../../Styles/Error.css';

function Pagenotfound(props) {
	const goBack = () => {
		props.history.goBack();
	};
	return (
		<div align="center" className="error_container">
			<button className="btn btn-secondary w-25" onClick={goBack}>
				Go back
			</button>
			<div className="woops">Whoops!</div>
			<div className="error_content">PAGE NOT FOUND</div>
			<img
				src={img_not_found}
				alt="Page not found"
				className="notFoundImg"></img>
		</div>
	);
}

export default Pagenotfound;
