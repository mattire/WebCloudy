

THREE.CloudyKeyControls = function (domElement ) {

    this.facade = null;


	this.domElement = ( domElement !== undefined ) ? domElement : document;

	this.keyControls = { 
	    27:  ["this"       , "hideContextMenu"                  ], /*Esc*/
	    93:  ["this"       , "showContextMenu"                  ], /*context key*/
	    49:  ["facade"     , "cam", "incSpeed"                  ], /*1*/
	    50:  ["facade"     , "cam", "decSpeed"                  ], /*2*/
	    51:  ["facade"     , "cam", "incLookSpeed"              ], /*3*/
	    52:  ["facade"     , "cam", "decLookSpeed"              ], /*4*/
	    38:  ["facade"     , "cam", "moveForward"               ], /*up*/
	    87:  ["facade"     , "cam", "moveForward"               ], /*W*/
	    37:  ["facade"     , "cam", "moveLeft"                  ], /*left*/
	    65:  ["facade"     , "cam", "moveLeft"                  ], /*A*/
	    40:  ["facade"     , "cam", "moveBackward"              ], /*down*/
	    83:  ["facade"     , "cam", "moveBackward"              ], /*S*/
	    39:  ["facade"     , "cam", "moveRight"                 ], /*right*/
	    68:  ["facade"     , "cam", "moveRight"                 ], /*D*/
	    82:  ["facade"     , "cam", "moveUp"                    ], /*R*/
	    70:  ["facade"     , "cam", "moveDown"                  ], /*F*/
	    104: ["facade"     , "cam", "turnUp"                    ], /*numpad 8*/
	    100: ["facade"     , "cam", "turnLeft"                  ], /*numpad 4*/
	    102: ["facade"     , "cam", "turnRight"                 ], /*numpad 6*/
	    98:  ["facade"     , "cam", "turnDown"                  ], /*numpad 2*/
	    84:  ["facade"     , "cloudyScene", "toggleTransparency"], /*T*/
	    76:  ["facade"     , "cloudyScene", "toggleLighting"    ], /*L*/
	    67:  ["facade"     , "cam"  , "printOutDebugData"       ]  /*c*/
	};
	
	this.keyCtrlControls = { };
	
	this.keyShiftControls = {
					38: "turnUp",    /*up*/
					87: "turnUp",    /*W*/ 
					37: "turnLeft",  /*left*/
					65: "turnLeft",  /*A*/
					40: "turnDown",  /*down*/
					83: "turnDown",  /*S*/
					39: "turnRight", /*right*/
					68: "turnRight"  /*D*/
	};
	
	this.keyUpSkipList = ["toggleTransparency", "toggleLighting", "hideContextMenu", "showContextMenu"];

	this.onKeyDown = function ( event ) {

		isShift = !!event.shiftKey; // typecast to boolean
		isCtrl = !!event.ctrlKey; // typecast to boolean

		//event.preventDefault();
	    console.log(event.keyCode);
		if(!isShift && !isCtrl){
			list = this.keyControls[event.keyCode];
			if (list != undefined) {
			    if (list[0] == "this") {
			        this[list[1]]();
			    } else {

			        // walk objects:
			        obj = this;
			        for (var i = 0; i < list.length - 1; i++) {
			            obj = obj[list[i]];
			        }
			        obj[list[list.length-1]] = true;
			    }
			}
		} 
		if (isShift && !isCtrl) {
		    camControl = this.keyShiftControls[event.keyCode];
		    this.facade.cam[camControl] = true;
		}
	};

	this.onKeyUp = function ( event ) {

		isShift = !!event.shiftKey; // typecast to boolean		// NOTE: RELEASING CTRL OR SHIFT KEY BEFORE OTHER KEY
		isCtrl = !!event.ctrlKey; // typecast to boolean		// 		 CAUSES COMPLICATIONS

		if(!isShift){
			list = this.keyControls[event.keyCode];
			if (list != undefined) {
			    if (this.keyUpSkipList.indexOf(list[1]) == -1) {

                    // walk objects:
			        obj = this;
			        for (var i = 0; i < list.length - 1; i++) {
			            obj = obj[list[i]];
			        }
			        obj[list[list.length - 1]] = false;
				} 
			}
		} 
		if (isShift && !isCtrl) {
			camControl = this.keyShiftControls[event.keyCode];
			this.facade.cam[camControl] = false;
		}
	};

	this.hideContextMenu = function () {
	    this.contextMenuOn = false;
	    var menu = document.getElementById("contextMenu");
	    menu.style.display = 'none';
        var menu = document.getElementById("contextMenu2");
        menu.style.display = 'none';
	}

	this.showContextMenu = function () {
	    this.contextMenuOn = true;
	    var menu = document.getElementById("contextMenu");
	    //menu.style.margin = 'auto';
	    
	    contextMenu.style.left = document.body.offsetWidth / 2 + 'px';
	    contextMenu.style.left = document.body.offsetHeight / 2 + 'px';
	    contextMenu.style.top  = '50px';
	    menu.style.display     = 'block';
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