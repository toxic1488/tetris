function Tetris(){

	var scope = this;

	var pressed_keys;
	var glass;
	var state = "inactive";
	var is_paused = false;
	var figure_current;
	var fall_delta = 700;
	var score = 0;
	var figures = {};

	scope.GLASS_WIDTH = 10;
	scope.GLASS_HEIGHT = 20;

	scope.bindFigures = function( figures_to_bind ){

		for (var figure in figures_to_bind){

			var _figure = figures_to_bind[figure];
			var _forms = _figure.form.split(';');
			for (var i = 0; i < _forms.length; i++) {
				_forms[i] = _forms[i].split(',');
			}
			
			//console.log(_forms);
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
		for (var i = 0; i < GLASS_HEIGHT - 1; i++) {
			for (var j = 0; j < GLASS_HEIGHT - 1; j++) {
				glass[i][j] = 0;
			}
		}

		//reset visual

		//listeners buttons

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

	function onKeyDown( event ){

	}

	function onKeyUp( event ){

	}

	function createFigure(){

	}

	function transpose( matrix){

		var copy = [];
		for (var i = 0; i < matrix.length; ++i) {
			for (var j = 0; j < matrix[i].length; ++j) {
				// skip undefined values to preserve sparse array
				//if (matrix[i][j] === undefined) continue;
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