import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  //Hooks
  let [student, setStudent] = useState(props.student || "");
  let [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  //Reset helper function to clear the form values
  const reset = function () {
    setStudent("");
    setInterviewer(null);
  };

  //Cancel helper function that uses the reset function
  const cancel = function () {
    reset("");
    props.onCancel();
  };

  //Validation helper function to make sure student name isn't blank & interviewer is selected
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank.");
      return;
    }

    if (interviewer === null) {
      setError("Please select an interviewer.");
      return;
    }

    setError("");
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={student}
            name="name"
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
            onChange={(event) => setStudent(event.target.value)}
          />
          <section className="appointment__validation">{error}</section>
          <InterviewerList
            value={interviewer}
            onChange={setInterviewer}
            interviewer={interviewer}
            interviewers={props.interviewers}
          />
        </form>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
