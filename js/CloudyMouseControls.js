


function CloudyMouseControls(domElement) {
	
    this.facade = null;

	this.domElement = ( domElement !== undefined ) ? domElement : document;
	
	this.raycaster = new THREE.Raycaster();

	this.mouseX = 0;
	this.mouseY = 0;
	this.lastObjUnderMouse = null;
	this.contextMenuOn = false;
	this.boxAddDisabled = false;
	this.devUnderMouse = null;

	this.addMeter = function (position) {
	    var mesh = null;
	    var loader = new THREE.JSONLoader();
	    var pos = position;
	    self = this;
	    loader.load('../models/meter.json', function (geometry) {
	        var mat = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
	        mesh = new THREE.Mesh(geometry, mat);
	        mesh.name = "meter";
	        mesh.position.copy(pos);
	        self.facade.cloudyScene.cloudyDevices.push(mesh);
	        self.facade.cloudyScene.scene.add(mesh);
	    });
	    
	}

	this.addCube = function(position)
	{
		var geo = new THREE.BoxGeometry( 2, 2, 2 );
		var mat = new THREE.MeshLambertMaterial( { color: 0xFF0000 } ); 
		var box = new THREE.Mesh(geo, mat);
		box.position.copy(position);
		box.name = "box";
		this.facade.cloudyScene.scene.add(box);
		this.facade.cloudyScene.cloudyDevices.push(box);
	}

	this.addBox = function(event)
	{
		var pos = this.rayCastGet(event);
		if (pos!=null){
		    //this.addCube(pos);
		    this.addMeter(pos);
		}
	}
	
	this.calcPosition = function(startP, direction, distance){
		var camPos 			= new THREE.Vector3(0,0,0);
		var unitDirVector 	= direction;
		camPos.copy(startP);
		var clickPosition = camPos.add(unitDirVector.multiplyScalar(distance));
		console.log("cam:");
		console.log(this.facade.cam.object.position);
		console.log("clic pos:");
		console.log(clickPosition);
		return clickPosition;
	}
	
	this.rayCastGet = function( event )
	{
		
		var intersects = this.raycaster.intersectObjects( this.facade.cloudyScene.meshList );
		
		if ( intersects.length > 0 ) {

			SELECTED = intersects[ 0 ].object;
			console.log(intersects[ 0 ].distance);
			console.log(SELECTED.geometry.name + ":" + SELECTED.geometry.uuid + ":" + SELECTED.name);
			//this.clickPositionGuess(intersects[ 0 ].distance, this.raycaster.ray.direction);
			return this.calcPosition(this.facade.cam.object.position, this.raycaster.ray.direction, intersects[0].distance);
		}
		return null;
	}

	this.updateRayCast = function( event )
	{
		var mouse = new THREE.Vector2();
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		this.raycaster.setFromCamera(mouse, this.facade.cam.object);
		
	}

	this.showContextMenu = function (event) {
	    this.contextMenuOn = true;
		var contextMenu = document.getElementById('contextMenu');
		contextMenu.style.display = 'block';
		contextMenu.style.left = event.clientX + 'px';
		contextMenu.style.top = event.clientY + 'px';
		//return false;
	}
	
	this.onMouseDown = function ( event ) {
	    isShift = !!event.shiftKey;
		if(isShift){
			alert("here");
		}
		// if ( this.domElement !== document ) {
			// this.domElement.focus();
		// }

		var isMobile = false; //initiate as false chrome-mobile
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|chrome-mobile|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		    isMobile = false;
		}
	//	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    //|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

		if(isMobile == false){
		}
			switch ( event.button ) {
			    case 0:
			        if (this.contextMenuOn == false) {
			            if (this.boxAddDisabled == false) {
					        this.addBox(event); 
			            }
			        }
			        break;
                case 1:
				case 2:
				    //alert("here");
				    if (this.devUnderMouse != null) {
				        alert("diff context menu");
				    } else {
					    this.showContextMenu(event);
					    event.preventDefault();
					    event.stopPropagation();
					    return true;
				    }
					break;
				//case 0: this.displayObjectInfo = true; break;
/*
				case 0: this.moveForward = true; break;
				case 2: this.moveBackward = true; break;
	//*/
			}

			return false;
	};

	this.onMouseUp = function ( event ) {

		event.preventDefault();
		event.stopPropagation();
	};

	this.onMouseMove = function (event) {

	    //console.log('Mouse moved');
		// if ( this.domElement === document ) {
			// this.mouseX = event.pageX - this.viewHalfX;
			// this.mouseY = event.pageY - this.viewHalfY;
		// } else {
			// this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
			// this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;
		// }
		
	    this.updateRayCast(event);

	    var devIntersects = this.raycaster.intersectObjects(this.facade.cloudyScene.cloudyDevices);
	    if (devIntersects.length > 0) {
	        this.devUnderMouse = devIntersects[0].object;
	        if (this.devUnderMouse != this.lastObjUnderMouse) {
	            this.lastObjUnderMouse = this.devUnderMouse;
	            console.log(this.devUnderMouse.name);
	            //event.clientX
	            this.facade.display.setDynamicInfoTextAndPosition(this.devUnderMouse.name, event.clientX, event.clientY);
	            this.facade.display.setDisplay("dynamicInfo", 'block');
	        }
	    } else {
	        this.devUnderMouse = null;
	        this.lastObjUnderMouse = null;
	        this.facade.display.setDisplay("dynamicInfo", 'none');
	    }

	};
	
	this.onContextMenu = function (event){
		return false;
	}

	this.dispose = function() {
		this.domElement.removeEventListener( 'mousedown', _onMouseDown, false );
		this.domElement.removeEventListener( 'mousemove', _onMouseMove, false );
		this.domElement.removeEventListener( 'mouseup', _onMouseUp, false );
		this.domElement.removeEventListener( 'oncontextmenu', _onContextMenu, false );

	}

	var _onMouseMove 	= bind( this, this.onMouseMove );
	var _onMouseDown 	= bind( this, this.onMouseDown );
	var _onMouseUp 		= bind( this, this.onMouseUp );
	var _onContextMenu  = bind( this, this.onContextMenu );
	
	this.domElement.addEventListener( 'mousemove', _onMouseMove, false );
	this.domElement.addEventListener( 'mousedown', _onMouseDown, false );
	this.domElement.addEventListener( 'mouseup', _onMouseUp, false );
	this.domElement.addEventListener( 'oncontextmenu', _onContextMenu, false );
	

	
	function bind( scope, fn ) {
		return function () {
			fn.apply( scope, arguments );
		};
	}
	
}