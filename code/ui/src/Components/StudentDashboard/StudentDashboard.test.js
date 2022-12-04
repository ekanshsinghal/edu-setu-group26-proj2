import { render } from "@testing-library/react";
import StudentDashboard from "./StudentDashboard";

const mockResponse = {
	data: [
		{
			created_at: "Mon, 10 Oct 2022 02:48:02 GMT",
			department: "CS",
			description:
				"The Position requires you to conduct extensive research in the field of Software Engineering.",
			designation: "Senior Professor",
			display_name: "Tim",
			email: "tim@ncsu.edu",
			location: "In Person",
			posting_id: 1059,
			prerequisites:
				"The candidate must have done some research in the field of Software Engineering or must have some working Knowledge of the Field.",
			title: "Research Assistant(RA)",
			updated_at: "Mon, 10 Oct 2022 02:48:02 GMT",
		},
		{
			created_at: "Mon, 10 Oct 2022 02:50:19 GMT",
			department: "CS",
			description:
				"This is an open position in which the participants get to learn about the fundamentals of software engineering",
			designation: "Senior Professor",
			display_name: "Tim",
			email: "tim@ncsu.edu",
			location: "In Person",
			posting_id: 1060,
			prerequisites: "The candidate must be enthusiastic and hard working ",
			title: "Volunteer",
			updated_at: "Mon, 10 Oct 2022 02:50:19 GMT",
		},
		{
			created_at: "Mon, 10 Oct 2022 03:07:05 GMT",
			department: "Mechanical",
			description:
				"The Position requires you to guide students whenever they are stuck and help the professor to make notes or take a class on behalf of the professor if needed.",
			designation: "Assistant Professor",
			display_name: "Wang",
			email: "wang@ncsu.edu",
			location: "In Person",
			posting_id: 1067,
			prerequisites:
				"The candidate must have taken Thermodynamics previously or have some working Knowledge in the Field of Thermodynamics.",
			title: "Teaching Assistant(TA)",
			updated_at: "Mon, 10 Oct 2022 03:07:05 GMT",
		},
		{
			created_at: "Mon, 10 Oct 2022 03:13:59 GMT",
			department: "Mechanical",
			description:
				"The Position requires you to guide students whenever they are stuck and help the professor to make notes or take a class on behalf of the professor if needed.",
			designation: "Assistant Professor",
			display_name: "Rahul",
			email: "rahul@ncsu.edu",
			location: "In Person",
			posting_id: 1070,
			prerequisites:
				"The candidate must have taken the course previously or must have some working Knowledge in the Field",
			title: "ME 502 Teaching Assistant(TA)",
			updated_at: "Mon, 10 Oct 2022 03:13:59 GMT",
		},
		{
			created_at: "Wed, 16 Nov 2022 22:59:01 GMT",
			department: "CS",
			description: "Hello world",
			designation: "Dr",
			display_name: "Rahul",
			email: "rrangar@ncsu.edu",
			location: "In Person",
			posting_id: 1075,
			prerequisites: "aa\nbb\ncc",
			title: "Hello",
			updated_at: "Wed, 16 Nov 2022 22:59:01 GMT",
		},
		{
			created_at: "Mon, 10 Oct 2022 03:37:32 GMT",
			department: "CS",
			description: "Test",
			designation: "Senior Professor",
			display_name: "Tim",
			email: "tim@ncsu.edu",
			location: "Remote",
			posting_id: 1073,
			prerequisites: "Test",
			title: "Test ",
			updated_at: "Mon, 10 Oct 2022 03:37:32 GMT",
		},
		{
			created_at: "Mon, 10 Oct 2022 03:11:22 GMT",
			department: "Mechanical",
			description:
				"We need candidates who have a good knowledge of Thermodynamics and related concepts and who can dedicate at least 3 months to the project",
			designation: "Assistant Professor",
			display_name: "Wang",
			email: "wang@ncsu.edu",
			location: "In Person",
			posting_id: 1069,
			prerequisites:
				"The candidate must be able to work for 20 hours per week. The candidate must have a strong command of Thermodynamics.",
			title: "Project",
			updated_at: "Mon, 10 Oct 2022 03:11:35 GMT",
		},
		{
			created_at: "Wed, 23 Nov 2022 08:29:46 GMT",
			department: "CS",
			description:
				"You will be building Computer Vision and Machine Learning for our Lab\nIt's fun",
			designation: "Prof",
			display_name: "professor 1",
			email: "professor1@ncsu.edu",
			location: "Remote",
			posting_id: 1084,
			prerequisites: "Computer Vision\nMachine Learning\nPython",
			title: "ML Reseach Assistant",
			updated_at: "Sat, 03 Dec 2022 10:29:02 GMT",
		},
		{
			created_at: "Sat, 03 Dec 2022 20:54:17 GMT",
			department: "ece",
			description: "  vfvfrcvd",
			designation: "prof",
			display_name: "proff",
			email: "esingha@ncsu.eduu",
			location: "Remote",
			posting_id: 1105,
			prerequisites: "cfvfv",
			title: "test port 4",
			updated_at: "Sat, 03 Dec 2022 20:54:17 GMT",
		},
		{
			created_at: "Mon, 10 Oct 2022 02:56:23 GMT",
			department: "CS",
			description:
				"The Position requires you to guide students whenever they are stuck and help the professor to make notes or take a class on behalf of the professor if needed.",
			designation: "Assistant Professor",
			display_name: "Andre",
			email: "andre@ncsu.edu",
			location: "In Person",
			posting_id: 1062,
			prerequisites:
				"The candidate must have taken the AI in the previous years or must have some working Knowledge in the Field",
			title: "CSC 505 Teaching Assistant(TA)",
			updated_at: "Mon, 10 Oct 2022 02:56:23 GMT",
		},
		{
			created_at: "Mon, 10 Oct 2022 02:58:31 GMT",
			department: "CS",
			description:
				"The Position requires you to conduct extensive research in the field of Artificial Intelligence.",
			designation: "Assistant Professor",
			display_name: "Andre",
			email: "andre@ncsu.edu",
			location: "In Person",
			posting_id: 1063,
			prerequisites:
				"The candidate must have done some research in the field of Artificial Intelligence or must have some working Knowledge of the Field.",
			title: "CSC 505 Research Assistant(RA)",
			updated_at: "Mon, 10 Oct 2022 02:58:31 GMT",
		},
		{
			created_at: "Sat, 03 Dec 2022 19:39:18 GMT",
			department: "ece",
			description: "testing",
			designation: "prof",
			display_name: "proff",
			email: "esingha@ncsu.eduu",
			location: "Remote",
			posting_id: 1104,
			prerequisites: "uvbdkvbdiuyf",
			title: "Testing Position 3.0",
			updated_at: "Sat, 03 Dec 2022 19:39:18 GMT",
		},
		{
			created_at: "Fri, 18 Nov 2022 01:17:10 GMT",
			department: "CS",
			description: "lalala",
			designation: "Dr",
			display_name: "Rahul",
			email: "rrangar@ncsu.edu",
			location: "In Person",
			posting_id: 1076,
			prerequisites: "lalalal",
			title: "lalalal",
			updated_at: "Fri, 18 Nov 2022 01:17:10 GMT",
		},
		{
			created_at: "Mon, 14 Nov 2022 22:14:31 GMT",
			department: "CS",
			description: "test 1",
			designation: "Professor",
			display_name: "professor_test",
			email: "ptest1@gmail.com",
			location: "In Person",
			posting_id: 1074,
			prerequisites: "test",
			title: "can anyone else see this",
			updated_at: "Mon, 14 Nov 2022 22:14:31 GMT",
		},
		{
			created_at: "Mon, 10 Oct 2022 03:16:17 GMT",
			department: "Mechanical",
			description:
				"The Position requires you to conduct extensive research in the field of Computer-Aided Design (CAD) ",
			designation: "Assistant Professor",
			display_name: "Rahul",
			email: "rahul@ncsu.edu",
			location: "In Person",
			posting_id: 1071,
			prerequisites:
				"The candidate must have done some research in the field of CAD or must have some working Knowledge of the Field.",
			title: "ME 502 Research Assistant(RA)",
			updated_at: "Mon, 10 Oct 2022 03:16:17 GMT",
		},
		{
			created_at: "Mon, 10 Oct 2022 03:16:30 GMT",
			department: "Mechanical",
			description:
				"This is an open position in which the participants get to learn about the fundamentals of CAD",
			designation: "Assistant Professor",
			display_name: "Rahul",
			email: "rahul@ncsu.edu",
			location: "In Person",
			posting_id: 1072,
			prerequisites: "The candidate must be enthusiastic and hard working",
			title: "Volunteer",
			updated_at: "Mon, 10 Oct 2022 03:17:07 GMT",
		},
		{
			created_at: "Mon, 10 Oct 2022 02:37:48 GMT",
			department: "CS",
			description:
				"The Position requires you to guide students whenever they are stuck and help the professor to make notes or take a class on behalf of the professor if needed.",
			designation: "Senior Professor",
			display_name: "Tim",
			email: "tim@ncsu.edu",
			location: "In Person",
			posting_id: 1058,
			prerequisites:
				"The candidate must have taken the course previously or must have some working Knowledge in the Field",
			title: "Teaching Assistant(TA)",
			updated_at: "Mon, 10 Oct 2022 02:37:48 GMT",
		},
		{
			created_at: "Mon, 10 Oct 2022 02:54:21 GMT",
			department: "CS",
			description:
				"We need candidates who have a good command of the SDLC and who can work on a live project for 6 months",
			designation: "Senior Professor",
			display_name: "Tim",
			email: "tim@ncsu.edu",
			location: "Hybrid",
			posting_id: 1061,
			prerequisites:
				"The candidate must be able to work for 20 hours per week. \nThe candidate must have a strong command of the MERN stack and must have done at least one project using the MERN stack",
			title: "Project",
			updated_at: "Mon, 10 Oct 2022 02:54:21 GMT",
		},
		{
			created_at: "Mon, 10 Oct 2022 03:00:14 GMT",
			department: "CS",
			description:
				"This is an open position in which the participants get to learn about the fundamentals of Artificial Intelligence",
			designation: "Assistant Professor",
			display_name: "Andre",
			email: "andre@ncsu.edu",
			location: "Hybrid",
			posting_id: 1064,
			prerequisites:
				"The candidate must have some basic knowledge of AI and must be eager to learn more concepts",
			title: "Volunteer",
			updated_at: "Mon, 10 Oct 2022 03:00:14 GMT",
		},
		{
			created_at: "Mon, 10 Oct 2022 03:02:20 GMT",
			department: "CS",
			description:
				"The Position requires you to guide students whenever they are stuck and help the professor to make notes or take a class on behalf of the professor if needed.",
			designation: "Assistant Professor",
			display_name: "Leo",
			email: "leo@ncsu.edu",
			location: "In Person",
			posting_id: 1065,
			prerequisites:
				"The candidate must have taken any Algorithm related course previously or must have some working Knowledge in the Field",
			title: "CSC 510 Teaching Assistant(TA)",
			updated_at: "Mon, 10 Oct 2022 03:02:20 GMT",
		},
		{
			created_at: "Mon, 10 Oct 2022 03:04:35 GMT",
			department: "CS",
			description:
				"The Position requires you to conduct extensive research in the field of Algorithms.",
			designation: "Assistant Professor",
			display_name: "Leo",
			email: "leo@ncsu.edu",
			location: "In Person",
			posting_id: 1066,
			prerequisites:
				"The candidate must have taken any Algorithm related course previously or must have some working Knowledge in the Field",
			title: "CSC 510 Research Assistant(RA)",
			updated_at: "Mon, 10 Oct 2022 03:04:35 GMT",
		},
		{
			created_at: "Mon, 10 Oct 2022 03:08:34 GMT",
			department: "Mechanical",
			description:
				"The Position requires you to conduct extensive research in the field of Thermodynamics.",
			designation: "Assistant Professor",
			display_name: "Wang",
			email: "wang@ncsu.edu",
			location: "Hybrid",
			posting_id: 1068,
			prerequisites:
				"The candidate must have done some research in the field of Thermodynamics or Heat Transfer or have some working knowledge of those fields.",
			title: "Research Assistant(RA)",
			updated_at: "Mon, 10 Oct 2022 03:11:45 GMT",
		},
		{
			created_at: "Wed, 23 Nov 2022 21:43:27 GMT",
			department: "ece",
			description: "test",
			designation: "prof",
			display_name: "proff",
			email: "esingha@ncsu.eduu",
			location: "Remote",
			posting_id: 1085,
			prerequisites: "test",
			title: "Testing Position 2.0",
			updated_at: "Wed, 23 Nov 2022 21:43:27 GMT",
		},
		{
			created_at: "Fri, 02 Dec 2022 02:29:26 GMT",
			department: "CS",
			description: "abc",
			designation: "Professor",
			display_name: "Professor",
			email: "prof@gmail.com",
			location: "Remote",
			posting_id: 1094,
			prerequisites: "abc",
			title: "RA",
			updated_at: "Fri, 02 Dec 2022 02:29:26 GMT",
		},
	],
	status: true,
};

describe("App", () => {
	beforeEach(() => {
		jest.spyOn(global, "fetch").mockResolvedValue({
			json: jest.fn().mockResolvedValue(mockResponse),
		});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});
	test("should render Poffersor dashboard component", () => {
		Object.defineProperty(window, "matchMedia", {
			writable: true,
			value: jest.fn().mockImplementation((query) => ({
				matches: false,
				media: query,
				onchange: null,
				addListener: jest.fn(), // Deprecated
				removeListener: jest.fn(), // Deprecated
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				dispatchEvent: jest.fn(),
			})),
		});

		render(<StudentDashboard />);
	});
});
