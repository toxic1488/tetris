var tetris = new Tetris();

tetris.bindButtons (
	{
		"left" : 37,
		"right" : 39,
		"speed-up" : 40,
		"rotate" : 38,
		"instant" : 32
	}
);

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
