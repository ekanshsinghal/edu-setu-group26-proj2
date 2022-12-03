import React, { useEffect, useState } from "react";
import { Button, Typography, Table, Card, Input, Modal as AntModal, Dropdown, message } from "antd";
import { DownOutlined } from "@ant-design/icons";

import config from "../../config";

const MyVerticallyCenteredModal = (props) => (
	<AntModal
		open={props.show}
		onOk={props.apply}
		okText='Apply'
		onCancel={props.onHide}
		title={props.currentJob.title}
		width={700}
	>
		<Typography.Text italic type='secondary'>
			{props.currentJob.created_at}
		</Typography.Text>
		<Typography.Title level={5}>Description</Typography.Title>
		<Typography.Text>{props.currentJob.description}</Typography.Text>
		<Typography.Title level={5}>Pre-requisites</Typography.Title>
		<Typography.Text>{props.currentJob.prerequisites}</Typography.Text>
	</AntModal>
);

export default function SavedJobs() {
	const user_id = localStorage.getItem("user_id");
	const [modalShow, setModalShow] = useState(false);
	const [currentJob, setcurrentJob] = useState({});
	const [jobs, setJobs] = useState([]);
	const [jobs_all, setJobs_all] = useState([]);
	const [loading, setLoading] = useState(true);

	const getAllPostings = async () => {
		const [jobs_all] = await Promise.all([
			fetch(config.baseUrl + "/get_saved_jobs", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify({ user_id }),
			})
				.then((response) => response.json())
				.then((data) => data.data),
		]);
		setJobs_all(jobs_all);
		setJobs(jobs_all);
		setLoading(false);
	};

	useEffect(() => {
		getAllPostings();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const apply = (job) => {
		const posting_id = job.posting_id;
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user_id, posting_id }),
		};
		fetch(config.baseUrl + "/add_application", requestOptions)
			.then((response) => response.json())
			.then((data) => {
				if (data.status === true) {
					message.success("Application submitted");
					setModalShow(false);
				} else {
					message.error(data.data);
				}
			})
			.finally(() => getAllPostings());
	};

	const filterByTitle = (e) => {
		const filter = e.target.value.toUpperCase();
		const filteredJobs = [];
		for (let i = 0; i < jobs_all.length; i++) {
			if (jobs_all[i].title.toUpperCase().indexOf(filter) > -1) {
				filteredJobs.push(jobs_all[i]);
			}
		}
		setJobs(filteredJobs);
	};

	const columns = [
		{
			title: "Job Id",
			dataIndex: "posting_id",
			key: "posting_id",
			width: 120,
		},
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
			render: (text, record) => (
				<Button
					type='link'
					onClick={() => {
						setModalShow(true);
						setcurrentJob(record);
					}}
				>
					{text}
				</Button>
			),
			sorter: (a, b) => a.title.localeCompare(b.title),
		},
		{
			title: "Professor",
			dataIndex: "display_name",
			key: "display_name",
			sorter: (a, b) => a.display_name.localeCompare(b.display_name),
		},
		{
			title: "Department",
			dataIndex: "department",
			key: "department",
			filters: [
				{ text: "CS", value: "CS" },
				{ text: "Mechanical", value: "Mechanical" },
			],
			onFilter: (value, record) => record.department === value,
			sorter: (a, b) => a.department.localeCompare(b.department),
		},
		{
			title: "Location",
			dataIndex: "location",
			key: "location",
			filters: [
				{ text: "Remote", value: "Remote" },
				{ text: "Hybrid", value: "Hybrid" },
				{ text: "In Person", value: "In Person" },
			],
			onFilter: (value, record) => record.location === value,
			sorter: (a, b) => a.location.localeCompare(b.location),
			width: 180,
		},
		{
			title: "Actions",
			width: 150,
			render: (_, record) => (
				<Dropdown
					menu={{
						items: [
							{
								label: <div onClick={() => apply(record)}>Apply</div>,
								key: "apply",
							},
							{ label: "Get shareable URL", key: "Get shareable URL" },
						],
					}}
					trigger={["click"]}
				>
					<Button type='primary'>
						Actions <DownOutlined />
					</Button>
				</Dropdown>
			),
		},
	];

	return (
		<div className='StudentDashboard'>
			<Card
				title={
					<>
						<Typography.Title level={4}>Apply Now </Typography.Title>
						<Typography style={{ fontWeight: 400, fontSize: 14 }}>
							Enhance your skills by working as a research assistant under professors
						</Typography>
					</>
				}
				extra={
					<Input
						placeholder='What are you looking for?'
						style={{ width: 250 }}
						onChange={filterByTitle}
					/>
				}
			>
				<Table columns={columns} dataSource={jobs} loading={loading} />
			</Card>
			<MyVerticallyCenteredModal
				show={modalShow}
				currentJob={currentJob}
				onHide={() => setModalShow(false)}
				apply={() => apply(currentJob)}
			/>
		</div>
	);
}
