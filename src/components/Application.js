import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment/index";
import { appointments } from "components/Appointment/index";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  //Combined state hook
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  
  //setDay function to update the state with a new day
  const setDay = day => setState({ ...state, day });


  //axios request to days, appointments & interviewers APIs using promises
  useEffect(() => {
    const daysAPI = "http://localhost:8001/api/days";
    const appointmentsAPI = "http://localhost:8001/api/appointments";
    const interviewersAPI = "http://localhost:8001/api/interviewers";

    Promise.all([
      axios.get(daysAPI),
      axios.get(appointmentsAPI),
      axios.get(interviewersAPI)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
    
    }, [])


  //Helper function that converts the appointments object to an array and maps over the array
  //Returns a spread object with props for the appointment list
  const appointmentList = dailyAppointments.map(appointment => {
      return (
      <Appointment 
        key={appointment.id} 
        {...appointment} 
        id={appointment.id}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
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
    days={state.days}
    value={state.day}
    onChange={setDay}
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
