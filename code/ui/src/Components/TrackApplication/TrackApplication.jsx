import React, { Component } from "react";
import { Button, Card, Modal, Table, Typography, Tag, message } from "antd";

import config from "../../config";

const MyVerticallyCenteredModal = (props) => (
	<Modal
		open={props.show}
		onCancel={props.onHide}
		title={props.currentJob.title}
		footer={[
			<Button onClick={props.onHide} type='primary' key='ok'>
				Ok
			</Button>,
		]}
	>
		<Typography.Text italic type='secondary'>
			Applied on: {props.currentJob.created_at}
		</Typography.Text>
		<Typography.Title level={5}>Description</Typography.Title>
		<Typography.Text>{props.currentJob.description}</Typography.Text>
		<Typography.Title level={5}>Pre-requisites</Typography.Title>
		<Typography.Text>{props.currentJob.prerequisites}</Typography.Text>
	</Modal>
);

export class TrackApplication extends Component {
	state = {
		modalShow: false,
		user_id: localStorage.getItem("user_id"),
		currentJob: {},
		applications: [],
		loading: true,
	};

	componentDidMount() {
		this.getAllApplications();
	}

	getAllApplications = () => {
		const requestOptions2 = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ student: this.state.user_id }),
		};
		fetch(config.baseUrl + "/get_all_applications_by_student", requestOptions2)
			.then((response) => response.json())
			.then((data) => this.setState({ applications: data.data, loading: false }));
	};

	async withdrawApplication(application) {
		await fetch(config.baseUrl + "/update_application", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				application_id: application.application_id,
				status: "Withdrawn",
				remarks: application.remarks,
				student_email: application.student_email,
				professor_email: application.professor_email,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.status === true) {
					message.success("Application Withdrawn.");
				} else {
					message.error(data.data);
				}
			});
		this.getAllApplications();
	}

	render() {
		const statuses = {
			pending: "warning",
			in_progress: "processing",
			hired: "success",
			rejected: "error",
			Withdrawn: "default",
		};

		const columns = [
			{
				title: "Application Id",
				dataIndex: "application_id",
				key: "application_id",
				width: 130,
			},
			{
				title: "Applied On",
				dataIndex: "created_at",
				key: "created_at",
			},
			{
				title: "Title",
				dataIndex: "title",
				key: "title",
				render: (text, record) => (
					<Button
						type='link'
						onClick={() => {
							this.setState({
								modalShow: true,
								currentJob: record,
							});
						}}
					>
						{text}
					</Button>
				),
			},
			{
				title: "Professor",
				dataIndex: "professor_display_name",
				key: "professor_display_name",
			},
			{
				title: "Status",
				dataIndex: "status",
				key: "status",
				render: (text) => (
					<Tag color={statuses[text.toLowerCase()]}>{text.toUpperCase()}</Tag>
				),
			},
			{
				title: "Actions",
				render: (_, record) =>
					record.status !== "Withdrawn" && (
						<Button onClick={() => this.withdrawApplication(record)}>Withdraw</Button>
					),
			},
		];

		return (
			<div className='TrackApplication'>
				<Card title='Track Your Applications'>
					<Table
						dataSource={this.state.applications}
						columns={columns}
						loading={this.state.loading}
					/>
					<MyVerticallyCenteredModal
						show={this.state.modalShow}
						currentJob={this.state.currentJob}
						onHide={() =>
							this.setState({
								modalShow: false,
							})
						}
					/>
				</Card>
			</div>
		);
	}
}

export default TrackApplication;
