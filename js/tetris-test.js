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
	{
		"z":{
			form: "1,1,0;0,1,1"
		},
		"s":{
			form: "0,1,1;1,1,0"
		},
		"l":{
			form: "1,0;1,0;1,1"
		},
		"j":{
			form: "0,1;0,1;1,1"
		},
		"i":{
			form: "1;1;1;1"
		},
		"o":{
			form:"1,1;1,1"
		},
		"t":{
			form:"0,1,0;1,1,1"
		}
	}
);

tetris.startGame();

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.height = 400;
canvas.width = 200;
var step = 20;
columns = tetris.GLASS_WIDTH
rows = tetris.GLASS_HEIGHT
var block_w = canvas.width / columns;
var block_h = canvas.height / rows;

function drawBlock( x, y){
	ctx.fillRect(block_w * x, block_h * y, block_w - 1, block_h - 1);
	ctx.strokeRect(block_w * x, block_h * y, block_w - 1, block_h - 1);
}

function drawBoard(){

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = 'black';

	for (var x = 0; x < columns; ++x) {
		for (var y = 0; y < rows; ++y) {
			//console.log(tetris.glass[y][x]);
			if (tetris.glass[y][x] == 0){
				ctx.fillStyle = 'white';
				drawBlock(x, y);
			}
			if(tetris.glass[y][x] == 1){
				ctx.fillStyle = 'gray';
				drawBlock(x, y);
			}
		}
	}

}

function drawMovingBlock(){

	for (var i = 0; i < tetris.figure_current.form[0].length; i++){
			for (var j = 0; j < tetris.figure_current.form[0][i].length; j++){
				if (tetris.figure_current.form[0][i][j] == 1)
				{
					ctx.fillStyle = 'blue';
					drawBlock(tetris.figure_current.current_x + i, tetris.figure_current.current_y + j);
				}
			}
		}
	//tetris.figure_current.current_y++;

}

window.onload = function(){

	document.body.appendChild(canvas);
	
	drawBoard();
	//setInterval( drawBoard, 30 )	
}

window.addEventListener( "onkeydown", onActionActivated );
window.addEventListener( "onkeyup", onActionDeactivated );

function onActionActivated(e) {
	
	console.log("onActionActivated", e.detail.action );

	switch(e.detail.action){
		case "left":

			break;
		case "right":

			break;
		case "speed-up":

			break;
		case "rotate":

			break;
		case "instant":

			break;
	}

}

function onActionDeactivated(e) {
	
	console.log("onActionDectivated", e.detail.action );

}
setInterval( gameStep, 640);
function gameStep(){
	if( tetris.isActionActive("left") ){
		console.log("aa");
	}
	drawBoard();
	drawMovingBlock();
}