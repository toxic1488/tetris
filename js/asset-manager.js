
function AssetManager(){

	var scope = this;
	var assets = {};

	scope.addAsset = function( asset_id, createAsset, count ){

		var asset_object = assets[asset_id] = {
			asset_id: asset_id,
			assets: [],
			createAsset: createAsset
		};
		
		count = count || 1;
		for (var i = 0; i < count; i++) {
			asset_object.assets.push( _createAsset( asset_object ) );
		}
		console.log(asset_object, asset_object.assets);
	}

	scope.pullAsset = function( asset_id ){
		
		var asset_object = assets[asset_id];
		//console.log(asset_object);
		if( !asset_object ) {
			console.warn("there's no such asset: ", asset_id );
			return;
		}

		var asset = asset_object.assets.pop();

		if(asset_object.asset_id == "red_square") console.log(asset_object.assets.length);
		if( asset ) return asset;
		else{
			return _createAsset( asset_object );
		}
	}

	scope.putAsset = function( asset ){

		var asset_object = assets[asset._asset_id_];
		if( !asset_object ) {
			console.warn("there's no such asset: ", asset_id );
			return;
		}

		asset_object.assets.push( asset );
	}

	// PRIVATE
	function _createAsset( asset_object ){
		var asset = asset_object.createAsset();
		asset._asset_id_ = asset_object.asset_id;
		return asset;
		//console.log(asset);

	}

	//
	return scope;

}




// ---------------------------
// USAGE
// ---------------------------

// var asset_manager = new AssetManager();

// asset_manager.addAsset(
// 	'red_square',
// 	function(){
// 		// return new createjs.Bitmap('red.png');
// 		return {name:"red"};
// 	},
// 	10
// );

// var red_sprite = asset_manager.pullAsset( 'red_square' );

// asset_manager.putAsset( red_sprite );
