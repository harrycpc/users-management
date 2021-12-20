import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import UsersTable from "./UsersTable";
import * as listUsers from "../../apis/users.js";
import * as deleteUser from "../../apis/users.js";
import * as updateUser from "../../apis/users.js";

describe("users table", () => {
  it("should render the component properly when there is no data", () => {
    const { container, queryByText } = render(<UsersTable />);

    expect(container.querySelectorAll("th")).toHaveLength(8);
    expect(queryByText("First name")).toBeInTheDocument();
    expect(queryByText("Last name")).toBeInTheDocument();
    expect(queryByText("Email")).toBeInTheDocument();
    expect(queryByText("Contacted")).toBeInTheDocument();
    expect(queryByText("Notes")).toBeInTheDocument();
    expect(queryByText("Last updated")).toBeInTheDocument();
    expect(queryByText("Created Time")).toBeInTheDocument();
  });

  it("should display 1 row of correct data property if a new user is added", async () => {
    const testData = [
      {
        id: 1,
        first_name: "Joni",
        last_name: "Baez",
        email: "123@123.com",
        is_contacted: true,
        notes: "Hello World",
        created_at: "2021-12-06T22:50:15.969098Z",
        updated_at: "2021-12-05T22:50:15.969098Z",
      },
    ];
    const mockGetUsers = jest.spyOn(listUsers, "listUsers");
    mockGetUsers.mockResolvedValue(testData);
    const { container } = render(<UsersTable />);

    await waitFor(() => {
      expect(container.querySelectorAll("input")).toHaveLength(4);
      expect(screen.queryByDisplayValue("Joni")).toHaveValue("Joni");
      expect(screen.queryByDisplayValue("Baez")).toHaveValue("Baez");
      expect(screen.queryByDisplayValue("123@123.com")).toHaveValue(
        "123@123.com"
      );
      expect(screen.queryByDisplayValue("Hello World")).toHaveValue(
        "Hello World"
      );
      expect(screen.getByText("December 6, 2021")).toBeInTheDocument();
      expect(screen.getByText("December 5, 2021")).toBeInTheDocument();
    });
  });

  it("should invoke the delete user callback when the delete button is clicked", async () => {
    const testData = [
      {
        id: 1,
        first_name: "Joni",
        last_name: "Baez",
        email: "123@123.com",
        is_contacted: true,
        notes: "Hello World",
        created_at: "2021-12-06T22:50:15.969098Z",
        updated_at: "2021-12-05T22:50:15.969098Z",
      },
    ];
    const mockGetUsers = jest.spyOn(listUsers, "listUsers");
    mockGetUsers.mockResolvedValue(testData);
    const mockDeleteUser = jest.spyOn(deleteUser, "deleteUser");
    render(<UsersTable />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("delete-user-button"));
      expect(mockDeleteUser).toHaveBeenCalled();
    });
  });

  it("should invoke the update callback when inputting new value in first name input", async () => {
    const testData = [
      {
        id: 1,
        first_name: "Joni",
        last_name: "Baez",
        email: "123@123.com",
        is_contacted: true,
        notes: "Hello World",
        created_at: "2021-12-06T22:50:15.969098Z",
        updated_at: "2021-12-05T22:50:15.969098Z",
      },
    ];
    const mockGetUsers = jest.spyOn(listUsers, "listUsers");
    mockGetUsers.mockResolvedValue(testData);
    const mockUpdateUser = jest.spyOn(updateUser, "updateUser");
    const { getByDisplayValue } = render(<UsersTable />);

    await waitFor(() => {
      userEvent.type(getByDisplayValue("Joni"), "Hello");
      expect(mockUpdateUser).toHaveBeenCalled();
    });
  });

  it("should invoke the update callback when inputting new value in last name input", async () => {
    const testData = [
      {
        id: 1,
        first_name: "Joni",
        last_name: "Baez",
        email: "123@123.com",
        is_contacted: true,
        notes: "Hello World",
        created_at: "2021-12-06T22:50:15.969098Z",
        updated_at: "2021-12-05T22:50:15.969098Z",
      },
    ];
    const mockGetUsers = jest.spyOn(listUsers, "listUsers");
    mockGetUsers.mockResolvedValue(testData);
    const mockUpdateUser = jest.spyOn(updateUser, "updateUser");
    const { getByDisplayValue } = render(<UsersTable />);

    await waitFor(() => {
      userEvent.type(getByDisplayValue("Baez"), "World");
      expect(mockUpdateUser).toHaveBeenCalled();
    });
  });
});
