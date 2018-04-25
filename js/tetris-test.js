var tetris = new Tetris();

tetris.bindButtons (
	{
		37: "left",
		39: "right",
		40: "speed-up",
		38: "rotate", 
		32: "instant"
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

// window.addEventListener( "onkeydown", onActionActivated );
// window.addEventListener( "onkeyup", onActionDeactivated );

// function onActionActivated(e) {
	
// 	console.log("onActionActivated", e.detail.action );

// 	switch(e.detail.action){
// 		case "left":

// 			break;
// 		case "right":

// 			break;
// 		case "speed-up":

// 			break;
// 		case "rotate":

// 			break;
// 		case "instant":

// 			break;
// 	}

// }

// function onActionDeactivated(e) {
	
// 	console.log("onActionDectivated", e.detail.action );

// }
// setInterval( gameStep, 640);
// function gameStep(){
// 	if( tetris.isActionActive("left") ){
// 		console.log("aa");
// 	}
// 	//drawBoard();
// 	//drawMovingBlock();
// }