import React from 'react';
import '../../Styles/MenuLayout.css';

function adminSidebar({ data, SideBarClickFun, status }) {
	return (
		<div>
			<div className="sidenav box_style box_shadow">
				<br></br>
				<br></br>

				<div
					className={
						status === 'Reminders'
							? 'd-flex mt-3 ml-3 mr-3 px-3 py-2 sidebarMenuContainer rounded'
							: 'd-flex mt-3 ml-3 mr-3 px-3 py-2 rounded sidebarHover'
					}
					onClick={() => SideBarClickFun('Reminders', data.reminders)}>
					<i className="ri-notification-line ri-lgicon iconBg_reminder"></i>
					<div className="ml-4">
						<div className="fs-5">Reminder</div>
						<div className="fs-4 font-weight-bold">{data.reminders}</div>
					</div>
					<i className="ri-arrow-right-s-line ri-lg ml-auto openIcon mr-4"></i>
				</div>
				<div className="fs-4 m-4 text-primary font-weight-bolder">
					Statistics
				</div>
				<div
					className={
						status === 'All'
							? 'd-flex mt-3 ml-3 mr-3 px-3 py-2 sidebarMenuContainer rounded'
							: 'd-flex mt-3 ml-3 mr-3 px-3 py-2 rounded sidebarHover'
					}
					onClick={() => SideBarClickFun('All', data.all)}>
					<i className="ri-stack-line ri-lgicon iconBg_all"></i>
					<div className="ml-4">
						<div className="fs-5">All</div>
						<div className="fs-4 font-weight-bold">{data.all}</div>
					</div>
					<i className="ri-arrow-right-s-line ri-lg ml-auto openIcon mr-4"></i>
				</div>
				<div
					className={
						status === 'New requests'
							? 'd-flex mt-3 ml-3 mr-3 px-3 py-2 sidebarMenuContainer rounded'
							: 'd-flex mt-3 ml-3 mr-3 px-3 py-2 rounded sidebarHover'
					}
					onClick={() => SideBarClickFun('New requests', data.newRequests)}>
					<i className="ri-file-text-line ri-lgicon iconBg_newReq"></i>
					<div className="ml-4">
						<div className="fs-5">New requests</div>
						<div className="fs-4 font-weight-bold">{data.newRequests}</div>
					</div>
					<i className="ri-arrow-right-s-line ri-lg ml-auto openIcon mr-4"></i>
				</div>
				<div
					className={
						status === 'In process'
							? 'd-flex mt-3 ml-3 mr-3 px-3 py-2 sidebarMenuContainer rounded'
							: 'd-flex mt-3 ml-3 mr-3 px-3 py-2 rounded sidebarHover'
					}
					onClick={() => SideBarClickFun('In process', data.inProcess)}>
					<i className="ri-timer-2-line ri-lgicon iconBg_inprocess"></i>
					<div className="ml-4">
						<div className="fs-5">In process</div>
						<div className="fs-4 font-weight-bold">{data.inProcess}</div>
					</div>
					<i className="ri-arrow-right-s-line ri-lg ml-auto openIcon mr-4"></i>
				</div>
				<div
					className={
						status === 'Approved'
							? 'd-flex mt-3 ml-3 mr-3 px-3 py-2 sidebarMenuContainer rounded'
							: 'd-flex mt-3 ml-3 mr-3 px-3 py-2 rounded sidebarHover'
					}
					onClick={() => SideBarClickFun('Approved', data.approved)}>
					<i className="ri-check-line ri-lgicon iconBg_approved"></i>
					<div className="ml-4">
						<div className="fs-5">Approved</div>
						<div className="fs-4 font-weight-bold">{data.approved}</div>
					</div>
					<i className="ri-arrow-right-s-line ri-lg ml-auto openIcon mr-4"></i>
				</div>
				<div
					className={
						status === 'Rejected'
							? 'd-flex mt-3 ml-3 mr-3 px-3 py-2 sidebarMenuContainer rounded'
							: 'd-flex mt-3 ml-3 mr-3 px-3 py-2 rounded sidebarHover'
					}
					onClick={() => SideBarClickFun('Rejected', data.rejected)}>
					<i className="ri-close-line ri-lgicon iconBg_rejected"></i>
					<div className="ml-4">
						<div className="fs-5">Rejected</div>
						<div className="fs-4 font-weight-bold">{data.rejected}</div>
					</div>
					<i className="ri-arrow-right-s-line ri-lg ml-auto openIcon mr-4"></i>
				</div>
			</div>
		</div>
	);
}

export default adminSidebar;
