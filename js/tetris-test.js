var render = new Render();
var tetris = new Tetris( render );

tetris.bindFigures(
	[
		"1,1,0;0,1,1",
		"0,1,1;1,1,0",
		"1,0;1,0;1,1",
		"0,1;0,1;1,1",
		"1;1;1;1",
		"1,1;1,1",
		"0,1,0;1,1,1"
	]
);

tetris.startGame();

// if( tetris.setState(tetris.PAUSED) ){

// };
