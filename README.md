# Brief note about the system

## Functional requirements:

- System should support multiple movies, show times and halls. But for now we are going to focus only on multiple users trying to book tickets for the same movie show
- User can select upto maximum of 6 seats
- User has to pay within 2 minutes or the seats would be released for other users to book
- Seats are reserved on first-cum-first serve basis. If any two users request for the same seat then yield to the one which has more number of seats. If there is still a tie then accept any one user and reject all other

## Architecture Characteristics:
- System should be scalable to handle load of customer


## Assumptions:
- Third party payment API which gives payment success or failure
- Single database instance for storing the data
- There are several other subtle assumptions as well. They were made to simplify they project, for example, all halls are showing same set of movies, and all the show timings are same too

## Setup

- ./front-end/cinema-hall is the front end of the system and would need to run `yarn install` and `yarn start`
- back-end is the back-end of the system and would only need to run `npm run develop`(or `npm run start` or if you want to use yarn then replace `npm run` with `yarn`)
- go to localhost:3000 for testing simple ticket booking system
