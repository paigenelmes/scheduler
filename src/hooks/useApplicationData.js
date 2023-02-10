import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  //Combined state hook
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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
    
    }, []);

  //Helper function to book an interview
  function bookInterview(id, interview) {

    //Axios PUT request using appointment id & interview data
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    //When the response comes back, update the state
      .then(() => {

        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        }
    
        const appointments = {
          ...state.appointments,
          [id]: appointment
        }

        setState({
        ...state,
        appointments
      })
    });
  };

  //Helper function to cancel an interview
  //Uses an axios delete request & sets the interview data to null
  function cancelInterview(id) {

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => { 

        const appointment = {
          ...state.appointments,
          interview: null
        }
    
        const appointments = {
          ...state.appointments,
          [id]: appointment
        }

        setState({
          ...state,
          appointments
        })
    });
  };
  
  //Returning all the data as an object
  return { state, setDay, bookInterview, cancelInterview };

}