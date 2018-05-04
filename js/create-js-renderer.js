function CreateJSRenderer(width, height){	

	var scope = this;

	scope.canvas = document.createElement('canvas');
	var ctx = scope.canvas.getContext('2d');
	scope.canvas.height = 400;
	scope.canvas.width = 200;
	var block_w = scope.canvas.width / width;
	var block_h = scope.canvas.height / height;
	//second canvas for board
	scope.helpcanvas = document.createElement('canvas');
	var helpctx = scope.helpcanvas.getContext('2d');
	scope.helpcanvas.height = scope.canvas.height;
	scope.helpcanvas.width = scope.canvas.width;

	var stage = new createjs.Stage(scope.canvas);
	stage.autoClear = false;

	function drawBlock( x, y, bitmap){

		stage.addChild(bitmap);
		bitmap.x = block_w * x;
		bitmap.y = block_h * y;
		bitmap.scaleX = block_w/height/2;
		bitmap.scaleY = block_h/height/2;
		stage.update();
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

		// stage.stage.removeAllChildren();
		// stage.clear();
		// stage.update();

		for (var x = 0; x < width; ++x) {
			for (var y = 0; y < height; ++y) {
				if(glass[x][y] == 1){
					drawBlock(x, y, new createjs.Bitmap("img/block_red.png"));
				}
			}
		}

	} 

	scope.drawMovingBlock = function( figure_current ){
		
		var _current_phase = figure_current.form[figure_current.phase];

		for (var i = 0; i < _current_phase.length; i++){
			for (var j = 0; j < _current_phase[i].length; j++){
				if (_current_phase[i][j] == 1)
				{
					drawBlock(figure_current.x + i, figure_current.y + j, new createjs.Bitmap("img/block_blue.png"));
				}
			}
		}
	}

	return scope;
}