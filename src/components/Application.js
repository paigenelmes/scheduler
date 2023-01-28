import React, { useState } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment/index";
import { appointments } from "components/Appointment/index";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {
  //Hooks
  const [value, onChange] = useState("Monday");

  //Helper function that converts the appointments object to an array and maps over the array
  //Returns a spread object with props for the appointment list

  const appointmentList = Object.values(appointments).map(appointment => {
      return (
      <Appointment 
        key={appointment.id} 
        {...appointment} 
      />
      )
  })
  

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList
    days={days}
    day={value}
    setDay={onChange}
  />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
