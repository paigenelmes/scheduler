//Get Appointments For Day helper function
const getAppointmentsForDay = function (state, day) {
  //If days data is empty, return an empty array
  if (state.days.length === 0) {
    return [];
  }
  //Find the object in state.days array whose name matches the provided day
  const dayMatch = state.days.find((date) => date.name === day);
  //If day match is not found, return an empty array
  if (!dayMatch) {
    return [];
  }
  const appointmentArray = dayMatch.appointments;
  //Map over appointmentArray and find where its id matches the id of state.appointments
  let appointmentResult = appointmentArray.map((id) => {
    return state.appointments[id];
  });
  return appointmentResult;
};

//Get Interview helper function
const getInterview = function (state, interview) {
  //Return null if interviewer is not found
  if (!interview) {
    return null;
  }
  //interview result variable with initial key/value pair for student
  let interviewResult = { student: interview.student };
  const interviewers = state.interviewers;
  //Loop over interviewers object, if the number equals the intervier's number, set the key based on state
  for (let num in interviewers) {
    if (Number(num) === interview.interviewer) {
      interviewResult.interviewer = state.interviewers[num];
    }
  }
  //Return interview result object
  return interviewResult;
};

//Get Interviewers For Day helper function
const getInterviewersForDay = function (state, day) {
  //If days data is empty, return an empty array
  if (state.days.length === 0) {
    return [];
  }

  //Find the object in state.days array whose name matches the provided day
  const dayMatch = state.days.find((date) => date.name === day);
  //If day match is not found, return an empty array
  if (!dayMatch) {
    return [];
  }

  const interviewersArray = dayMatch.appointments;
  //Map over interviewersArray and find where its id matches the id of state.interviewers
  let interviewersResult = interviewersArray.map((id) => {
    return state.interviewers[id];
  });
  return interviewersResult;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
