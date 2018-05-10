function AssetManager() {

	// this.successCount = 0;
	// this.errorCount = 0;
	this.cache = {};
	this.downloadQueue = [];
}

AssetManager.prototype.queueDownload = function(path) {

	this.downloadQueue.push(path);
	//var that = this;
	for (var i = 0; i < 5; i++) {
		this.cache[i] = {
			path: path,
			img: new createjs.Bitmap(path)
		}
	}
}

AssetManager.prototype.getAsset = function(id) {
	return this.cache[id];
}

// AssetManager.prototype.downloadAll = function() {

// 	// if (this.downloadQueue.length === 0) {
// 	// 	downloadCallback();
// 	// }

// 	for (var i = 0; i < this.downloadQueue.length; i++) {

// 		var path = this.downloadQueue[i];
// 		var img = new createjs.Bitmap(path);
// 		var that = this;
// 		// //success load listener
// 		// img.addEventListener("load", function() {
// 		// 	that.successCount += 1;
// 		// 	if (that.isDone()) {
// 		// 		downloadCallback();
// 		// 	}
// 		// }, false);
// 		// //error listener
// 		// img.addEventListener("error", function() {
// 		// 	that.errorCount += 1;
// 		// 	if (that.isDone()) {
// 		// 		downloadCallback();
// 		// 	}
// 		// }, false);

// 		//img.src = path;
// 		this.cache[path] = img;
// 	return img;
// 	}
// }

// AssetManager.prototype.isDone = function() {
// 	return (this.downloadQueue.length == this.successCount + this.errorCount);
// }