from distutils.log import debug
from flask import Flask, request;
from flask_cors import CORS
import json
import numpy as np

app = Flask(__name__)
cors = CORS(app)

class Maze:
    maze:np.array
    n:int
    m:int
    visited: np.array
    nVisited: list

    def __init__(self, maze:np.array) -> None:
        self.maze = maze
        self.n = maze.shape[0]
        self.m = maze.shape[1]
        self.visited = np.zeros(maze.shape, np.int32)
        self.nVisited = []

    def isValid(self, x, y) -> bool:
        n = self.maze.shape[0]
        m = self.maze.shape[1]
        if x >= 0 and y >= 0 and x < n and y < m and (self.maze[x][y] == 0 or self.maze[x][y] == 3) and self.visited[x][y] == 0:
            return True
        return False

    def RatMaze(self, move_x, move_y, x, y, p, q) -> False:
        if x == p and y == q:
            return True
        for i in range(4):
            x_new = x + move_x[i]
            y_new = y + move_y[i]
            if self.isValid(x_new, y_new):
                self.visited[x_new][y_new] = 1
                self.nVisited += [self.visited.tolist()]
                if self.RatMaze(move_x, move_y, x_new, y_new, p, q):
                    return True
                self.visited[x_new][y_new] = 0
                self.nVisited += [self.visited.tolist()]
        return False

    def mazeSolver(self, si, sj, p, q):
        move_x = [-1, 1, 0, 0]
        move_y = [0, 0, -1, 1]
        n = self.maze.shape[0]
        m = self.maze.shape[1]
        if self.RatMaze(move_x, move_y, si, sj, p, q):
            print("Solution found")
        else:
            print('Solution does  not exist')

@app.route("/")
def root():
    return "Hello";

@app.route("/solveMaze", methods = ["POST"])
def solveMaze():
    data = json.loads(request.data)
    arr = np.array(data["maze"])
    [i, j] = data["startIds"]
    [p, q] = data["endIds"]
    maze = Maze(arr)
    maze.mazeSolver(i, j, p, q)
    return {"array": maze.visited.tolist()}

if __name__ == "__main__":
    app.run(debug=True)
