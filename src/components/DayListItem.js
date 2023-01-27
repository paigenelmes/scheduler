import React from 'react';
import classNames from "classnames";
import "components/DayListItem.scss"

export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  const formatSpots = () => {
    let spotMessage = `${props.spots} spots remaining`;

    if (props.spots === 1) {
      spotMessage = `${props.spots} spot remaining`;
    } 
    if (props.spots === 0) {
      spotMessage = "no spots remaining";
    }
  
    return spotMessage;
  };

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className={"text--regular"}>{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}