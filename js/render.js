function Render(width, height){	

	var scope = this;

	scope.canvas = document.createElement('canvas');
	var ctx = scope.canvas.getContext('2d');
	scope.canvas.height = 400;
	scope.canvas.width = 200;
	var block_w = scope.canvas.width / width;
	var block_h = scope.canvas.height / height;
	scope.helpcanvas = document.createElement('canvas');
	var helpctx = scope.helpcanvas.getContext('2d');
	scope.helpcanvas.height = 400;
	scope.helpcanvas.width = 200;
	var stage = new createjs.Stage(scope.canvas);
	bitmap = new createjs.Bitmap("img/block_blue.png");

	function drawBlock( x, y){
		ctx.fillRect(block_w * x, block_h * y, block_w, block_h);
		// stage.addChild(bitmap);
		// bitmap.x = block_w * x;
		// bitmap.y = block_h * y;
		// bitmap.scaleX = block_w/height/2;
		// bitmap.scaleY = block_h/height/2;
		// stage.update();
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
		ctx.strokeStyle = 'black';

		for (var x = 0; x < width; ++x) {
			for (var y = 0; y < height; ++y) {
				if(glass[x][y] == 1){
					ctx.fillStyle = 'gray';
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

	return scope;
}