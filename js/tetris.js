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

		for (var figure in figures_to_bind){

			var _figure = figures_to_bind[figure];
			var _forms = _figure.form.split(';');
			for (var i = 0; i < _forms.length; i++) {
				_forms[i] = _forms[i].split(',');
			}
			
			var array_of_figures = [_forms];

			for (var i = 1; i < 4; i++) {
				array_of_figures.push(transpose(array_of_figures[i - 1]))
			}

			figures[figure] = {
				form: array_of_figures
			};
		}
		console.log("binded figures", figures);
	}

	scope.startGame = function(){

		state = "playing";
		score = 0;
		//reset glass
		for (var i = 0; i < scope.GLASS_HEIGHT; i++) {
			scope.glass[i] = [];
			for (var j = 0; j < scope.GLASS_WIDTH; j++) {
				scope.glass[i][j] = 0;
			}
		}
		console.log(scope.glass);

		//reset visual

		//listeners buttons
		window.addEventListener("keydown", onKeyDown);
		window.addEventListener("keyup", onKeyUp);
		createFigure();
		console.log(scope.figure_current.form[0]);
		figureToGlass();
		createFigure();
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
			form : figures[keys[Math.floor( Math.random() * keys.length)]].form,
			//set start coordinates
			current_x : Math.floor(scope.GLASS_WIDTH / 2),
			current_y : 0,
			//phase
			phase : 0
		}
		//delata for

	}

	function moveFigure( x, y, phase ){
			
	}

	function dropFigure(){
		
	}

	function figureToGlass(){

		var _current = scope.figure_current.form[scope.figure_current.phase]
		for (var i = 0; i < _current.length; i++){
			for (var j = 0; j < _current[i].length; j++){
				if (_current[i][j])
				{
					scope.glass[i + scope.figure_current.current_y][j + scope.figure_current.current_x] = scope.figure_current.form[0][i][j];
				}
			}
		}
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