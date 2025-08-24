## Explain Project
Explain this project’s purpose, architecture, key modules, and how the code flows at a high level. Highlight any design patterns, frameworks, or libraries being used.

## Make the documentation
Based on what you explain, please create a README documentation for this project also include the instruction to setup the project and what are prerequisites.

## Create Cursor Rules
Create a cursor rules for this project. 

## Ask AI to explain /quiz page
Please explain to me how this /quiz page works, what are the components insides and what are their responsibility?

## Adding score functionality

Okay cool, now we would like to add scoring function. In the end of the quiz, we would like to display the score.

Scoring logic: 1 point per question. So user will get 4 points if they can answer 4 questions right.

We will display the score result with this format: "You scored 4!"

Tell me the plan first.


## Revise score functionality

Requirement has change. We need to change the scoring logic to also consider the time taken to answer the question.

Scoring logic: 10 per questions. However, if user able to answer questions before 10s, they will get extra points which is (10s - time taken). For example, if user answer the question in 5s, they will get 15 points. If user answer the question in 11s, they will get 10 points, no additional points.

Lay out the plan first.


## Backend Integration - Score

I have built the backend API to capture all the score from the user. So I want you to implement the API call whenever user reach the QuizFinishPage.

The API endpoint
POST /score 
Request Body
{
  "score": 50,
  "username": "test",
}

When it's done, then display the score to the user. If fail, show a simple error message.

Layout the plan first, don't do any edit.


## Leaderboard - Route
Okay, next please create an API call for this

GET /learboard

The response
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

Focus on creating the api router first and the type.


## Leaderboard - UI
Let's build the UI for the leaderboard. Leaderboard will be visible under the Member Home Page.

Create a new component for the leaderboard but make sure we fetch all the data from the API first. We want this leaderboard table component to be server side.

## Refactore Page Header Component
Extract this to a single dedicated component, it will later reused in multiple place. For now just extract to a single component first please.