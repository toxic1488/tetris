function Tetris( params ){

	var scope = this;

	var render_class = params.renderer;
	var GLASS_WIDTH = params.glass_width || 10;//columns
	var GLASS_HEIGHT = params.glass_height || 20;//rows
	var BASIC_FALL_DELTA = params.fall_delta || 700;
	var figures_to_bind = params.figures;

	var glass = [];
	var is_paused = false;
	var figure_current;
	var next_figure_form;//for preview
	var fall_delta = BASIC_FALL_DELTA;
	var current_fall_delta;
	var score = 0;
	var figures = {};
	var time;
	var game_loop;

	const STATE = {
		INACTIVE: 'inactive',
		PLAYING: 'playing',
		GAMEOVER: 'gameover'
	}
	var state;

	function setState( value ){
		state = value;
	}

	function stateInactive(){

		setState(STATE.INACTIVE);
	}

	function statePlaying(){

		setState(STATE.PLAYING);
		scope.startGame();
	}

	function stateGameOver(){

		setState(STATE.GAMEOVER);
		clearInterval(game_loop);
		//controller.detach();
	}



/*
 ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  ██████╗ 
██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔═══██╗
██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║   ██║
██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║   ██║
╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╔╝
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ 
                                                     
██╗     ██╗     ███████╗██████╗                      
██║     ██║     ██╔════╝██╔══██╗                     
██║     ██║     █████╗  ██████╔╝                     
██║     ██║     ██╔══╝  ██╔══██╗                     
███████╗███████╗███████╗██║  ██║                     
╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝                                         
*/	

	var controller = new Controller();

	controller.bindActions (
		params.bind_actions ||
		{
			"left":{
				keys: [37, 65],
				gestures: ["swipe_left", "mouse_swipe_left"]
			},
			"instant":{
				keys: [32],
				gestures: ["tap", "click"]
			},
			"right":{
				keys: [39, 68],
				gestures: ["swipe_right", "mouse_swipe_right"]
				//enabled: false
			},
			"rotate":{
				keys: [38, 87],
				gestures: ["swipe_up", "mouse_swipe_up"]
			},
			"speed-up":{
				keys: [40, 83],
				gestures: ["swipe_down", "mouse_swipe_down"]
			}
		}
	);

	controller.attach(window);
	controller.setEnabled({
		keyboard: true,
		mouse: !true,
		touch: true
	});

/*
██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗ ██╗███╗   ██╗ ██████╗ 
██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗██║████╗  ██║██╔════╝ 
██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝██║██╔██╗ ██║██║  ███╗
██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗██║██║╚██╗██║██║   ██║
██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║██║██║ ╚████║╚██████╔╝
╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
*/
	var render = new render_class( GLASS_WIDTH, GLASS_HEIGHT);

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

			if(!figures[i]) {
				figures[i] = array_of_figures;
			}else{
				figures[Object.keys(figures).length] = array_of_figures;
			}
		}
		console.log("binded figures", figures);
	}


	function resetGlass(){
		
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
		render.drawClearBoard();
		render.drawClearBoard();
	}
	var square = document.createElement('div');
	window.onload = function(){


		//SQUARE FOR SCORE
		square.style.display = 'none';
		square.style.background = 'white';
		square.style.borderRadius = '20px';
		// square.style.borderColor = "red";
		// square.style.borderWidth = "thick";
		square.style.position = 'absolute';
		square.style.left = '60px';
		square.style.top = '200px';
		square.style.width = '100px';
		square.style.height = '50px';
		//canvas for board settingt
		render.helpcanvas.style.position = 'absolute';
		render.helpcanvas.style.left = 0;
		//score canvas settings
		render.score_canvas.style.position = 'absolute';
		render.score_canvas.style.left = render.canvas.width*1.2 + 'px';
		render.score_canvas.style.top = render.canvas.height/3 + 'px';
		//append all
		document.body.appendChild(render.canvas);
		document.body.appendChild(render.helpcanvas);
		document.body.appendChild(render.score_canvas);
		document.body.appendChild(square);
		document.getElementById("pause").onclick = function(){
			scope.setPaused(is_paused);
			console.log("pause:", is_paused);
		}
		document.getElementById("start").onclick = function(){
			square.style.display = 'none';
			console.log("started");
			//controller.attach(window);
			scope.setPaused(true);
			score = 0;
			fall_delta = BASIC_FALL_DELTA;
			resetGlass();
			clearInterval(game_loop);
			statePlaying();
			//createFigure();
			visualScore();
		}
		visualScore();
	}

	scope.startGame = function(){

		scope.bindFigures(figures_to_bind);
		resetGlass();
		createFigure();

		//listeners buttons
		window.addEventListener( controller.ACTION_ACTIVATED, onActionActivated );
		//window.addEventListener( controller.ACTION_DEACTIVATED, onActionDeActivated );

		//game cicle start
		game_loop = setInterval( gameStep, 40);
	}

	function onActionActivated(e) {

		switch ( e.detail.action ){
			case "rotate":
				moveFigure(0, 0, 1);
				break;
			case "speed-up":
				current_fall_delta = current_fall_delta / 2;
				break;
			case "instant":
				dropFigure();
				break;
		}

		if ( e.detail.devicetype === "swipeble" ){
			switch ( e.detail.action ){
				case "left":
					moveFigure(-1, 0);
					break;
				case "right":
					moveFigure(1, 0);
					break;
			}
		}

	}
	// function onActionDeActivated(e) {

	// }


	scope.setPaused = function( _paused ){
		is_paused = (!_paused ? true : false);
	}

	scope.isPaused = function(){
		return is_paused;
	}

	scope.getScore = function(){
		return score;
	}

	function gameStep(){

		if (!controller.isActionActive("right") || !controller.isActionActive("left")){
			if (controller.isActionActive("right")){
				moveFigure(1, 0);
			}
			if (controller.isActionActive("left")){
				moveFigure(-1, 0);
			}
		}
		
		//AUTO FALL
		if (((Date.now() - time) > current_fall_delta) && !scope.isPaused()){

			time = Date.now();
			if (!moveFigure(0,1)) {
				figureToGlass();
			}

		}

		//VISUAL
		render.drawBoard( glass );
		render.drawMovingBlock( figure_current );
		render.drawNextBlock(next_figure_form[1]);
	}

	function createFigure(){

		current_fall_delta = fall_delta;

		var keys = Object.keys(figures);
		//Choose random figure
		figure_current = {
			form : next_figure_form || figures[keys[Math.floor( Math.random() * keys.length)]],
			//set start coordinates
			x : Math.floor(GLASS_WIDTH / 2) - 1,
			y : -1 ,
			//phase
			phase : 1
		}
		//delata
		time = Date.now();
  
		if ( !moveFigure(0, 0) ){
			gameOver();
		}

		next_figure_form = figures[keys[Math.floor( Math.random() * keys.length)]];
		console.log("next:", next_figure_form[2]);

	}
 
	function moveFigure( x, y, phase ){
		
		var length = figure_current.form.length
		var _form = figure_current.form[figure_current.phase];
		if(!scope.isPaused()){
			if (phase !== undefined) _form = figure_current.form[(figure_current.phase + length - 1) % length];

			for (var i = 0; i < _form.length; i++){

				for (var j = 0; j < _form[i].length; j++){

					if((i + figure_current.x + x < 0) || (i + figure_current.x + x > GLASS_WIDTH - 1) || (j + figure_current.y +y > GLASS_HEIGHT - 1)) {
						return false;
					}

					if (parseInt(_form[i][j]) + glass[i + figure_current.x + x][j + figure_current.y + y] > 1 ){
						return false;
					}
				}
			}
			if (phase !== undefined) figure_current.phase = (figure_current.phase + length - 1) % length;
			figure_current.x += x;
			figure_current.y += y;
			return true;
		}else return false;

	}

	function dropFigure(){

		if(!scope.isPaused()){
			while(true){

				if (!moveFigure(0, 1)) {
					figureToGlass();
					return;
				}
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
				visualScore();
				fall_delta -= 25;
				console.log("fall_delta :", fall_delta);
				y++;
			}
		}
	}

	function gameOver(){

		stateGameOver();
		square.style.display = 'block';
		square.innerHTML = "Game Over\n Score: " + scope.getScore().toString();
		window.removeEventListener( controller.ACTION_ACTIVATED, onActionActivated );

	}

	function visualScore(){

		document.getElementById("score").innerHTML = "Score: " + scope.getScore().toString();
	}
	//function to get rotate figure form
	function transpose( matrix ){

		var copy = [];

		for (var i = 0; i < matrix.length; ++i) {
			for (var j = 0; j < matrix[i].length; ++j) {
				// create row if it doesn't exist yet
				if ( !copy[j] ) copy[j] = [];
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