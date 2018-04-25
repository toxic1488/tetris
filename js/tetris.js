function Tetris(){

	var scope = this;

	var pressed_keys = {};
	var glass = [];
	var state = "inactive";
	var is_paused = false;
	var figure_current = {};
	var fall_delta = 700;
	var score = 0;
	var figures = {};
	var current_x, current_y;

	scope.GLASS_WIDTH = 10;//columns
	scope.GLASS_HEIGHT = 20;//rows


	//VISUAL
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.height = 400;
	canvas.width = 200;
	var block_w = canvas.width / scope.GLASS_WIDTH;
	var block_h = canvas.height / scope.GLASS_HEIGHT;

	function drawBlock( x, y){
		ctx.fillRect(block_w * x, block_h * y, block_w - 1, block_h - 1);
		ctx.strokeRect(block_w * x, block_h * y, block_w - 1, block_h - 1);
	}

	function drawBoard(){

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = 'black';

		for (var x = 0; x < scope.GLASS_WIDTH; ++x) {
			for (var y = 0; y < scope.GLASS_HEIGHT; ++y) {
				//console.log(tetris.glass[y][x]);
				if (glass[x][y] == 0){
					ctx.fillStyle = 'white';
					drawBlock(x, y);
				}
				if(glass[x][y] == 1){
					ctx.fillStyle = 'gray';
					drawBlock(x, y);
				}
			}
		}

	}

	function drawMovingBlock(){
			for (var i = 0; i < figure_current.form[figure_current.phase].length; i++){
				for (var j = 0; j < figure_current.form[figure_current.phase][i].length; j++){
					if (figure_current.form[figure_current.phase][i][j] == 1)
					{
						ctx.fillStyle = 'blue';
						drawBlock(figure_current.x + i, figure_current.y + j);
					}
				}
			}
		//tetris.figure_current.y++;

	}









	scope.bindButtons = function( buttons_to_bind ){

		for (var button in buttons_to_bind){
			pressed_keys[button] = {
				action: buttons_to_bind[button],
				pressed: false
			};
		}
		console.log("binded buttons", pressed_keys);

	}

	scope.bindFigures = function( figures_to_bind ){

		for (var i = 0; i < figures_to_bind.length; i++){

			var _forms =  figures_to_bind[i].split(';');
			for (var j = 0; j < _forms.length; j++) {
				_forms[j] = _forms[j].split(',');
			}
			
			var array_of_figures = [_forms];

			for (var j = 1; j < 4; j++) {
				array_of_figures.push(transpose(array_of_figures[j - 1]))
			}

			figures[i] = array_of_figures;
		}
		console.log("binded figures", figures);
	}

	scope.startGame = function(){

		state = "playing";
		score = 0;
		//reset glass
		for (var i = 0; i < scope.GLASS_WIDTH; i++) {
			glass[i] = [];
			for (var j = 0; j < scope.GLASS_HEIGHT; j++) {
				glass[i][j] = 0;
			}
		}
		//console.log(scope.glass);

		//reset visual
		window.onload = function(){
			document.body.appendChild(canvas);
			drawBoard();
		}
		//listeners buttons
		window.addEventListener("keydown", onKeyDown);
		window.addEventListener("keyup", onKeyUp);
		createFigure();
		console.log(figure_current.form);
		//figureToGlass();
		dropFigure();
		dropFigure();
		dropFigure();
		dropFigure();
		// dropFigure();
		// dropFigure();
		// dropFigure();
		//createFigure();
		//moveFigure();
		//game cicle start
	}

	scope.setPaused = function( _paused ){
		is_paused = (!_paused ? true : false);
	}

	scope.isPaused = function(){
		return is_paused;
	}

	scope.getScore = function(){
		return score;
	}

	scope.isActionActive = function( action ){

		for (var code in pressed_keys) {
			if (pressed_keys[code].pressed && pressed_keys[code].action == action){
				return true;
			}
		}
		return false;
	}

	function onKeyDown( event ){
		for (var code in pressed_keys){

			if (event.keyCode == code){
				pressed_keys[code].pressed = true;

				var key_event = new CustomEvent("onkeydown", {
					detail: {
						action: pressed_keys[code].action
						}
					});

				window.dispatchEvent( key_event );
			}
		}
	}

	function onKeyUp( event ){
		for (var code in pressed_keys){

			if (event.keyCode == code){
				pressed_keys[code].pressed = false;

				var key_event = new CustomEvent("onkeyup", {
					detail: {
						action: pressed_keys[code].action
						}
					});

				window.dispatchEvent( key_event );
			}
		}
	}

	function createFigure(){

		var keys = Object.keys(figures);
		//Choose random figure
		figure_current = {
			form : figures[keys[Math.floor( Math.random() * keys.length)]],
			//set start coordinates
			x : Math.floor(scope.GLASS_WIDTH / 2) - 1,
			y : 0,
			//phase
			phase : 0
		}
		//delata for

	}

	function moveFigure( x, y, phase ){
			
	}

	function dropFigure(){

		while(true){

			var _form = figure_current.form[figure_current.phase];
			for (var i = 0; i < _form.length; i++){
				for (var j = 0; j < _form[i].length; j++){
					if (_form[i][j] == 1)
					{
						if(glass[i + figure_current.x][j + figure_current.y + 1] != 0){
							figureToGlass();
							console.log(glass);
							return;
						}
					}
				}
			}

			figure_current.y++;	
		}

	}

	function figureToGlass(){

		var _form = figure_current.form[figure_current.phase];

		for (var i = 0; i < _form.length; i++){

			for (var j = 0; j < _form[i].length; j++){
				if (_form[i][j])
				{
					glass[i + figure_current.x][j + figure_current.y] = parseInt(_form[i][j])||glass[i + figure_current.x][j + figure_current.y];
				}
			}
		}
		checkFilledRows();
		createFigure();
	}

	function checkFilledRows(){

	}

	function gameOver(){

	}

	function transpose( matrix ){

		var copy = [];
		for (var i = 0; i < matrix.length; ++i) {
			for (var j = 0; j < matrix[i].length; ++j) {
				// create row if it doesn't exist yet
				if (copy[j] === undefined) copy[j] = [];
				// swap the x and y coords for the copy
				copy[j][i] = matrix[i][j];
			}
		}
		for (var i = 0; i < copy.length; ++i) {
				copy[i] = copy[i].reverse();
		}
		return copy;
	}
	return scope;
}