from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from typing import List
from . import db
import sqlite3

app = FastAPI()

db.create_tables()


class Score(BaseModel):
    score: int
    username: str


class LeaderboardItem(BaseModel):
    username: str
    score: int


class LeaderboardResponse(BaseModel):
    items: List[LeaderboardItem]


def get_db_conn():
    conn = db.get_db_connection()
    try:
        yield conn
    finally:
        conn.close()


@app.get("/")
def read_root(conn: sqlite3.Connection = Depends(get_db_conn)):
    return {"Hello": "World"}


@app.post("/score")
def create_score(score: Score, conn: sqlite3.Connection = Depends(get_db_conn)):
    try:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO score (username, score) VALUES (?, ?)",
            (score.username, score.score),
        )
        conn.commit()
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    return {"status": True}


@app.get("/leaderboard", response_model=LeaderboardResponse)
def get_leaderboard(conn: sqlite3.Connection = Depends(get_db_conn)):
    try:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT username, MAX(score) AS score
            FROM score
            GROUP BY username
            ORDER BY score DESC, MAX(created_at) DESC
            LIMIT 10
            """
        )
        items = [
            LeaderboardItem(username=row["username"], score=row["score"])
            for row in cursor.fetchall()
        ]
        return {"items": items}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
