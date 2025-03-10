import React from "react";
import { Form, Input, Button, Modal, message, Select, InputNumber, Card } from "antd";
import config from "../../config";
import logo from "../../assets/logo.png";
import "./Login.css";
const { Option } = Select;

export default class Login extends React.Component {
	state = {
		waitingForRegistration: false,
		waitingForLogin: false,
		register: false,
		registrationType: "",
	};

	formRef = React.createRef();
	registerFormRef = React.createRef();

	onTypeChange = (type) => this.setState({ registrationType: type });

	onClickRegister = () => this.setState({ register: true });

	onRegister = (values) => {
		this.setState({ waitingForRegistration: true });
		let url = `${config.baseUrl}/register`;
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify(values),
		})
			.then((res) => res.json())
			.then((response) => {
				if (response.status) {
					this.setState({ register: false });
					message.success("Registration Successful! You can login to the system now.");
				} else {
					message.error(response.data);
					this.registerFormRef.current?.resetFields();
				}
				this.setState({ waitingForRegistration: false });
			})
			.catch((err) => console.log(err));
	};

	onLogin = (values) => {
		this.setState({ waitingForLogin: true });
		let url = `${config.baseUrl}/login`;
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify(values),
		})
			.then((res) => res.json())
			.then((response) => {
				if (response.status) {
					message.success("Login Successful.");
					localStorage.setItem("loggedIn", "true");
					localStorage.setItem("email", response.data.email);
					localStorage.setItem("display_name", response.data.display_name);
					localStorage.setItem("type", response.data.type);
					localStorage.setItem("user_id", response.data.user_id);
				} else {
					localStorage.setItem("loggedIn", "false");
					message.error(response.data, 3);
					this.formRef.current?.resetFields();
				}
				this.setState({ waitingForLogin: false });
			})
			.catch((err) => console.log(err))
			.finally(() => {
				if (
					localStorage.getItem("loggedIn") !== null &&
					localStorage.getItem("loggedIn") === "true"
				) {
					if (localStorage.getItem("type").toLowerCase() === "professor")
						this.props.history.push("/professor");
					else if (localStorage.getItem("type").toLowerCase() === "student")
						this.props.history.push("/student/home");
					else message.error("Unknown Type! Please contact the application owner");
				}
			});
	};

	render() {
		return (
			<div className='center'>
				<Card title={<img alt='logo' src={logo} />} style={{ width: 350 }}>
					<Form
						ref={this.formRef}
						name='basic'
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 30 }}
						initialValues={{ remember: true }}
						onFinish={this.onLogin}
					>
						<Form.Item
							label='Email'
							name='email'
							rules={[
								{
									required: true,
									message: "Please input your Email!",
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label='Password'
							name='password'
							rules={[
								{
									required: true,
									message: "Please input your password!",
								},
							]}
						>
							<Input.Password />
						</Form.Item>
						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button
								type='primary'
								htmlType='submit'
								loading={this.state.waitingForLogin}
								id='login-submit'
							>
								Submit
							</Button>
						</Form.Item>
						<Form.Item wrapperCol={{ offset: 7, span: 16 }}>
							<Button type='link' onClick={this.onClickRegister}>
								Register?
							</Button>
						</Form.Item>
					</Form>
				</Card>
				<Modal
					open={this.state.register}
					title='Register'
					okText='Submit'
					footer={null}
					closable={false}
				>
					<Form
						ref={this.registerFormRef}
						labelCol={{
							span: 8,
						}}
						wrapperCol={{
							span: 40,
						}}
						onFinish={this.onRegister}
					>
						<Form.Item
							name='email'
							label='Email'
							hasFeedback
							rules={[
								{
									required: true,
									type: "email",
									message: "Please input valid Email",
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label='Display Name'
							name='display_name'
							rules={[
								{
									required: true,
									message: "Please enter your Full Name",
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label='Phone'
							name='phone'
							rules={[
								{
									pattern: new RegExp("^[0-9]{10}$"),
									message: "Please enter a valid phone. Just the 10 digits!",
								},
							]}
							hasFeedback
						>
							<Input />
						</Form.Item>
						<Form.Item
							name='password'
							label='Password'
							rules={[
								{
									required: true,
									message: "Please input password. This will be used for Login.",
								},
								{
									pattern: new RegExp(".{8,}"),
									message: "Password must be minumum 8 characters long.",
								},
							]}
							hasFeedback
						>
							<Input.Password />
						</Form.Item>
						<Form.Item
							name='confirm'
							label='Confirm Password'
							dependencies={["password"]}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Please confirm your password!",
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue("password") === value) {
											return Promise.resolve();
										}

										return Promise.reject(
											new Error(
												"The two passwords that you entered do not match!"
											)
										);
									},
								}),
							]}
						>
							<Input.Password />
						</Form.Item>
						<Form.Item
							name='type'
							label='Type'
							hasFeedback
							rules={[
								{
									required: true,
									message: "Please select a type.",
								},
							]}
						>
							<Select
								onChange={this.onTypeChange}
								placeholder='Are you a?'
								// defaultValue={"student"}
							>
								<Option key='student' value='student'>
									Student
								</Option>
								<Option key='professor' value='professor'>
									Professor
								</Option>
							</Select>
						</Form.Item>
						{this.state.registrationType === "" ? (
							<></>
						) : this.state.registrationType === "student" ? (
							<>
								<Form.Item name='degree' label='Degree' hasFeedback>
									<Input />
								</Form.Item>
								<Form.Item name='year' label='Year' hasFeedback>
									<Input />
								</Form.Item>
								<Form.Item name='major' label='Major' hasFeedback>
									<Input />
								</Form.Item>
								<Form.Item name='minor' label='Minor' hasFeedback>
									<Input />
								</Form.Item>
								<Form.Item name='gpa' label='GPA' hasFeedback>
									<InputNumber min={0} max={4} step={0.1} />
								</Form.Item>
							</>
						) : (
							<>
								<Form.Item
									name='department'
									label='Department'
									hasFeedback
									rules={[
										{
											required: true,
											message: "Please input your Department!",
										},
									]}
								>
									<Input />
								</Form.Item>
								<Form.Item name='designation' label='Designation' hasFeedback>
									<Input />
								</Form.Item>
							</>
						)}
						<Button
							type='link'
							style={{ marginLeft: "15px" }}
							onClick={() => {
								this.registerFormRef.current?.resetFields();
							}}
						>
							Reset
						</Button>
						<Button
							type='default'
							style={{ marginLeft: "15px" }}
							onClick={() => {
								this.setState({ register: false });
							}}
						>
							Cancel
						</Button>
						<Button
							style={{ marginLeft: "15px" }}
							type='primary'
							htmlType='submit'
							loading={this.state.waitingForRegistration}
						>
							Submit
						</Button>
					</Form>
				</Modal>
			</div>
		);
	}
}
