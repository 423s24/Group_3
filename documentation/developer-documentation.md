# Warming Hut Software

## Developer Documentation

v0.1.1

#### (Group 3)

- Shane Costello
- Cody Fingerson
- Sage James
- Jonathan Neuman

## Table Of Contents

- [Motivation](#motivation)
- [Purpose](#purpose)
- Directory Structure
    - [Backend](#backend)
    - [Frontend](#frontend)
- [Builds](#builds)
- [Testing](#testing)
- [Automation](#automations)
- [Releases](#releases)
- [Errors and Bugs](#errors-and-bugs)
- [Code Format and Documentation](#code-format-and-documentation)
- [Editing Bunks & Lockers](#editing-bunks--lockers)

## Motivation

The primary motivation behind the development of this software stems from the need to streamline and enhance the
efficiency of managing guest data at the HRDC's homeless warming center. Prior to the introduction of this software, the
center relied heavily on manual data entry processes, utilizing Google Sheets to input and manage information across two
separate databases: one internal (CaseWorthy) and one statewide (HMIS). This method was not only time-consuming but also
prone to errors, leading to inefficiencies in data management and reporting.

## Purpose

This custom software solution is designed to enhance the operation of the HRDC’s year-round homeless warming center in
Bozeman, Montana. It aims to assist front desk staff in managing incoming and outgoing guests efficiently. This software
aims to minimize the learning curve and reduce the operation burden on front desk staff.

## Directory Structure

### Backend

The backend consists of a JavaScript REST API built on Node.js using Express.js as the application framework.

```
warming-center-api/
├── README.md
├── config/
├── controllers/
├── middleware/
├── models/
└── routes/
└── server.js
```

+ `config/` Application configuration settings(i.e.database operations,APIkeys, connection settings).
+ `controllers/`Logic of how user requests are handled and how the response is formulated.
+ `middleware/` Custom middleware functions that are used to perform custom
  ./operations like logging, authentication, authorization, and error handling.
+ `models/` Representation of MongoDB collections.
+ `routes/` The endpoints of the web application.

### Frontend

The frontend consists of a Vuejs project built on Node.js and Vite as the development server.

```
warming-center/
├── public/
├── src/
| ├── assets/
| ├── components/
| ├── views/
| ├── App.vue
| ├── Router.js
| ├── main.js
| ├── style.css
├── README.md
├── index.html
├── models/
└── routes/
└── server.js
```

+ `./public` Static assets that should not be bundled by the transpiler.
+ `./src` The “heart” of the application.
    + `/assets` Assets used by components.(i.e.SASS,CSS,images,etc...)
    + `/components` Reusable Vue instances that define a part of the U.I.
    + `/views` The pages of the application associated with the application
      HTTProutes.

## Builds

```
➔ Zero Feature Release
➔ Beta Release
➔ Feature Complete Release
➔ Release Candidate
➔ Final Release
```

## Testing

Loremipsumdolorsitamet,consecteturadipiscingelit,seddoeiusmodtempor
incididuntutlaboreetdoloremagnaaliqua.Aliquetbibendumenimfacilisisgravida
nequeconvallis.Placeratduisultricieslacussedturpistinciduntidaliquet.Volutpatest
velitegestasduiidornarearcu.

## Automations

Loremipsumdolorsitamet,consecteturadipiscingelit,seddoeiusmodtempor
incididuntutlaboreetdoloremagnaaliqua.Aliquetbibendumenimfacilisisgravida
nequeconvallis.Placeratduisultricieslacussedturpistinciduntidaliquet.Volutpatest
velitegestasduiidornarearcu.

## Releases

- ➔ v0.0.1 - Initial Release
- ➔ v0.1.0 - Beta Release (The most stable version of the software)

## Errors and Bugs

If you find an error, please fork the repository and create a pull request. If you have any questions, please open an
issue.

## Code Format and Documentation

The code is formatted using VSCode's built-in formatter and follows the Airbnb JavaScript style guide.
The documentation is written in Markdown and follows the GitHub Markdown style guide.

## Editing Bunks & Lockers
The number of bunks and lockers available at the shelter are easily editable in preparation for the new building! Currently, there is no user interface which allows this editing to take place, it requires running a script to communicate directly with the database. However, this script is super easy to modify and use! Locate the script at the highest level of this repository: <br>`seedScript.js` 
### Bunks
To begin modifying bunk entires, navigate to `line 63` (or where the following line of code appears:<br> 
`const bunkCollection = client.db("test").collection("bunks");`)<br> 
Here you will find three variable assignments: <br>
(1) `numObservationBunks`<br>
(2) `numWomenBunks` <br>
(3) `numMenBunks` <br>
Each variable represent the number of bunks for each respective group that are present in the shelter. To change the number of bunks, simply change the value the variable is being assigned to. Lock in your changes by running the file.

### Lockers
To begin modifying bunk entires, navigate to `line 111` (or where the following line of code appears:<br> 
`const lockerCollection = client.db("test").collection("lockers");`)<br> 
Here you will find the following variable:<br>
(1) `numLockers`<br>
This variable represents the number of lockers that are present in the shelter. To modify this, simply change the value the variable is being assigned to. Lock in your changes by running the file. 
