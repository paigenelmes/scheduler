import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  //Mode variables
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  //Custom hook
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //Helper funciton to save an appointment
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    //Transitions to SAVING mode before calling props.bookInterview & transitioning to SHOW mode
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      //Error handling
      .catch(() => transition(ERROR_SAVE, true));
  }

  //Helper function to cancel an appointment
  function deleteInterview(event) {
    //Transitions to DELETING mode
    transition(DELETING);
    //Calls on props.deleteInterview & transitions to EMPTY, handles errors
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => transition(ERROR_DELETE, true));
  }
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}

      {mode === SAVING && <Status message={"Saving..."} />}

      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={back}
          onConfirm={deleteInterview}
        />
      )}

      {mode === DELETING && <Status message={"Deleting..."} />}

      {mode === EDIT && (
        <Form
          student={props.student}
          interviewer={props.interviewer}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message={"Could not cancel appointment."} 
          onClose={(() => back())}
        />
      )}

      {mode === ERROR_SAVE && (
      <Error 
        message={"Could not save appointment."} 
        onClose={(() => back())}
      />
      )}
    </article>
  );
}
