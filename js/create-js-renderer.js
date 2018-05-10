function CreateJSRenderer(width, height, block_width){	

	var scope = this;

	scope.canvas = document.createElement('canvas');
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
	scope.score_canvas.height = height*5;
	scope.score_canvas.width = width*10;
	var score_stage = new createjs.Stage(scope.score_canvas);
	var score_container = new createjs.Container();
	score_stage.autoClear = false;

	var stage = new createjs.Stage(scope.canvas);
	var container = new createjs.Container();
	stage.autoClear = false;

	var ASSET_MANAGER = new AssetManager();
	ASSET_MANAGER.queueDownload("img/block_blue.png");
	//var _blue = ASSET_MANAGER.getAsset(0);

	function drawBlock( x, y, bitmap){

		stage.addChild(container);
		container.addChild(bitmap);
		bitmap.x = block_w * x;
		bitmap.y = block_h * y;
		bitmap.scaleX = block_w/width/4;
		bitmap.scaleY = block_h/height/2;
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

		//clear canvas
		stage.clear();
		stage.update();
		container.removeAllChildren();

		//clear score_canvas
		score_stage.clear();
		score_stage.update();
		score_container.removeAllChildren();


		for (var x = 0; x < width; ++x) {
			for (var y = 0; y < height; ++y) {
				if(glass[x][y] == 1){
					drawBlock(x, y, new createjs.Bitmap("img/block_red.png"));
				}
			}
		}

		//console.log(container);
	} 

	scope.drawMovingBlock = function( figure_current ){

		var id = 0;
		var _current_phase = figure_current.form[figure_current.phase];

		for (var i = 0; i < _current_phase.length; i++){
			for (var j = 0; j < _current_phase[i].length; j++){
				if (_current_phase[i][j] == 1)
				{
					//console.log(ASSET_MANAGER.getAsset(i*j).id);
					drawBlock(figure_current.x + i, figure_current.y + j, ASSET_MANAGER.getAsset(id).img);
					id++;
				}
			}
		}
	}

	scope.drawNextBlock = function( next_figure_form ){

		for (var i = 0; i < next_figure_form.length; i++){
			for (var j = 0; j < next_figure_form[i].length; j++){
				if (next_figure_form[i][j] == 1)
				{
					bitmap = new createjs.Bitmap("img/block_yellow.png");
					score_stage.addChild(score_container);
					score_container.addChild(bitmap);
					bitmap.x = block_w * i;
					bitmap.y = block_h * j;
					bitmap.scaleX = block_w/height/2;
					bitmap.scaleY = block_h/height/2;
				}
			}
		}
	}
	return scope;
}