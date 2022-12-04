import { render, queryByAttribute } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";

const getById = queryByAttribute.bind(null, "id");
test("should render Login component", async () => {
	const user = userEvent.setup();
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
	const { baseElement } = render(<Login />);
	await user.click(getById(baseElement, "login-submit"));
});
