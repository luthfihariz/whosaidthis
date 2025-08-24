# API Contract

## GET /question
Response 200 
{
    "items": [
        {
            "id": 1,
            "quote": "The only way to do great work is to love what you do.",
            "options": [
                "Steve Jobs",
                "Bill Gates",
                "Mark Zuckerberg",
                "Elon Musk"
            ],
            "correct_answer": 0,
            "category": "global"
        },
         {
            "id": 2,
            "quote": "The only way to do great work is to love what you do.",
            "options": [
                "Steve Jobs",
                "Bill Gates",
                "Mark Zuckerberg",
                "Elon Musk"
            ],
            "correct_answer": 0,
            "category": "global"
        },
    ]
}

## POST /score
Request Body
{
    "score": 100,
    "username": "mulyono"
}

Response 200
{
    "status": true
}

## GET /leaderboard
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