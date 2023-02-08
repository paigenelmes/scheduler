import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
//Mode variables
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

//Custom hook
const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);

//Helper funciton for saving appointment data
function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };
  props.bookInterview(props.id, interview);
  transition(SHOW);
}

  return (  
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
    </article>
  )
}