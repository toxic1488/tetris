function CreateJSRenderer(width, height, block_width, target){	

	var scope = this;

	var glass_width = width*block_width;
	var glass_height = height*block_width;
	var block_w = glass_width / width;
	var block_h = glass_height / height;

	//second canvas for board
	var helpcanvas = document.createElement('canvas');
	var helpctx = helpcanvas.getContext('2d');
	helpcanvas.width = glass_width;
	helpcanvas.height = glass_height;

	//
	var canvas = document.createElement('canvas');
	canvas.width = glass_width;
	canvas.height = glass_height;
	
	//canvas for next figure preview
	var score_canvas = document.createElement('canvas');
	score_canvas.height = height*5;
	score_canvas.width = width*10;
	var score_stage = new createjs.Stage(score_canvas);
	var score_container = new createjs.Container();
	score_stage.autoClear = false;

	var stage = new createjs.Stage(canvas);
	var glass_container = new createjs.Container();
	var current_container = new createjs.Container();
	stage.autoClear = false;

	var asset_manager = new AssetManager();
	//id = 0
	asset_manager.addAsset(
		'blue_square',
		function(){
			return new createjs.Bitmap('img/block_blue.png');
		},
		5
	);

	asset_manager.addAsset(
		'red_square',
		function(){
			return new createjs.Bitmap('img/block_red.png');
		},
		10
	);
	asset_manager.addAsset(
		'yellow_square',
		function(){
			return new createjs.Bitmap('img/block_yellow.png');
		},
		5
	);
	//console.log(blue_sprite);

	function drawBlock( x, y, bitmap, stage, container){

		stage.addChild(container);
		container.addChild(bitmap);
		// console.log(bitmap.image);
		bitmap.x = block_w * x;
		bitmap.y = block_h * y;
		bitmap.scaleX = block_w/width/4;
		bitmap.scaleY = block_h/height/2;
	}

	scope.drawClearBoard = function(){

		helpctx.strokeStyle = 'green';
		helpctx.lineWidth = 5;
		for (var x = 0; x < width; ++x) {
			for (var y = 0; y < height; ++y) {
				helpctx.strokeRect(block_w * x, block_h * y, block_w, block_h);
			}
		}
	}

	scope.drawBoard = function( glass ){

		//clear canvas
		stage.clear();
		stage.update();
		glass_container.removeAllChildren();
		current_container.removeAllChildren();

		//clear score_canvas

		var red_sprite = [];
		var number = 0;
		for (var x = 0; x < width; ++x) {
			for (var y = 0; y < height; ++y) {
				if(glass[x][y] == 1){
					red_sprite[number] = asset_manager.pullAsset( 'red_square' );
					drawBlock(x, y, red_sprite[number], stage, glass_container);
					number++;
					// + Math.floor(Math.random()*2
				}
			}
		}
		// console.log(red_sprite, number);
		for (var i = number - 1; i >= 0; i--) {
			asset_manager.putAsset(red_sprite[i]);
		}

	} 

	scope.drawMovingBlock = function( figure_current ){

		var _current_phase = figure_current.form[figure_current.phase];

		// length = Object.keys(ASSET_MANAGER.cache).length
		// id = 1 + Math.floor(Math.random() * (length - 1));
		var blue_sprite = [];
		var number = 0;
		for (var i = 0; i < _current_phase.length; i++){
			for (var j = 0; j < _current_phase[i].length; j++){
				if (_current_phase[i][j] == 1)
				{
					blue_sprite[number] = asset_manager.pullAsset( 'blue_square' );
					// console.log(blue_sprite[number]._asset_id_);
					drawBlock(figure_current.x + i, figure_current.y + j, blue_sprite[number], stage, current_container);
					number++;
				}
			}
		}
		for (var i = number - 1; i >= 0; i--) {
			asset_manager.putAsset(blue_sprite[i]);
		}
	}

	scope.drawNextBlock = function( next_figure_form ){

		score_stage.clear();
		score_stage.update();
		score_container.removeAllChildren();
		var yellow_sprite = [];
		var number = 0;

		// length = Object.keys(ASSET_MANAGER.cache).length
		// id = 1 + Math.floor(Math.random() * (length - 1));

		for (var i = 0; i < next_figure_form.length; i++){
			for (var j = 0; j < next_figure_form[i].length; j++){
				if (next_figure_form[i][j] == 1)
				{
					yellow_sprite[number] = asset_manager.pullAsset( 'yellow_square' );
					drawBlock(i, j, yellow_sprite[number], score_stage, score_container);
					number++;
				}
			}
		}
		for (var i = number - 1; i >= 0; i--) {
			asset_manager.putAsset(yellow_sprite[i]);
		}
	}

	//ONLOAD VISUAL
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