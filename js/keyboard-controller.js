function Controller(){

	var scope = this;

	var focused = false;
	var target_element;
	var actions = {};
	var enabledDevices;


	scope.ACTION_ACTIVATED = "controls:action-activated";
	scope.ACTION_DEACTIVATED = "controls:action-deactivated";


	scope.bindActions = function( actions_to_bind ){
		
		for ( var action in actions_to_bind){
			var _action = actions_to_bind[action];
			var _keys = {};
			for (var i = 0; i < _action.keys.length; i++) {
				_keys[i] = {
					key: _action.keys[i],
					pressed: false
					}
			}
			actions[action] = {
				keys: _keys,
				gestures: _action.gestures !== undefined ? _action.gestures : [],
				enabled: _action.enabled !== undefined ? _action.enabled : true,
				is_active: false
			};
		}
		console.log("binded actions", actions);

	}

	scope.enableAction = function( action_name ){
		if( actions[action_name]!= null ) {
			actions[action_name].enabled = true;
			//actions[action_name].is_active = true;
		}
	}

	scope.disableAction = function( action_name ){
		if( actions[action_name]!= null ) {
			actions[action_name].enabled = false;
			actions[action_name].is_active = false;
		}
	}

	scope.attach = function( target, dont_enable ){
		console.log("attach");
		scope.detach();
		target_element = target;
		target_element.addEventListener("keydown", keyDown);
		target_element.addEventListener("keyup", keyUp);
		target_element.addEventListener("touchstart", handleTouchStart);
		target_element.addEventListener("touchend", handleTouchStop);
		target_element.addEventListener("mousedown", mouseTouchStart);
		target_element.addEventListener("mouseup", mouseTouchStop);

	}

	scope.detach = function(){
		
		if( target_element!= null) {

			console.log("detach");
			target_element.removeEventListener("keydown", keyDown);
			target_element.removeEventListener("keyup", keyUp);
			target_element.removeEventListener("touchstart", handleTouchStart);
			target_element.removeEventListener("touchend", handleTouchStop);
			target_element.removeEventListener("mousedown", mouseTouchStart);
			target_element.removeEventListener("mouseup", mouseTouchStop);
			target_element = null;
		} else {

			console.log("nothing to detach");

		}

	}

	scope.isActionActive = function( action ){
		var _action = actions[action];
		if( !_action ) return;	
		return _action.is_active;
	}

	scope.isKeyPressed = function( keyCode ){

		for ( var action in actions){

			var _keys = actions[action].keys;

			for (var i in _keys) {
				if( _keys[i].key == keyCode && _keys[i].pressed) return true;
			}
		}

		return false;

	}

	scope.setEnabled = function( enables_to_set ){
		enabledDevices = {
			keyboard: enables_to_set.keyboard !== undefined ? enables_to_set.keyboard : true,
			mouse: enables_to_set.mouse !== undefined ? enables_to_set.mouse : true,
			touch: enables_to_set.touch !== undefined ? enables_to_set.touch : true
		}
	}

	function keyDown( event ){
		keyEvent(scope.ACTION_ACTIVATED, true);
	}

	function keyUp( event ){
		keyEvent(scope.ACTION_DEACTIVATED, false);
	}

	function keyEvent( event_name, check ){

		for ( var action in actions){

			var _action = actions[action];
			var _keys = _action.keys;

			for (var i in _keys) {

				if( _keys[i].key == event.keyCode && (check ? !_action.is_active : _action.is_active) ) {

					_keys[i].pressed = check;

					if( _action.enabled && enabledDevices.keyboard){

						_action.is_active = check;
						createCustomEvent( event_name, action, "keyboard");
					}

				}
			}
		}
	}

	var xDown = null;
	var yDown = null;
	var gesture;
	var latest_tap;
	var is_double_tap = false;

	//TOUCH
	function handleTouchStart( event ) {
		event.preventDefault();
		//console.log("touchstart");
		swipeStart( event.touches[0]);
	}

	function handleTouchStop( event ) {
		event.preventDefault();
		swipeStop( event.changedTouches[0], enabledDevices.touch, ["swipe_left", "swipe_right", "swipe_up", "swipe_down", "tap"]);

	}

	//MOUSE
	function mouseTouchStart( event ) {
		//console.log("mouseTouchStart");
		swipeStart( event );
	}

	function mouseTouchStop( event ) {
		swipeStop( event, enabledDevices.mouse, ["mouse_swipe_left", "mouse_swipe_right", "mouse_swipe_up", "mouse_swipe_down", "click"]);
	}

	//HELPFUNCTION
	function swipeStart( eventType){
		xDown = eventType.clientX;
		yDown = eventType.clientY;
		var now = new Date().getTime();
		var delta_time = now - latest_tap
		if ((delta_time < 600) && (delta_time > 0)) {
			is_double_tap = true;
		}else{
			is_double_tap = false;
		}
		latest_tap = now;
	}

	function swipeStop( eventType, device, gesturesArray ){

		var xUp = eventType.clientX;
		var yUp = eventType.clientY;

		var xDiff = xDown - xUp;
		var yDiff = yDown - yUp;


		if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {

			if ( xDiff > 0 ) {
				//left swipe 
				gesture = gesturesArray[0];
			} else {
				//right swipe
				gesture = gesturesArray[1];
			}
		} else {

			if ( yDiff > 0 ) {
				//up swipe 
				gesture = gesturesArray[2];
			} else {
				//down swipe 
				gesture = gesturesArray[3];
			}
		}
		if (Math.abs( xDiff ) <= 2 && Math.abs( yDiff ) <= 2){
			if (is_double_tap){
				gesture = gesturesArray[4];
			}else{
				gesture = null;
			}
		}

		gestureEvent ( scope.ACTION_ACTIVATED, device, true);
		gestureEvent ( scope.ACTION_DEACTIVATED, device, false);
		
		gesture = null;

	}

	function gestureEvent( event_name, device, check ){

		for ( var action in actions){

			var _action = actions[action];
			var _gestures = _action.gestures;

			for (var i = 0; i < _gestures.length; i++) {

				if( _gestures[i] == gesture && _action.enabled && device){

					_action.is_active = check;
					createCustomEvent( event_name, action, "swipeble");
				}
			}
		}

		xDown = null;
		yDown = null;

	}

	function createCustomEvent( event_name, action, devicetype ){

		var gesture_event = new CustomEvent(event_name, {
						detail: {
							action: action,
							devicetype: devicetype
						}
					});

		window.dispatchEvent( gesture_event );

	}

	return scope;
}