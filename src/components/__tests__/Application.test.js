import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";


describe("Application", () => {
//Clean up
afterEach(cleanup);

//TEST #1: SCHEDULE CHANGE
it("changes the schedule when a new day is selected", async () => {
  //1. Render the Application
  const { getByText } = render(<Application />);

  //2. Wait until the "Monday" element is displayed.
  await waitForElement(() => getByText("Monday"));

  //3. Click on the "Tuesday" element.
  fireEvent.click(getByText("Tuesday"));

  //4. Check that the schedule has changed based on the new day selection.
  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

// TEST #2: LOAD DATA, BOOK INTERVIEW, REDUCE SPOTS REMAINING
it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);
  
  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Add" button on the first empty appointment.
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];
  fireEvent.click(getByAltText(appointment, "Add"));

  // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  // 5. Click the first interviewer in the list.
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  // 6. Click the "Save" button on that same appointment.
  fireEvent.click(getByText(appointment, "Save"));

  // 7. Check that the element with the text "Saving..." is displayed.
  expect(getByText(appointment, "Saving...")).toBeInTheDocument();
  
  // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
  // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "no spots remaining")).toBeInTheDocument();

});

//TEST #3: LOAD DATA, CANCEL INTERVIEW, INCREASE SPOTS REMAINING
it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));

  // 4. Check that the appointment confirmation message is shown.
  expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
 
  // 5. In the appointment confirmation, click the "Confirm" button.
  fireEvent.click(queryByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting..." is displayed.
  expect(getByText(appointment, "Deleting...")).toBeInTheDocument();
  
  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));
  
  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

});

//TEST #4: LOAD DATA, EDIT INTERVIEW, KEEPS SPOTS REMAINING THE SAME
it("loads data, edits an interview and keeps spots remaining for Monday the same", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Edit" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
  appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Edit"));

  // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  // 5. Click the first interviewer in the list.
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  // 6. Click the "Save" button on that same appointment.
  fireEvent.click(getByText(appointment, "Save"));

  // 7. Check that the element with the text "Saving..." is displayed.
  expect(getByText(appointment, "Saving...")).toBeInTheDocument();
  
  // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
  // 9. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });

//TEST #5: SHOW ERROR WHEN SAVING FAILS
it("shows the save error when failing to save an appointment", () => {
  axios.put.mockRejectedValueOnce();
  
  });

//TEST #6: SHOW ERROR WHEN DELETING FAILS
it("shows the save error when failing to delete an appointment", () => {
  axios.delete.mockRejectedValueOnce();
  
  });

});