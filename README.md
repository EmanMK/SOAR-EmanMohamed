# Soar Task By Eman Mohamed

## Overview

This repository contains a Node.js service designed to do SOAR Backend task by Eman Mohamed.

## Features
- schools, classrooms, students crud operations
- comprehensive input validation
- error handling and appropriate HTTP status codes
- database schema
- authentication and authorization
- swagger documentation
- unit tests
- API rate limiting and security measures

## Swagger Documentation

You can find the full documentation for this service in the https://soar-emanmohamed.onrender.com/docs of the repository


## Database schema diagram
https://drive.google.com/file/d/1EQUy_R-pyAiPvCHluZZku9t8rSa0ijmj/view?usp=sharing

## steps to test service APIs
- choose between getting SUPERP_ADMIN  or SCHOOL_ADMINISTRATOR roles; to get long token. dummy step to avoid creation and login scenarios for admins.
   - call /api/user/v1_createSuperAdmin
   - call /api/user/v1_createSchoolAdmin
- create short token to be used as access token.
   - call /api/user/v1_createShortToken
- create school.
   - call /api/user/v1_createShortToken
- call any other endpoint.

## Installation

Follow the steps below to set up and run the service locally.

### Prerequisites

- Node.js 
- npm

### Steps to Install

1. Clone the repository:
    ```bash
    git clone https://github.com/EmanMK/SOAR-EmanMohamed.git
    cd [repo-name]
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure environment variables:
    Copy `.env.example` to `.env` and update the values accordingly.
    ```bash
    cp .env.example .env
    ```

4. Run the service:
    ```bash
    npm run start
    ```
    The service will be available at `http://localhost:5111`.

## Running Tests

This project uses Jest for unit testing. To run the test suite and check test coverage, follow the instructions below.

### Running Tests

To run all the tests:

```bash
npm run test
```



##TEST COVERAGE

File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------|---------|----------|---------|---------|-------------------
All files              |   64.63 |       50 |   64.28 |   72.55 |                   
 classroom             |    80.3 |       56 |     100 |   91.22 |                   
  classroom.manager.js |    80.3 |       56 |     100 |   91.22 | 44,70,88,122,144  
 school                |    80.3 |       56 |     100 |   91.22 |                   
  school.manager.js    |    80.3 |       56 |     100 |   91.22 | 43,68,101,116,137 
 student               |    80.3 |       56 |     100 |   91.22 |                   
  student.manager.js   |    80.3 |       56 |     100 |   91.22 | 48,74,118,136,156 
 token                 |       0 |        0 |       0 |       0 |                   
  Token.manager.js     |       0 |        0 |       0 |       0 | 1-78              
 user                  |       0 |        0 |       0 |       0 |                   
  User.manager.js      |       0 |        0 |       0 |       0 | 1-44             






