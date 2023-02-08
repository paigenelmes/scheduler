import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
//Mode variables
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

//Custom hook
const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);

//Helper funciton to save an appointment
function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  }
  //Transitions to SAVING mode before calling props.bookInterview & transitioning to SHOW
  transition(SAVING);
  props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
}

//Helper function to cancel an appointment
function deleteInterview() {
  //Transitions to DELETING mode
  transition(DELETING);
  //Calls on props.deleteInterview & transitions to EMPTY
  props.cancelInterview(props.id)
    .then(() => transition(EMPTY));
}

  return (  
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && (
        <Empty 
          onAdd={() => transition(CREATE)}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status 
          message={"Saving..."}
        />
      )}

      {mode === CONFIRM && (
        <Confirm 
          message={"Are you sure you would like to delete?"}
          onCancel={back}
          onConfirm={deleteInterview}/>
      )}
      
      {mode === DELETING && (
        <Status 
          message={"Deleting..."}
        />
      )}

    </article>
  )
}