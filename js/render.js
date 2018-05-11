function Render(width, height, block_width, target){	

	var scope = this;

	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.height = height*block_width;
	canvas.width = width*block_width;
	var block_w = canvas.width / width;
	var block_h = canvas.height / height;
	//second canvas for board
	var helpcanvas = document.createElement('canvas');
	var helpctx = helpcanvas.getContext('2d');
	helpcanvas.height = canvas.height;
	helpcanvas.width = canvas.width;
	//canvas for next figure preview
	var score_canvas = document.createElement('canvas');
	var score_ctx = score_canvas.getContext('2d');
	score_canvas.height = height*5;
	score_canvas.width = width*10;

	function drawBlock( x, y){
		ctx.fillRect(block_w * x, block_h * y, block_w, block_h);
	}

	scope.drawClearBoard = function(){

		helpctx.strokeStyle = 'black';
		for (var x = 0; x < width; ++x) {
			for (var y = 0; y < height; ++y) {
				helpctx.strokeRect(block_w * x, block_h * y, block_w - 1 , block_h - 1);
			}
		}
	}
	scope.drawBoard = function( glass ){

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		score_ctx.clearRect(0, 0, score_canvas.width, score_canvas.height);
		ctx.fillStyle = 'gray';

		for (var x = 0; x < width; ++x) {
			for (var y = 0; y < height; ++y) {
				if(glass[x][y] == 1){
					drawBlock(x, y);
				}
			}
		}

	} 

	scope.drawMovingBlock = function( figure_current ){
		
		var _current_phase = figure_current.form[figure_current.phase];
		ctx.fillStyle = 'blue';

		for (var i = 0; i < _current_phase.length; i++){
			for (var j = 0; j < _current_phase[i].length; j++){
				if (_current_phase[i][j] == 1)
				{
					drawBlock(figure_current.x + i, figure_current.y + j);
				}
			}
		}
	}

	scope.drawNextBlock = function( next_figure_form ){

		score_ctx.fillStyle = 'yellow';

		for (var i = 0; i < next_figure_form.length; i++){
			for (var j = 0; j < next_figure_form[i].length; j++){
				if (next_figure_form[i][j] == 1)
				{
					score_ctx.fillRect(block_w * i, block_h * j, block_w, block_h);
				}
			}
		}
	}

	//scope.load = function(){
	target.onload= function(){

		//SQUARE FOR SCORE
		var square = document.createElement('div');
		square.style.display = 'none';
		square.style.background = 'white';
		square.style.borderRadius = '20px';
		square.style.position = 'absolute';
		square.style.left = '60px';
		square.style.top = '200px';
		square.style.width = '100px';
		square.style.height = '50px';
		square.id = 'square';

		canvas.style.position = 'absolute';

		//canvas for board settings
		helpcanvas.style.position = 'absolute';

		//score canvas settings
		score_canvas.style.position = 'absolute';
		score_canvas.style.left = canvas.width*1.2 + 'px';
		score_canvas.style.top = canvas.height/3 + 'px';

		//append all
		document.body.appendChild(helpcanvas);
		document.body.appendChild(canvas);
		document.body.appendChild(score_canvas);
		document.body.appendChild(square);
		//pause button
		pause.onclick = function(){
			tetris.setPaused(tetris.isPaused());
			console.log("paused:", tetris.isPaused());
		}

		//restart button
		start.onclick = function(){

			square.style.display = 'none';
			console.log("started");
			tetris.setPaused(true);
			tetris.startGame();
		}
		//VISUAL Score
		score.innerHTML = "Score: " + tetris.getScore().toString();
	}
	
	return scope;
}