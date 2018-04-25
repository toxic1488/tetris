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
	var time;

	var GLASS_WIDTH = 10;//columns
	var GLASS_HEIGHT = 20;//rows


	//VISUAL
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.height = 400;
	canvas.width = 200;
	var block_w = canvas.width / GLASS_WIDTH;
	var block_h = canvas.height / GLASS_HEIGHT;

	function drawBlock( x, y){
		ctx.fillRect(block_w * x, block_h * y, block_w - 1, block_h - 1);
		ctx.strokeRect(block_w * x, block_h * y, block_w - 1, block_h - 1);
	}

	function drawBoard(){

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = 'black';

		for (var x = 0; x < GLASS_WIDTH; ++x) {
			for (var y = 0; y < GLASS_HEIGHT; ++y) {
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
		//figure_current.y++;

	}









	scope.bindButtons = function( buttons_to_bind ){

		for (var button in buttons_to_bind){
			pressed_keys[button] = {
				code: buttons_to_bind[button],
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
		//reset score
		score = 0;
		//reset glass
		for (var i = 0; i < GLASS_WIDTH; i++) {
			glass[i] = [];
			for (var j = 0; j < GLASS_HEIGHT; j++) {
				glass[i][j] = 0;
			}
		}

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
		//dropFigure();
		// dropFigure();
		// dropFigure();
		//moveFigure(); 

		//game cicle start
		setInterval( gameStep, 40);
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

	// scope.isActionActive = function( action ){

	// 	for (var code in pressed_keys) {
	// 		if (pressed_keys[code].pressed && pressed_keys[code].action == action){
	// 			return true;
	// 		}
	// 	}
	// 	return false;
	// }


	function gameStep(){


		if (!pressed_keys["right"].pressed || !pressed_keys["left"].pressed){
			if (pressed_keys["left"].pressed){
				moveFigure(-1, 0);
			}
			if (pressed_keys["right"].pressed){
				moveFigure(1, 0);
			}
		}

		if (pressed_keys["rotate"].pressed){
			moveFigure(0, 0, 1);
			pressed_keys["rotate"].pressed = false;
		}

		if (pressed_keys["speed-up"].pressed){
			fall_delta /= 2;
			pressed_keys["speed-up"].pressed = false;
		}

		if (pressed_keys["instant"].pressed) {
			dropFigure();
			pressed_keys["instant"].pressed = false;
		}
		
		if ((new Date().getTime() - time) > fall_delta) {

			time = new Date().getTime();
			var current_y = figure_current.y;
			moveFigure(0, 1);
			if (current_y == figure_current.y) {
				figureToGlass();
			}
			
		}

		drawBoard();
		drawMovingBlock();
	}

	function onKeyDown( event ){
		for (var key in pressed_keys){

			if (event.keyCode == pressed_keys[key].code){
				pressed_keys[key].pressed = true;

				var key_event = new CustomEvent("onkeydown", {
					detail: {
						action: pressed_keys[key]
						}
					});

				window.dispatchEvent( key_event );
			}
		}
	}

	function onKeyUp( event ){
		for (var key in pressed_keys){

			if (event.keyCode == pressed_keys[key].code){
				pressed_keys[key].pressed = false;

				var key_event = new CustomEvent("onkeyup", {
					detail: {
						action: pressed_keys[key]
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
			x : Math.floor(GLASS_WIDTH / 2) - 1,
			y : 0,
			//phase
			phase : 1
		}
		//delata
		time = new Date().getTime();

	}

	function moveFigure( x, y, phase ){
		
		if (phase !== undefined) figure_current.phase = (figure_current.phase + 3) % 4;

		var _form = figure_current.form[figure_current.phase];
		for (var i = 0; i < _form.length; i++){

			for (var j = 0; j < _form[i].length; j++){

				if((i + figure_current.x + x < 0) || (i + figure_current.x + x > GLASS_WIDTH - 1) || (j + figure_current.y +y > GLASS_HEIGHT - 1)) {
					return false;
				}

				if (_form[i][j] == 1){
					if((glass[i + figure_current.x + x][j + figure_current.y + y] == 1)){
						return false;
					}
				}
			}
		}
		figure_current.x += x;
		figure_current.y += y;
		return true;

	}

	function dropFigure(){

		while(true){

			var current_y = figure_current.y;
			moveFigure(0, 1);
			if (current_y == figure_current.y) {
				figureToGlass();
				return;
			}
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

		for (var y = GLASS_HEIGHT - 1; y >= 0; y--) {

			var check = true;
			for (var x = GLASS_WIDTH - 1; x >= 0; x--) {
				if (glass[x][y] == 0) {
					check = false;
					break;
				}
			}

			if (check) {

				for (var yy = y; yy > 0; yy--) {
					for (var x = 0; x < GLASS_WIDTH - 1; x++) {
						glass[x][yy] = glass[x][yy - 1];		
					}
				}
				score++;
				console.log("score: ", score);
				y++;
			}
		}
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