import React from "react";
import { Table, message, Modal, Button, Space, Tag, Card } from "antd";
import Column from "antd/lib/table/Column";
import { EditOutlined, ReloadOutlined, DownloadOutlined } from "@ant-design/icons";

import UpdateApplication from "./UpdateApplication";
import config from "../../config";

const statusColors = {
	PENDING: "orange",
	IN_PROGRESS: "blue",
	SELECTED: "success",
	REJECTED: "red",
	SHORTLISTED: "yellow",
};

export default class Applications extends React.Component {
	formRef = React.createRef();
	updateFormRef = React.createRef();

	state = {
		data: [],
		filteredData: [],
		loading: false,
		loadingUpdateApplication: false,
		visible: false,
		updateVisible: false,
		applicantsData: {},
		updateApplicantData: {},
		resumes: {},
	};

	onCloseEdit = () => this.setState({ updateVisible: false });

	onClose = () => this.setState({ visible: false });

	onClickApplicants = (record) => this.setState({ visible: true, applicantsData: record });

	fetchApplications = async () => {
		this.setState({ loading: true });
		let url = `${config.baseUrl}/get_applications_for_professor`;
		let students = new Set();
		await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({
				professor: localStorage.getItem("user_id"),
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				if (response.status) {
					response.data.map((application) =>
						application.Applications.map((student) =>
							students.add(student.student_user_id)
						)
					);
					this.setState({ data: response.data, filteredData: response.data });
				} else {
					message.error(response.data, 1);
				}
				this.setState({ loading: false });
			})
			.catch((err) => console.log(err));
		students = Array.from(students);
		const urls = await Promise.all(
			students.map((student) =>
				fetch(config.baseUrl + "/get_resume", {
					method: "POST",
					body: JSON.stringify({ user_id: student }),
				})
					.then((res) => res.json())
					.then((data) => data.resume_url)
			)
		);
		const resumes = {};
		for (let i = 0; i < students.length; i++) {
			resumes[students[i]] = urls[i];
		}
		this.setState({ resumes });
	};

	componentDidMount() {
		this.fetchApplications();
	}

	onUpdateApplication = (record) =>
		this.setState({ updateApplicantData: record, updateVisible: true });

	render() {
		return (
			<Card
				title='Applications'
				extra={[
					<Button
						type='link'
						icon={<ReloadOutlined />}
						onClick={() => this.fetchApplications}
					>
						Refresh
					</Button>,
				]}
			>
				<Modal
					title='Applicants'
					open={this.state.visible}
					onCancel={this.onClose}
					footer={null}
					width={1000}
					maskClosable={false}
					centered={true}
				>
					<Table
						rowKey={(record) => record.student_user_id}
						bordered
						size='small'
						dataSource={this.state.applicantsData.Applications}
					>
						<Column
							title='Student Name'
							dataIndex='student_display_name'
							key='student_display_name'
						/>
						<Column
							title='Student Email'
							dataIndex='student_email'
							key='student_email'
							render={(record) => <a href={"mailto:" + record}>{record}</a>}
						/>
						<Column title='GPA' dataIndex='student_gpa' key='student_gpa' />
						<Column title='Major' dataIndex='student_major' key='student_major' />
						<Column title='Minor' dataIndex='student_minor' key='student_minor' />
						<Column title='Phone' dataIndex='student_phone' key='student_phone' />
						<Column title='Year' dataIndex='student_year' key='student_year' />
						<Column
							title='Status'
							key='status'
							render={(record) => {
								return (
									<Tag color={statusColors[record.status.toUpperCase()]}>
										{record.status.toUpperCase()}
									</Tag>
								);
							}}
						/>
						<Column
							title='Resume'
							key='resume'
							render={(record) =>
								this.state.resumes[record.student_user_id] && (
									<Button
										href={this.state.resumes[record.student_user_id]}
										icon={<DownloadOutlined />}
										type='link'
									>
										Download
									</Button>
								)
							}
						/>
						<Column
							title='Actions'
							key='action'
							render={(record) => (
								<Space size='small'>
									<Button
										type='link'
										icon={<EditOutlined />}
										onClick={() => this.onUpdateApplication(record)}
									/>
								</Space>
							)}
						/>
					</Table>
				</Modal>
				<Modal
					title='Update Application'
					open={this.state.updateVisible}
					onCancel={this.onCloseEdit}
					footer={null}
					maskClosable={false}
					centered={true}
				>
					<UpdateApplication {...this} {...this.state} {...this.props} />
				</Modal>
				<Table
					loading={this.state.loading}
					size='small'
					dataSource={this.state.filteredData}
				>
					<Column
						title='Title'
						key='title'
						render={(record) => (
							<Button onClick={() => this.onClickApplicants(record)} type='link'>
								{record.title}
							</Button>
						)}
					/>
					<Column title='Description' dataIndex='description' key='description' />
					<Column title='Prerequisites' dataIndex='prerequisites' key='prerequisites' />
					<Column
						title='No. of Applicants'
						key='applicants'
						render={(record) => <Tag color='blue'>{record?.Applications?.length}</Tag>}
					/>
				</Table>
			</Card>
		);
	}
}
