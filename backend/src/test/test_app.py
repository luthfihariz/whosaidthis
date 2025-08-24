import pytest
from fastapi.testclient import TestClient
import sqlite3
from src.app import app, get_db_conn
import os


@pytest.fixture
def client():
    conn = sqlite3.connect(":memory:", check_same_thread=False)
    conn.row_factory = sqlite3.Row

    def get_test_db_conn():
        try:
            yield conn
        finally:
            pass

    app.dependency_overrides[get_db_conn] = get_test_db_conn

    with open("src/schema.sql") as f:
        conn.executescript(f.read())
    conn.commit()

    yield TestClient(app)

    conn.close()
    del app.dependency_overrides[get_db_conn]


def test_read_root(client: TestClient):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Hello": "World"}


def test_leaderboard_returns_highest_score_per_user(client: TestClient):
    # Post multiple scores for the same user
    client.post("/score", json={"username": "testuser", "score": 100})
    client.post("/score", json={"username": "testuser", "score": 50})
    client.post("/score", json={"username": "testuser", "score": 150})

    # Post a score for another user to ensure the leaderboard is working correctly
    client.post("/score", json={"username": "anotheruser", "score": 120})

    # Get the leaderboard
    response = client.get("/leaderboard")
    print(response.json())
    assert response.status_code == 200
    leaderboard = response.json()

    # Verify that only the highest score for "testuser" is present
    testuser_scores = [
        item for item in leaderboard["items"] if item["username"] == "testuser"
    ]
    assert len(testuser_scores) == 1
    assert testuser_scores[0]["score"] == 150

    # Verify the leaderboard is sorted correctly
    assert leaderboard["items"][0]["username"] == "testuser"
    assert leaderboard["items"][0]["score"] == 150
    assert leaderboard["items"][1]["username"] == "anotheruser"
    assert leaderboard["items"][1]["score"] == 120

