import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { UPDATEFORMSTATUSADMIN } from '../../Mutations';

function Table({ loading, columnData, tableData }) {
    console.log(columnData, "-----------", tableData )
	let rowData = {};
	const history = useHistory();
	const [updateAdminStatus] = useMutation(UPDATEFORMSTATUSADMIN, {
		// this will chnage to inprocess aswell as go to that route
		update(proxy, result) {
			//let res = result.data.updateFormStatus;
			console.log(rowData);
			history.push(
				`/admin_home/${rowData.form_id}-${rowData.application_status}-${rowData.user_id}`
			);
		},
	});
	const legalNamefunc = (cell, row, rowIndex, formatExtraData) => {
		return (
			// eslint-disable-next-line jsx-a11y/anchor-is-valid
			<div className="partners_name" onClick={() => onclickLegalName(row)}>
				{row.legal_name}
			</div>
		);
	};
	const ReminderCount = (cell, row, rowIndex, formatExtraData) => {
		const renderTooltip = (props) => (
			<Tooltip id="tooltip_remider" {...props}>
				{row.reminder_data.map((li) => (
					<div>{`${li.s_no} Reminder for "${li.reminder_for}" at ${li.reminder_sent_time}`}</div>
				))}
			</Tooltip>
		);
		return (
			<OverlayTrigger placement="left" overlay={renderTooltip}>
				<div
					className="badge badge-secondary remiderBadge
		">
					{row.reminder_count}
				</div>
			</OverlayTrigger>
		);
	};

	const applicationStatusFun = (cell, row, rowIndex, formatExtraData) => {
        console.log("is it",row)
		if (
			row.application_status === 'Submitted' ||
			row.application_status === 'New request'
		) {
			return (
				<span className={'badge badge-info'}>{row.application_status}</span>
			);
		}
		if (row.application_status === 'In process') {
			return (
				<span className={'badge badge-warning'}>{row.application_status}</span>
			);
		}
		if (row.application_status === 'Approved') {
			return (
				<span className={'badge badge-success'}>{row.application_status}</span>
			);
		}
		if (row.application_status === 'Rejected') {
			return (
				<span className={'badge badge-error'}>{row.application_status}</span>
			);
		}
	};

	if (columnData) {
		// eslint-disable-next-line array-callback-return
		columnData.map((li) => {
			if (li.dataField === 'legal_name') {
				li.formatter = legalNamefunc;
			}
			if (li.dataField === 'application_status') {
				li.formatter = applicationStatusFun;
			}
			if (li.dataField === 'reminder_count') {
				li.formatter = ReminderCount;
			}
		});
	}
	const onclickLegalName = async (item) => {
		rowData = item;
		if (item.application_status === 'New request') {
			console.log('if');
			// if new req then this
            localStorage.setItem("activeTab", 'In process')
			try {
				await updateAdminStatus({
					variables: {
						formId: parseInt(item.form_id),
						userId: parseInt(item.user_id),
						formStatus: 'In process',
						rejectReason: '',
						rejectHeader: '',
					},
				});
			} catch (error) {
				//console.log(error);
			}
		} else {
			console.log('else');
			history.push(
				`/admin_home/${item.form_id}-${item.application_status}-${item.user_id}` // else doing this
			);
		}
	};
	return (
		<div>
			<BootstrapTable
				bootstrap4
				keyField="serial_no"
				data={tableData}
				columns={columnData}
				wrapperClasses="table-responsive"
				classes="table-hover table-borderless"
				headerClasses="header-class"
			/>
		</div>
	);
}

export default Table;
