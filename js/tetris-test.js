var tetris = new Tetris( {
	renderer: CreateJSRenderer,
	glass_width: 10,
	glass_height: 20,
	block_width: 20,
	fall_delta: 700,
	figures: [
		"0,1,0;1,1,1;0,1,0",
		"1,1,0;0,1,1",
		"0,1,1;1,1,0",
		"1,0;1,0;1,1",
		"0,1;0,1;1,1",
		"1;1;1;1",
		"1,1;1,1",
		"0,1,0;1,1,1"
	]//,
	// bind_actions: {
	// 	"left":{
	// 		keys: [37]
	// 	},
	// 	"instant":{
	// 		keys: [32]
	// 	},
	// 	"right":{
	// 		keys: [39]
	// 	},
	// 	"rotate":{
	// 		keys: [38]
	// 	},
	// 	"speed-up":{
	// 		keys: [40]
	// 	}
	// }
});

//tetris.bindFigures(["0,1,0;1,1,1;0,1,0"]);
tetris.startGame();

// if( tetris.setState(tetris.PAUSED) ){

// };
