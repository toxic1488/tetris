var tetris = new Tetris();

tetris.bindFigures(
	{
		"s":{
			form: "1,1,0;0,1,1"
		},
		"z":{
			form: "0,1,1;1,1,0"
		},
		"l":{
			form: "1,0;1,0;1,1"
		},
		"j":{
			form: "0,1;0,1;1,1"
		},
		"i":{
			form: "1;1;1;1"
		},
		"o":{
			form:"1,1;1,1"
		}
	}
);


window.onload = function(){

	// function initRect( id, height, width){
	// 	var rect = document.createElement('canvas');
	// 	rect.id = id;
	// 	rect.height = height;
	// 	rect.width = width;
	// 	rect.style = "border:1px solid #000000;";
	// 	document.body.appendChild(rect);
	// }

	// for (var i = 0; i < (tetris.GLASS_HEIGHT - 1)*(tetris.GLASS_HEIGHT - 1); i++) {
	// 	initRect(i, 10, 10);
	// }

	// function grid(width, height, span) {
	// 	var cnv = document.createElement("canvas");
	// 	cnv.width = width;
	// 	cnv.height = height;
	// 	var ctx = cnv.getContext("2d");
	// 	ctx.strokeStyle = "red";
	// 	var w = cnv.width - 1;
	// 	var h = cnv.height - 1;
	// 	for (var x = -0.5; x < w; x += span) ctx.strokeRect(x, 0, 0.1, h);
	// 		for (var y = -0.5; y < h; y += span) ctx.strokeRect(0, y, w, 0.1);
	// 			return cnv.toDataURL();
	// }

	// grid(100,100, 10);
}

setInterval( gameStep, 40);
function gameStep(){

}