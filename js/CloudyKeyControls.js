

THREE.CloudyKeyControls = function ( _object, _cScene, domElement ) {

	this.cloudyCam = _object;
	this.cloudyScene = _cScene
	this.domElement = ( domElement !== undefined ) ? domElement : document;
	this.toggleTransparency = false;

	this.keyControls = { 
					49: ["cloudyCam", "incSpeed"], /*1*/
					50: ["cloudyCam", "decSpeed"], /*2*/ 
					51: ["cloudyCam", "incLookSpeed"], /*3*/
					52: ["cloudyCam", "decLookSpeed"], /*4*/
					38: ["cloudyCam", "moveForward"], /*up*/
					87: ["cloudyCam", "moveForward"], /*W*/ 
					37: ["cloudyCam", "moveLeft"], /*left*/
					65: ["cloudyCam", "moveLeft"], /*A*/ 
					40: ["cloudyCam", "moveBackward"], /*down*/
					83: ["cloudyCam", "moveBackward"], /*S*/ 
					39: ["cloudyCam", "moveRight"], /*right*/
					68: ["cloudyCam", "moveRight"], /*D*/ 
					82: ["cloudyCam", "moveUp"], /*R*/ 
					70: ["cloudyCam", "moveDown"], /*F*/ 
					104: ["cloudyCam", "turnUp"], /*numpad 8*/ 
					100: ["cloudyCam", "turnLeft"], /*numpad 4*/ 
					102: ["cloudyCam", "turnRight"], /*numpad 6*/ 
					98:  ["cloudyCam", "turnDown"], /*numpad 2*/ 
					84:  ["cloudyScene", "toggleTransparency"], /*T*/
					76:  ["cloudyScene", "toggleLighting"] /*L*/
	};
	
	this.keyCtrlControls = { };
	
	this.keyShiftControls = {
					38: "turnUp", /*up*/
					87: "turnUp", /*W*/ 
					37: "turnLeft", /*left*/
					65: "turnLeft", /*A*/
					40: "turnDown", /*down*/
					83: "turnDown", /*S*/
					39: "turnRight", /*right*/
					68: "turnRight" /*D*/
	};
	
	this.keyUpSkipList = ["toggleTransparency", "toggleLighting"];
	
	this.onMouseDown = function ( event ) {

		if ( this.domElement !== document ) {
			this.domElement.focus();
		}

		event.preventDefault();
		event.stopPropagation();
		
		if ( this.activeLook ) {

			switch ( event.button ) {
				case 0: this.rayCastGet(event); break;
				//case 0: this.displayObjectInfo = true; break;
/*
				case 0: this.moveForward = true; break;
				case 2: this.moveBackward = true; break;
	//*/
			}

		}

		this.mouseDragOn = true;

	};

	this.onMouseUp = function ( event ) {

		event.preventDefault();
		event.stopPropagation();

		/*
		if ( this.activeLook ) {

			switch ( event.button ) {

				case 0: this.moveForward = false; break;
				case 2: this.moveBackward = false; break;

			}

		}
		
		this.mouseDragOn = false;
		//*/
	};

	this.onMouseMove = function ( event ) {
		if ( this.domElement === document ) {
			this.mouseX = event.pageX - this.viewHalfX;
			this.mouseY = event.pageY - this.viewHalfY;
		} else {
			this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
			this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;
		}
	};

	this.onKeyDown = function ( event ) {

		isShift = !!window.event.shiftKey; // typecast to boolean
		isCtrl  = !!window.event.ctrlKey; // typecast to boolean
		//event.preventDefault();
	    console.log(event.keyCode);
		if(!isShift && !isCtrl){
			list = this.keyControls[event.keyCode];
			if(list!=undefined){
				this[list[0]][list[1]] = true;
			}
		} 
		if (isShift && !isCtrl) {
			camControl = this.keyShiftControls[event.keyCode];
			this.cloudyCam[camControl] = true;
		}
	};

	this.onKeyUp = function ( event ) {

		isShift = !!window.event.shiftKey; // typecast to boolean		// NOTE: RELEASING CTRL OR SHIFT KEY BEFORE OTHER KEY
		isCtrl  = !!window.event.ctrlKey; // typecast to boolean		// 		 CAUSES COMPLICATIONS
		if(!isShift){
			list = this.keyControls[event.keyCode];
			if(list!=undefined){
				if(this.keyUpSkipList.indexOf(list[1])==-1){
					this[list[0]][list[1]] = false;
				} 
			}
		} 
		if (isShift && !isCtrl) {
			camControl = this.keyShiftControls[event.keyCode];
			this.cloudyCam[camControl] = false;
		}
	};


	this.dispose = function() {

		this.domElement.removeEventListener( 'contextmenu', contextmenu, false );
		this.domElement.removeEventListener( 'mousedown', _onMouseDown, false );
		this.domElement.removeEventListener( 'mousemove', _onMouseMove, false );
		this.domElement.removeEventListener( 'mouseup', _onMouseUp, false );

		window.removeEventListener( 'keydown', _onKeyDown, false );
		window.removeEventListener( 'keyup', _onKeyUp, false );

	}

	// var _onMouseMove = bind( this, this.onMouseMove );
	// var _onMouseDown = bind( this, this.onMouseDown );
	// var _onMouseUp = bind( this, this.onMouseUp );
	var _onKeyDown = bind( this, this.onKeyDown );
	var _onKeyUp = bind( this, this.onKeyUp );

	//this.domElement.addEventListener( 'contextmenu', contextmenu, false );
	// this.domElement.addEventListener( 'mousemove', _onMouseMove, false );
	// this.domElement.addEventListener( 'mousedown', _onMouseDown, false );
	// this.domElement.addEventListener( 'mouseup', _onMouseUp, false );

	window.addEventListener( 'keydown', _onKeyDown, false );
	window.addEventListener( 'keyup', _onKeyUp, false );

	function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	}
	
}