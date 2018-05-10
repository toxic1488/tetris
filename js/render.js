function Render(width, height, block_width){	

	var scope = this;

	scope.canvas = document.createElement('canvas');
	var ctx = scope.canvas.getContext('2d');
	scope.canvas.height = height*block_width;
	scope.canvas.width = width*block_width;
	var block_w = scope.canvas.width / width;
	var block_h = scope.canvas.height / height;
	//second canvas for board
	scope.helpcanvas = document.createElement('canvas');
	var helpctx = scope.helpcanvas.getContext('2d');
	scope.helpcanvas.height = scope.canvas.height;
	scope.helpcanvas.width = scope.canvas.width;
	//canvas for next figure preview
	scope.score_canvas = document.createElement('canvas');
	var score_ctx = scope.score_canvas.getContext('2d');
	scope.score_canvas.height = height*5;
	scope.score_canvas.width = width*10;

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

		ctx.clearRect(0, 0, scope.canvas.width, scope.canvas.height);
		score_ctx.clearRect(0, 0, scope.score_canvas.width, scope.score_canvas.height);
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

	return scope;
}