import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  let interviewersClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (

    <li onClick={props.setInterviewer} className={interviewersClass}>
      <img
        className={"interviewers__item-image"}
        src={props.avatar}
        alt={props.name}
        //setInterviewer={() => props.setInterviewer(props.id)}
      />
      {props.selected && props.name}
    </li>

  );
}