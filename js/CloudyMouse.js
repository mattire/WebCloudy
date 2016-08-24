


function CloudyMouse(cScene, cCam, domElement ) {
	
	this.cloudyScene = cScene;
	this.cloudyCam = cCam;
	
	this.domElement = ( domElement !== undefined ) ? domElement : document;
	
	this.raycaster = new THREE.Raycaster();


	this.addCube = function(position)
	{
		var geo = new THREE.BoxGeometry( 5, 5, 5 );
		var mat = new THREE.MeshLambertMaterial( { color: 0xFF0000 } ); 
		var box = new THREE.Mesh(geo, mat);
		box.position.copy(position);
		gscene.add(box);
	}

	
	this.addBox = function(event)
	{
		var pos = this.rayCastGet(event);
		if (pos!=null){
			
		}
	}
	
	this.calcPosition = function(startP, direction, distance){
		var camPos 			= new THREE.Vector3(0,0,0);
		var unitDirVector 	= direction;
		camPos.copy(startP);
		var clickPosition = camPos.add(unitDirVector.multiplyScalar(distance));
		console.log("cam:");
		console.log(this.object.position);
		console.log("clic pos:");
		console.log(clickPosition);
		return clickPosition;
	}
	
	this.rayCastGet = function( event )
	{
		var mouse = new THREE.Vector2();
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		this.raycaster.setFromCamera( mouse, this.cloudyCam );
		
		var intersects = this.raycaster.intersectObjects( this.cloudyScene.meshList );
		
		if ( intersects.length > 0 ) {

			SELECTED = intersects[ 0 ].object;
			console.log(intersects[ 0 ].distance);
			console.log(SELECTED.geometry.name + ":" + SELECTED.geometry.uuid + ":" + SELECTED.name);
			//this.clickPositionGuess(intersects[ 0 ].distance, this.raycaster.ray.direction);
			return this.calcPosition(this.object.position, this.raycaster.ray.direction, intersects[ 0 ].distance);
		}
		return null;
	}

	

	this.onMouseDown = function ( event ) {

		if ( this.domElement !== document ) {

			this.domElement.focus();

		}

		event.preventDefault();
		event.stopPropagation();
		
		if ( this.activeLook ) {

			switch ( event.button ) {
				case 0: this.addBox(event); break;
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

	
	var _onMouseMove 	= bind( this, this.onMouseMove );
	var _onMouseDown 	= bind( this, this.onMouseDown );
	var _onMouseUp 		= bind( this, this.onMouseUp );

	
	function bind( scope, fn ) {
		return function () {
			fn.apply( scope, arguments );
		};
	}
	
}