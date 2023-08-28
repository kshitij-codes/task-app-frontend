import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tasks from "../src/pages/Tasks";
import Login from "../src/pages/Login";
import React from "react";

test("renders without crashing", () => {
	render(
		<Router>
			<Tasks />
		</Router>
	);
});

test("redirects to login when there is no token", async () => {
	window.localStorage.setItem("token", ""); // Ensure there's no token
	render(
		<Router>
			<Routes>
				<Route path="/tasks" element={<Tasks />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</Router>
	);

	// Wait for any asynchronous actions to complete
	// You might need to adjust this depending on how your component works
	await new Promise((resolve) => setTimeout(resolve, 1000));

	expect(screen.getByText("Login")).toBeInTheDocument();
});
