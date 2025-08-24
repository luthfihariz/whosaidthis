# Build from scratch
## Initialize
Create a new simple FastAPI project, the project is using pipenv as the package manager. Setup a simple endpoint that does hello world using FastAPI. All code should reside under /src folder.


## Create SQLite Database
Okay good, now let's setup a simple SQLite database without using any ORM library. Create a dedicated db.py file that will manage database connection, and import the db at the app.py.

In the database, setup one table first that will store all users' score.
Table: score
Column:
- username, text
- score, integer
- created_at, datetime


## Create the endpoint to store all scores
Create the endpoint to store the scores
POST /score
Request Body
{
 "score": 120,
 "username": "johndoe"
}

Response
{
 "status": true
}

It will do request validation using Pydantic and then save the data to the sqlite database.

Keep it simple. Add a try catch around database transaction


## Create leaderboard endpoint

Now let's create one more endpoint where we rank scores group by username, select the latest created_at and 
order by highest score. Item number 1 is rank 1, and so on. Rank 1 should have the highest number from the database. Show only maximum 10 username.

GET /leaderboard
Response 
{
    "items": [
        {
            "username": "mulyono",
            "score": "120"
        },
        {
            "username": "johndoe",
            "score": "100"
        }
    ]
}


# Documentation: Create README

Please create a readme file. Make sure it contains these:
- Explain on high level about the project
- Tech stack it's being used
- What are the prerequisites to run this project
- Step by step to run this project

# Deployment

## Gitignore
Generate a gitignore for this project.

## Dockerfile for deployment

Setup a dockerfile that will be used for the deployment of this backend service, it will use pipenv as the package manager and also uvicorn for the web server.

Create docker file and also docker compose, so when deploying it could be as easy as `docker compose up`.

Make sure it setup the volume to keep the sqlite database file persistent.


# Testing

## Plan
We are almost done now, but we need some testing. Can you suggest and plan on what kind of testing that we can add here?

## First Step
Got it, let's install httpx first then start with the simplest integration testing for the root endpoint, just expect it will return 200 as status code.

All the test file should reside under the `test` folder inside the `src`

## Second Step Leaderboard Testing

Okay now the test is working, I would like you to add more tests.

Scenario: add multiple score with the username and call leaderboard api to make sure that only the highest score is visible in the leaderboard. Always do score table teardown before the test start. Do this in an efficient way.

