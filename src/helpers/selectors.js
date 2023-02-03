export default function getAppointmentsForDay(state, day) {
  //If days data is empty, return an empty array
  if (state.days.length === 0) {
    return [];
  }
  //Find the object in state.days array whose name matches the provided day
  const dayMatch = state.days.find(date => date.name === day);
  //If day match is not found, return an empty array
  if (!dayMatch) {
    return [];
  }
  const appointmentArray = dayMatch.appointments;
  //Map over appointmentArray and find where its id matches the id of state.appointments
  let appointmentResult = appointmentArray.map((id => {
      return state.appointments[id];
    }
  ))
  return appointmentResult;
}