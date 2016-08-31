


function CloudyMouseControls(cScene, cCam, domElement ) {
	
	this.cloudyScene = cScene;
	this.cloudyCam = cCam;
	
	this.domElement = ( domElement !== undefined ) ? domElement : document;
	
	this.raycaster = new THREE.Raycaster();

	this.mouseX = 0;
	this.mouseY = 0;

	this.addCube = function(position)
	{
		var geo = new THREE.BoxGeometry( 2, 2, 2 );
		var mat = new THREE.MeshLambertMaterial( { color: 0xFF0000 } ); 
		var box = new THREE.Mesh(geo, mat);
		box.position.copy(position);
		box.name = "box";
		this.cloudyScene.scene.add(box);
		this.cloudyScene.cloydyDevices.push(box);
	}

	this.addBox = function(event)
	{
		var pos = this.rayCastGet(event);
		if (pos!=null){
			this.addCube(pos);
		}
	}
	
	this.calcPosition = function(startP, direction, distance){
		var camPos 			= new THREE.Vector3(0,0,0);
		var unitDirVector 	= direction;
		camPos.copy(startP);
		var clickPosition = camPos.add(unitDirVector.multiplyScalar(distance));
		console.log("cam:");
		console.log(this.cloudyCam.object.position);
		console.log("clic pos:");
		console.log(clickPosition);
		return clickPosition;
	}
	
	this.rayCastGet = function( event )
	{
		// var mouse = new THREE.Vector2();
		// mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		// mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		// this.raycaster.setFromCamera( mouse, this.cloudyCam.object );
		
		var intersects = this.raycaster.intersectObjects( this.cloudyScene.meshList );
		
		if ( intersects.length > 0 ) {

			SELECTED = intersects[ 0 ].object;
			console.log(intersects[ 0 ].distance);
			console.log(SELECTED.geometry.name + ":" + SELECTED.geometry.uuid + ":" + SELECTED.name);
			//this.clickPositionGuess(intersects[ 0 ].distance, this.raycaster.ray.direction);
			return this.calcPosition(this.cloudyCam.object.position, this.raycaster.ray.direction, intersects[ 0 ].distance);
		}
		return null;
	}

	this.updateRayCast = function( event )
	{
		var mouse = new THREE.Vector2();
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		this.raycaster.setFromCamera( mouse, this.cloudyCam.object );
		
	}

	this.showContextMenu = function( event ) {
		var contextMenu = document.getElementById('contextMenu');
		contextMenu.style.display = 'block';
		contextMenu.style.left = event.clientX + 'px';
		contextMenu.style.top = event.clientY + 'px';
		//return false;
	}
	
	this.onMouseDown = function ( event ) {
	    //isShift = !!window.event.shiftKey;
	    isShift = !!event.shiftKey;
		if(isShift){
			alert("here");
		}
		// if ( this.domElement !== document ) {
			// this.domElement.focus();
		// }

		event.preventDefault();
		event.stopPropagation();
		
		// if ( this.activeLook ) {

			switch ( event.button ) {
				case 0: 
					this.addBox(event); 
					//alert("here");
					break;
				case 2:
					//alert("here");
					this.showContextMenu(event);
					event.preventDefault();
					event.stopPropagation();
					break;
				//case 0: this.displayObjectInfo = true; break;
/*
				case 0: this.moveForward = true; break;
				case 2: this.moveBackward = true; break;
	//*/
			}

		// }

		//this.mouseDragOn = true;
		return true;
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