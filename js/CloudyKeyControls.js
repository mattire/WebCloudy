

THREE.CloudyKeyControls = function ( _object, _cScene, domElement ) {

	this.cloudyCam = _object;
	this.cloudyScene = _cScene
	this.domElement = ( domElement !== undefined ) ? domElement : document;
	this.toggleTransparency = false;

	this.keyControls = { 
	    27: ["this", "hideContextMenu"], /*Esc*/
	    93: ["this", "showContextMenu"], /*context key*/
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
	
	this.keyUpSkipList = ["toggleTransparency", "toggleLighting", "hideContextMenu", "showContextMenu"];
	


	this.onKeyDown = function ( event ) {

		isShift = !!window.event.shiftKey; // typecast to boolean
		isCtrl  = !!window.event.ctrlKey; // typecast to boolean
		//event.preventDefault();
	    console.log(event.keyCode);
		if(!isShift && !isCtrl){
			list = this.keyControls[event.keyCode];
			if (list != undefined) {
			    if (list[0] == "this") {
			        this[list[1]]();
			    } else {
    				this[list[0]][list[1]] = true;
			    }
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
			if (list != undefined) {
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

	this.hideContextMenu = function () {
	    var menu = document.getElementById("contextMenu");
	    menu.style.display = 'none';
	}

	this.showContextMenu = function () {
	    var menu = document.getElementById("contextMenu");
	    //menu.style.margin = 'auto';
	    
	    contextMenu.style.left = document.body.offsetWidth / 2 + 'px';
	    contextMenu.style.left = document.body.offsetHeight / 2 + 'px';
	    contextMenu.style.top = '50px';
	    menu.style.display = 'block';
	}

	this.dispose = function() {

		//this.domElement.removeEventListener( 'contextmenu', contextmenu, false );
		window.removeEventListener( 'keydown', _onKeyDown, false );
		window.removeEventListener( 'keyup', _onKeyUp, false );
	}

	var _onKeyDown = bind( this, this.onKeyDown );
	var _onKeyUp = bind( this, this.onKeyUp );


	window.addEventListener( 'keydown', _onKeyDown, false );
	window.addEventListener( 'keyup', _onKeyUp, false );

	function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	}
	
}