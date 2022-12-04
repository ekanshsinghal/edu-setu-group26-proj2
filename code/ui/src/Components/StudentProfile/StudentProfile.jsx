import React, { useEffect } from "react";
import { Button, Card, Form, Input, message, Typography } from "antd";

import config from "../../config";

export default function StudentProfile() {
	const user_id = localStorage.getItem("user_id");
	const [user_name, setuser_name] = React.useState("");
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
	};

	const updateProfile = async (values) => {
		console.log(values);
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(values),
		};
		const [profile, resume] = await Promise.all([
			fetch(config.baseUrl + "/edit_profile", requestOptions)
				.then((response) => response.json())
				.then((data) => {
					if (data.status === true) {
						message.success("Profile updated succesfully!");
					} else message.error(data.data);
				}),
			fetch(config.baseUrl + "/upload_resume", {
				method: "POST",
				body: JSON.stringify({ resume_file: values.resume, user_id }),
			}).then((response) => response.json()),
		]);

		getUserProfile();
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
						<img
							width='150px'
							src='https://www.pngmart.com/files/21/Account-Avatar-Profile-PNG-Clipart.png'
							alt='user'
						/>
						<Typography.Text strong>{user_name}</Typography.Text>
						<Typography.Text type='secondary'>{current_user.email}</Typography.Text>
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
							<Form.Item label='Resume' name='resume'>
								<Input accept='application/pdf' type='file' />
							</Form.Item>
							<Form.Item wrapperCol={{ offset: 3, span: 16 }}>
								<Button
									type='primary'
									htmlType='submit'
									style={{ marginRight: 32 }}
								>
									Submit
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
			</Card>
		</div>
	);
}
