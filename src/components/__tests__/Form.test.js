import React from "react";
import { render, cleanup } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import Form from "../../components/Appointment/Form"

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  //TEST #1
  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form 
      interviewers={interviewers} 
      />
    );

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  //TEST #2
  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form 
      interviewers={[]}
      name="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  //TEST #3
  it("validates that the student name is not blank", () => {
    /* Mock onSave function */
    const onSave = jest.fn();

    /* Render the Form with interviewers and the onSave mock function passed as an onSave prop, the student prop should be blank or undefined */
    const { getByText } = render(
      <Form 
      interviewers={interviewers}
      onSave={onSave}
      />
    );
    /* Click the save button */
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  //TEST #4
  it("validates that the interviewer cannot be null", () => {
    /* Mock onSave function */
    const onSave = jest.fn();
    /* Render the Form with interviewers and the onSave mock function passed as an onSave prop, the interviewer prop should be null */
    const { getByText } = render(
      <Form 
      interviewers={interviewers}
      onSave={onSave}
      name="Lydia Miller-Jones"
      />
    );
    /* Click the save button */
    fireEvent.click(getByText("Save"));

    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  //TEST #5
  it("calls onSave function when the name and interviewer is defined", () => {
     /* Mock onSave function */
     const onSave = jest.fn();
  
    /* Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
    const { getByText, queryByText } = render(
      <Form 
      interviewers={[]}
      interviewer={1}
      name="Lydia Miller-Jones"
      onSave={onSave}
      />
    );

    /* Click the save button */
    fireEvent.click(getByText("Save"));

  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

});