import React, { useEffect } from "react";
import { Avatar, Button, Card, Form, Input, message, Typography, Upload } from "antd";
import { UploadOutlined, UserOutlined, DownloadOutlined } from "@ant-design/icons";
import axios from "axios";

import config from "../../config";

export default function StudentProfile() {
	const user_id = localStorage.getItem("user_id");
	const [user_name, setuser_name] = React.useState("");
	const [dp_url, setdp_url] = React.useState("");
	const [resume_url, setresume_url] = React.useState("");
	const [current_user, setcurrent_user] = React.useState({});
	const [loading, setloading] = React.useState(true);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => getUserProfile(), []);

	const getUserProfile = () => {
		fetch(config.baseUrl + "/get_user_profile", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user_id }),
		})
			.then((response) => response.json())
			.then((data) => {
				const changed_details = data.data;
				changed_details["user_id"] = user_id;
				setcurrent_user(changed_details);
				setuser_name(data.data.display_name);
				setloading(false);
			});
		fetch(config.baseUrl + "/get_profile_pic", {
			method: "POST",
			body: JSON.stringify({ user_id }),
		})
			.then((response) => response.json())
			.then((data) => data.file_exists && setdp_url(data.resume_url));
		fetch(config.baseUrl + "/get_resume", {
			method: "POST",
			body: JSON.stringify({ user_id }),
		})
			.then((response) => response.json())
			.then((data) => data.resume_url && setresume_url(data.resume_url));
	};

	const updateProfile = async (values) => {
		await fetch(config.baseUrl + "/edit_profile", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(values),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.status === true) {
					message.success("Profile updated succesfully!");
				} else message.error(data.data);
			});

		getUserProfile();
	};

	const uploadResume = async (req) => {
		const fmData = new FormData();
		fmData.append("user_id", user_id);
		fmData.append("resume_file", req.file, req.file.name);
		try {
			await axios.post(config.baseUrl + "/upload_resume", fmData, {
				headers: { "content-type": "multipart/form-data" },
				onUploadProgress: (event) => {
					req.onProgress({ percent: (event.loaded / event.total) * 100 });
				},
			});
			req.onSuccess("Ok");
		} catch (e) {
			req.onError({ e });
		}
	};

	const uploadPic = async (req) => {
		const fmData = new FormData();
		fmData.append("user_id", user_id);
		fmData.append("image_file", req.file, req.file.name);
		try {
			await axios.post(config.baseUrl + "/upload_profile_pic", fmData, {
				headers: { "content-type": "multipart/form-data" },
				onUploadProgress: (event) => {
					req.onProgress({ percent: (event.loaded / event.total) * 100 });
				},
			});
			req.onSuccess("Ok");
		} catch (e) {
			req.onError({ e });
		}
	};

	return (
		<div className='StudentProfile'>
			<Card title='Profile Settings' loading={loading}>
				<div style={{ display: "flex" }}>
					<div
						style={{
							padding: "16px 48px",
							textAlign: "center",
							alignItems: "center",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							width: 300,
						}}
					>
						<Avatar
							src={dp_url}
							size={150}
							icon={<UserOutlined />}
							style={{ marginBottom: 32 }}
						/>

						<Typography.Text strong>{user_name}</Typography.Text>
						<Typography.Text type='secondary'>{current_user.email}</Typography.Text>

						<Upload accept='.png, .jpg, .jpeg' maxCount={1} customRequest={uploadPic}>
							<Button icon={<UploadOutlined />}>Upload Picture</Button>
						</Upload>
					</div>
					<div style={{ padding: "16px 48px", flex: 1 }}>
						<Form
							name='profile'
							labelCol={{ span: 4 }}
							wrapperCol={{ span: 12 }}
							onFinish={updateProfile}
							initialValues={{
								display_name: current_user.display_name,
								phone: current_user.phone,
								degree: current_user.degree,
								major: current_user.major,
								minor: current_user.minor,
								gpa: current_user.gpa,
								year: current_user.year,
							}}
						>
							<Form.Item label='Name' name='display_name'>
								<Input />
							</Form.Item>
							<Form.Item label='Mobile Number' name='phone'>
								<Input />
							</Form.Item>
							<Form.Item label='Degree' name='degree'>
								<Input />
							</Form.Item>
							<Form.Item label='Major' name='major'>
								<Input />
							</Form.Item>
							<Form.Item label='Minor' name='minor'>
								<Input />
							</Form.Item>
							<Form.Item label='GPA' name='gpa'>
								<Input />
							</Form.Item>
							<Form.Item label='Year' name='year'>
								<Input />
							</Form.Item>
							<Form.Item label='Resume'>
								<Upload accept='.pdf' maxCount={1} customRequest={uploadResume}>
									<Button icon={<UploadOutlined />}>Upload Resume</Button>
								</Upload>
							</Form.Item>
							<Form.Item wrapperCol={{ offset: 3, span: 16 }}>
								<Button
									type='primary'
									htmlType='submit'
									style={{ marginRight: 32 }}
								>
									Submit
								</Button>
								{resume_url && (
									<Button
										type='primary'
										icon={<DownloadOutlined />}
										href={resume_url}
									>
										Download Resume
									</Button>
								)}
							</Form.Item>
						</Form>
					</div>
				</div>
			</Card>
		</div>
	);
}
