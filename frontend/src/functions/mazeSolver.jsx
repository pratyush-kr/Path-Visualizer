const isSafe = (maze, x, y) => {
	const N = maze.length;
	const M = maze[0].length;
	if (x >= 0 && x < N && y >= 0 && y < M && maze[x][y] === 0) {
		return true;
	}
	return false;
};
const mazeSolver = (maze, setMaze, i, j, p, q) => {
	if (i === p && j === q) {
		return 1;
	}
	if (i < 0 || j < 0) {
		return 0;
	}
	var up = mazeSolver(maze, i, j, p - 1, q);
	setMaze((exits) =>
		exits.map((row, r) =>
			row.map((val, c) => {
				// eslint-disable-next-line eqeqeq
				if (p == r && q == c) {
					return 4;
				}
				return val;
			})
		)
	);
	var left = mazeSolver(maze, i, j, p, q - 1);
	return left + up;
};
export default mazeSolver;
