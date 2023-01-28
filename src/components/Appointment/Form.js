import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form (props) { 

  //Hooks
  let [student, setStudent] = useState(props.student || "");
  let [interviewer, setInterviewer] = useState(props.interviewer || null)

  //Reset helper function to clear the form values
  const reset = function() {
    setStudent = "";
    setInterviewer = null;
  }

  //Cancel helper function that uses the reset function
  const cancel = function() {
    reset("");
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={student}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList 
          value={interviewer}
          onChange={setInterviewer}
          interviewer={interviewer}
          interviewers={props.interviewers}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(interviewer, student)}>Save</Button>
        </section>
      </section>
    </main>
  )

}