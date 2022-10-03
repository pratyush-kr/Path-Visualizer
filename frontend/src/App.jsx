import "./App.css";
import { useState } from "react";
import { Grid } from "./components/Grid";
import axios from "axios";
function App() {
	const [maze, setMaze] = useState([
		[2, 0, 0, 1],
		[1, 1, 1, 1],
		[0, 1, 0, 1],
		[1, 0, 1, 3],
	]);

	const handleDefinitionSubmit = (event) => {
		event.preventDefault();
		const rows = event.target[0].value;
		const cols = event.target[1].value;
		var mz = [];
		for (var i = 0; i < rows; i++) {
			var row = [];
			for (var j = 0; j < cols; j++) {
				row.push(0);
			}
			mz.push(row);
		}
		setMaze(mz);
	};
	const solveMaze = (event) => {
		event.preventDefault();
		var startIds = [];
		var endIds = [];
		for (var i = 0; i < maze.length; i++) {
			for (var j = 0; j < maze[0].length; j++) {
				if (maze[i][j] === 2) {
					startIds.push(i);
					startIds.push(j);
				}
				if (maze[i][j] === 3) {
					endIds.push(i);
					endIds.push(j);
				}
			}
		}
		if (startIds.length > 2 || endIds.length > 2) {
			alert("start end point should only be one");
			return;
		}
		/*prettier-ignore*/
		axios.post("http://localhost:5000/solveMaze", {maze, startIds, endIds}).then((response)=> {
			const data = response.data.array;
			console.log(data);
			setMaze((exits) =>
			exits.map((row, i) =>
				row.map((val, j) => {
					// eslint-disable-next-line eqeqeq
					if(maze[i][j] == 3) {
						return 3;
					}
					// eslint-disable-next-line eqeqeq
					if (data[i][j] == 1) {
						return 5;
					}
					return val;
				})
			))
		});
	};
	return (
		<div className="App">
			<h1>Path Visualizer Using backtracking</h1>
			<div className="definition" onSubmit={handleDefinitionSubmit}>
				<form>
					<div className="defForm">
						<input type="number" placeholder="rows" />
					</div>
					<div>
						<input type="number" placeholder="columns" />
					</div>
					<div>
						<input type="submit" value="submit" />
					</div>
				</form>
			</div>
			<Grid maze={maze} setMaze={setMaze} />
			<input type="submit" value="solve-maze" onClick={solveMaze} />
		</div>
	);
}

export default App;
