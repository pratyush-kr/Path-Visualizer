import React from "react";

export const Grid = ({ maze, setMaze }) => {
	var i = 0;
	const changeMaze = (event) => {
		event.preventDefault();
		const indexes = event.target.value.split(",");
		const r = indexes[0];
		const c = indexes[1];
		setMaze((exits) =>
			exits.map((row, i) =>
				row.map((val, j) => {
					// eslint-disable-next-line eqeqeq
					if (i == r && j == c) {
						return (val + 1) % 4;
					}
					return val;
				})
			)
		);
	};
	return (
		<div className="matrix">
			{maze.map((row) => {
				i++;
				var j = 0;
				return (
					<div key={"row" + i} className="row">
						{row.map((ele) => {
							if (ele === 0) {
								j++;
								return (
									<button
										key={j}
										className="col way"
										value={[i - 1, j - 1]}
										onClick={changeMaze}
										style={{
											minWidth:
												100 / maze[0].length + "%",
										}}
									/>
								);
							} else if (ele === 1) {
								j++;
								return (
									<button
										key={j}
										className="col block"
										value={[i - 1, j - 1]}
										onClick={changeMaze}
										style={{
											minWidth:
												100 / maze[0].length + "%",
										}}
									/>
								);
							} else if (ele === 2) {
								j++;
								return (
									<button
										key={j}
										className="col start"
										value={[i - 1, j - 1]}
										onClick={changeMaze}
										style={{
											minWidth:
												100 / maze[0].length + "%",
										}}
									/>
								);
							} else if (ele === 3) {
								j++;
								return (
									<button
										key={j}
										className="col end"
										value={[i - 1, j - 1]}
										onClick={changeMaze}
										style={{
											minWidth:
												100 / maze[0].length + "%",
										}}
									/>
								);
							} else {
								j++;
								return (
									<button
										key={j}
										className="col visited"
										value={[i - 1, j - 1]}
										onClick={changeMaze}
										style={{
											minWidth:
												100 / maze[0].length + "%",
										}}
									/>
								);
							}
						})}
					</div>
				);
			})}
		</div>
	);
};
