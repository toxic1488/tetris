function AssetManager() {

	// this.successCount = 0;
	// this.errorCount = 0;
	this.cache = {};
	//this.download = [];
}

AssetManager.prototype.queueDownload = function(path, quantity) {

	//this.download.push(path);
	//var that = this;
	length = Object.keys(this.cache).length;
	this.cache[length]={};
	for (var i = 0; i < quantity; i++) {
		this.cache[length][i] = {
			path: path,
			img: new createjs.Bitmap(path)
		}
	}
}

AssetManager.prototype.getAsset = function(id, number) {
	return this.cache[id][number].img;
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