# Do-It App

Do-It App is a simple and intuitive TODO list application that helps parents assign tasks to their children. The application utilizes Socket.IO to enable real-time updates and communication between clients.  Successful completion of the tasks is dependent on the quality of your children.


## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [Contributors](#contributors)
- [License](#license)

## Features

- Real-time task assignment and updates using Socket.IO
- Easy-to-use back end interface for assigning and viewing tasks
- Organized task management using namespaces and rooms representing households and physical areas of the house
- Ready to connect to the front end framework of your choice

## Installation

1. Clone the repository:

git clone https://github.com/Get-To-It/Do-It-App.git

2. Install dependencies:

npm install

## UML

![UML](https://ryanbagan473965.invisionapp.com/freehand/-JsYWQMMfW?dsid_h=453d83f8474c0e742fb196b674417abb752a69bfc23845cbfa980c76b69ee9d2&uid_h=8763c6b09f43b58516c3116e2c7eef7892fc1b56a5800102d0af6ab36eb6446c)

### Usage

Open your browser and navigate to http://localhost:3000.
Select a room (physical area of the house) from the dropdown menu.
Enter a new task and click the "Add" button to assign it to the selected room.
The task list will be updated in real-time for all clients connected to the same room.

#### Tests

TODO: Add instructions on how to run tests for the project, if applicable.

#### Contributors

- Ryan Bagan
- Nathan Brown
- Kyle Freemantle

##### License

This project is licensed under the MIT License - see the LICENSE file for details.