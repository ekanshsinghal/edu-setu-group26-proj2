import React, { useState } from "react";
import { Layout, Menu, Button, message } from "antd";
import {
	GlobalOutlined,
	LogoutOutlined,
	ProfileOutlined,
	SaveOutlined,
	UserOutlined,
} from "@ant-design/icons";

import TrackApplication from "../TrackApplication/TrackApplication";
import StudentProfile from "../StudentProfile/StudentProfile";
import StudentDashboard from "../StudentDashboard/StudentDashboard";
import SavedJobs from "../SavedJobs/SavedJobs";

const { Content } = Layout;

export default function Home({ history }) {
	const [selected_tab, setSelectedTab] = useState("");

	const handleLogout = () => {
		localStorage.clear();
		message.success("User Logged out successfully.", 1);
		history.push("/auth");
	};

	const renderTab = () => {
		switch (selected_tab) {
			case "Home":
				return <StudentDashboard />;
			case "Applications":
				return <TrackApplication />;
			case "Profile":
				return <StudentProfile />;
			case "Saved Jobs":
				return <SavedJobs />;
			default:
				return <StudentDashboard />;
		}
	};

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Layout.Header
				style={{
					position: "fixed",
					top: 0,
					zIndex: 100,
					width: "100%",
					backgroundColor: "#fff",
				}}
			>
				<div style={{ float: "left" }}>
					<img
						src={`${process.env.PUBLIC_URL}/assets/images/Edu_Setu_Logo_Transparent.png`}
						alt='Logo'
						id='logo'
						style={{ height: 38, margin: "-6px 0" }}
					/>
				</div>
				<div style={{ display: "flex" }}>
					<span style={{ flex: 1 }} />
					<Menu
						mode='horizontal'
						style={{ backgroundColor: "#fff", width: 500 }}
						items={[
							{ label: "Home", key: "Home", icon: <ProfileOutlined /> },
							{ label: "Saved Jobs", key: "Saved Jobs", icon: <SaveOutlined /> },
							{
								label: "Applications",
								key: "Applications",
								icon: <GlobalOutlined />,
							},
							{ label: "Profile", key: "Profile", icon: <UserOutlined /> },
						]}
						defaultSelectedKeys={["Home"]}
						onClick={({ key }) => setSelectedTab(key)}
					/>
					<Button
						type='primary'
						style={{ margin: 16 }}
						onClick={handleLogout}
						icon={<LogoutOutlined />}
					>
						Logout
					</Button>
				</div>
			</Layout.Header>
			<Content style={{ margin: "76px 32px 32px 32px" }}>{renderTab()}</Content>
		</Layout>
	);
}
