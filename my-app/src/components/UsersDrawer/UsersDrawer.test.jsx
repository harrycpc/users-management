import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import UsersTable from "../UsersTable/UsersTable.jsx";
import UsersDrawer from "./UsersDrawer.jsx";

describe("add new user drawer", () => {
  test("renders drawer component when add a new user button is clicked", () => {
    render(<UsersTable />);
    const { getByText } = render(<UsersDrawer />);

    fireEvent.click(screen.getByTestId("open-add-new-user-drawer-button"));

    expect(getByText("New User")).toBeInTheDocument();
  });

  test("all necessary typography and textfield should be rendered if the drawer is opened", () => {
    const { getByText, getByPlaceholderText } = render(
      <UsersDrawer isDrawerOpen />
    );
    expect(getByText("First Name")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter first name")).toBeInTheDocument();

    expect(getByText("Last Name")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter last name")).toBeInTheDocument();

    expect(getByText("Email")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter email")).toBeInTheDocument();

    expect(getByText("Notes")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter notes")).toBeInTheDocument();

    expect(
      getByText("Check the box if this user is contacted")
    ).toBeInTheDocument();
  });

  test("3 warning messages should displayed when submitting empty form", () => {
    const { getByText } = render(<UsersDrawer isDrawerOpen />);

    fireEvent.click(screen.getByTestId("add-new-user-button"));

    expect(getByText("First name required")).toBeInTheDocument();
    expect(getByText("Last name required")).toBeInTheDocument();
    expect(getByText("Invalid email")).toBeInTheDocument();
  });

  test("2 warning messages should displayed when submitting form with only inputting first name", () => {
    const { queryByText } = render(<UsersDrawer isDrawerOpen />);
    const input = screen.getByPlaceholderText("Enter first name");

    userEvent.type(input, "Harry");
    fireEvent.click(screen.getByTestId("add-new-user-button"));

    expect(queryByText("First name required")).not.toBeInTheDocument();
    expect(queryByText("Last name required")).toBeInTheDocument();
    expect(queryByText("Invalid email")).toBeInTheDocument();
  });

  test("2 warning messages should displayed when submitting form with only inputting last name", () => {
    const { queryByText } = render(<UsersDrawer isDrawerOpen />);
    const input = screen.getByPlaceholderText("Enter last name");

    userEvent.type(input, "Chow");
    fireEvent.click(screen.getByTestId("add-new-user-button"));

    expect(queryByText("First name required")).toBeInTheDocument();
    expect(queryByText("Last name required")).not.toBeInTheDocument();
    expect(queryByText("Invalid email")).toBeInTheDocument();
  });

  test("2 warning messages should displayed when submitting form with only inputting email", () => {
    const { queryByText } = render(<UsersDrawer isDrawerOpen />);
    const input = screen.getByPlaceholderText("Enter email");

    userEvent.type(input, "test@test.com");
    fireEvent.click(screen.getByTestId("add-new-user-button"));

    expect(queryByText("First name required")).toBeInTheDocument();
    expect(queryByText("Last name required")).toBeInTheDocument();
    expect(queryByText("Invalid email")).not.toBeInTheDocument();
  });

  test("1 warning message should displayed when submitting form with first and last name", () => {
    const { queryByText } = render(<UsersDrawer isDrawerOpen />);
    const inputOne = screen.getByPlaceholderText("Enter first name");
    const inputTwo = screen.getByPlaceholderText("Enter last name");

    userEvent.type(inputOne, "Harry");
    userEvent.type(inputTwo, "Chow");
    fireEvent.click(screen.getByTestId("add-new-user-button"));

    expect(queryByText("First name required")).not.toBeInTheDocument();
    expect(queryByText("Last name required")).not.toBeInTheDocument();
    expect(queryByText("Invalid email")).toBeInTheDocument();
  });

  test("1 warning message should displayed when submitting form with first name and email", () => {
    const { queryByText } = render(<UsersDrawer isDrawerOpen />);
    const inputOne = screen.getByPlaceholderText("Enter first name");
    const inputTwo = screen.getByPlaceholderText("Enter email");

    userEvent.type(inputOne, "Harry");
    userEvent.type(inputTwo, "test@test.com");
    fireEvent.click(screen.getByTestId("add-new-user-button"));

    expect(queryByText("First name required")).not.toBeInTheDocument();
    expect(queryByText("Last name required")).toBeInTheDocument();
    expect(queryByText("Invalid email")).not.toBeInTheDocument();
  });

  test("1 warning message should displayed when submitting form with last name and email", () => {
    const { queryByText } = render(<UsersDrawer isDrawerOpen />);
    const inputOne = screen.getByPlaceholderText("Enter last name");
    const inputTwo = screen.getByPlaceholderText("Enter email");

    userEvent.type(inputOne, "Chow");
    userEvent.type(inputTwo, "test@test.com");
    fireEvent.click(screen.getByTestId("add-new-user-button"));

    expect(queryByText("First name required")).toBeInTheDocument();
    expect(queryByText("Last name required")).not.toBeInTheDocument();
    expect(queryByText("Invalid email")).not.toBeInTheDocument();
  });

  test("invalid email warning message should displayed when submitting form with invalid email", () => {
    const { queryByText } = render(<UsersDrawer isDrawerOpen />);
    const inputOne = screen.getByPlaceholderText("Enter first name");
    const inputTwo = screen.getByPlaceholderText("Enter last name");
    const inputThree = screen.getByPlaceholderText("Enter email");

    userEvent.type(inputOne, "Harry");
    userEvent.type(inputTwo, "Chow");
    userEvent.type(inputThree, "test");
    fireEvent.click(screen.getByTestId("add-new-user-button"));

    expect(queryByText("First name required")).not.toBeInTheDocument();
    expect(queryByText("Last name required")).not.toBeInTheDocument();
    expect(queryByText("Invalid email")).toBeInTheDocument();
  });

  test("should trigger call back to add new user when submitting form with required information", () => {
    const handleAddNewUser = jest.fn();
    const handleCloseDrawer = jest.fn();
    render(
      <UsersDrawer
        isDrawerOpen
        onAddNewUser={handleAddNewUser}
        onClose={handleCloseDrawer}
      />
    );
    const inputOne = screen.getByPlaceholderText("Enter first name");
    const inputTwo = screen.getByPlaceholderText("Enter last name");
    const inputThree = screen.getByPlaceholderText("Enter email");
    const firstName = "Harry";
    const lastName = "Chow";
    const email = "test@test.com";

    userEvent.type(inputOne, firstName);
    userEvent.type(inputTwo, lastName);
    userEvent.type(inputThree, email);
    fireEvent.click(screen.getByTestId("add-new-user-button"));

    expect(handleAddNewUser).toHaveBeenCalledTimes(1);
    expect(handleCloseDrawer).toHaveBeenCalledTimes(1);
  });

  test("should call close drawer function when the cancel button is clicked", () => {
    const handleCloseDrawer = jest.fn();
    render(<UsersDrawer isDrawerOpen onClose={handleCloseDrawer} />);

    fireEvent.click(screen.getByTestId("close-drawer-button"));

    expect(handleCloseDrawer).toHaveBeenCalledTimes(1);
  });
});
