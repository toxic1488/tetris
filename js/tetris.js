function Tetris(){

	var scope = this;

	var pressed_keys = {};
	scope.glass = [];
	var state = "inactive";
	var is_paused = false;
	scope.figure_current = {};
	var fall_delta = 700;
	var score = 0;
	var figures = {};
	var current_x, current_y;

	scope.GLASS_WIDTH = 10;
	scope.GLASS_HEIGHT = 20;


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
			scope.glass[i] = [];
			for (var j = 0; j < scope.GLASS_HEIGHT; j++) {
				scope.glass[i][j] = 0;
			}
		}
		//console.log(scope.glass);

		//reset visual

		//listeners buttons
		window.addEventListener("keydown", onKeyDown);
		window.addEventListener("keyup", onKeyUp);
		createFigure();
		console.log(scope.figure_current.form);
		//figureToGlass();
		dropFigure();
		dropFigure();
		// dropFigure();
		// dropFigure();
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
		scope.figure_current = {
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

		//var is_possible = true;
		while(true){

			var _current = scope.figure_current;
			var _form = _current.form[_current.phase];
			for (var i = 0; i < _form.length; i++){
				for (var j = 0; j < _form[i].length; j++){
					if (_form[i][j] == 1)
					{
						if(scope.glass[i + _current.x][j + _current.y + 1] != 0){
							figureToGlass();
							console.log(scope.glass);
							return;
						}
					}
				}
			}

			scope.figure_current.y++;	
		}

	}

	function figureToGlass(){

		var _current = scope.figure_current;
		var _form = _current.form[_current.phase];

		for (var i = 0; i < _form.length; i++){

			for (var j = 0; j < _form[i].length; j++){
				if (_form[i][j])
				{
					scope.glass[i + _current.x][j + _current.y] = parseInt(_form[i][j])||scope.glass[i + _current.x][j + _current.y];
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