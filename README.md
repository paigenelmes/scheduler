# Interview Scheduler

## About
Interview Scheduler is a single-page app that allows users to book technical interviews. The front end of this project was created with **React**. It makes requests to an **API** with **Axios** to fetch and store appointment data from a database. This project was tested using **Storybook**, **Jest** and **Cypress**.

*NOTE: This project was created as part of my learning with Lighthouse Labs and it is not intended for use in production-grade software.*
![Scheduler Overview](https://github.com/paigenelmes/scheduler/blob/master/public/images/screenshots/1-scheduler-overview.png)

Interviews can be scheduled from Monday - Friday, between 12PM and 5PM. Users can add an appointment, input any name and select an interviewer from a pre-defined list.
![Scheduler Add](https://github.com/paigenelmes/scheduler/blob/master/public/images/screenshots/2-scheduler-add.png)

A user can save the appointment and view the entire schedule for the week.
![Scheduler Appointments](https://github.com/paigenelmes/scheduler/blob/master/public/images/screenshots/3-scheduler-appointments.png)

Appointments can also be edited or deleted. If a user tries to delete an appointment, a confirmation message is shown to ask if they are sure they want to delete it.
![Scheduler Confirm](https://github.com/paigenelmes/scheduler/blob/master/public/images/screenshots/4-scheduler-confirm.png)

Users must input a name and select an interviewer. If one or both are missing, the appointment will not be saved.
![Scheduler Missing Info](https://github.com/paigenelmes/scheduler/blob/master/public/images/screenshots/5-scheduler-missing-info.png)
## Setup

1. Clone this repository.
2. Install the scheduler dependencies with `npm install`.
3. Clone the [scheduler-api repository](https://github.com/paigenelmes/scheduler-api).
4. Install the scheduler-api dependencies with `npm install`.
5. Login to the the PostgreSQL server with the username **development** and the password **development**. Use the command `psql -U development`.
6. Create the database with the command `CREATE DATABASE scheduler_development;`. 
7. Within the scheduler-api root folder, copy and paste the **.env.example file.** Name the new file **.env.development**.
8. In the **.env.development** file, add the following PostgreSQL configiration: 
```sh
PGHOST=localhost
PGUSER=development
PGDATABASE=scheduler_development
PGPASSWORD=development
PGPORT=5432
```
9. Run the scheduler-api with the command `npm start`.
10. Perform a database reset by navigating to http://localhost:8001/api/debug/reset in your browser.
11. In a seperate terminal window, navigate to the scheduler root folder and use the command `npm start` to run the scheduler.
12. Visit http://localhost:8000/ in your browser and check out the scheduler! The scheduler should now be populated with data from the scheduler-api.
## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
