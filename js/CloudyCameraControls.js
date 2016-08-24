/**
 * Based on original code "FirstPersonControls.js" (from three.js demos) by
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 *
 * @ modified by mattire:
 *  - extract keyboard&mouse controls to other class CloudyKeyControls
 *  - change key configurations
 */


THREE.CloudyCameraControls = function ( _object, meshList, domElement ) {

	//domElement = undefined;
	this.object = _object;
	this.target = new THREE.Vector3( 0, 0, 0 );
	this.targetPosition = null;
	this.objects = meshList;

	this.domElement = ( domElement !== undefined ) ? domElement : document;

	this.enabled = true;

	this.raycaster = new THREE.Raycaster();
	this.displayObjectInfo = false
	
	this.movementSpeed = 50.0;
	this.incSpeed = false;
	this.decSpeed = false;
	
	this.lookSpeed = 0.1;
	this.incLookSpeed = false;
	this.decLookSpeed = false;
	
	this.lookVertical = true;
	this.autoForward = false;

	this.activeLook = true;

	this.heightSpeed = false;
	this.heightCoef = 1.0;
	this.heightMin = 0.0;
	this.heightMax = 1.0;

	this.constrainVertical = false;
	this.verticalMin = 0;
	this.verticalMax = Math.PI;

	this.autoSpeedFactor = 0.0;

	this.mouseX = 0;
	this.mouseY = 0;

	this.lat = 0;
	this.lon = 0;
	this.phi = 0;
	this.theta = 0;

	this.moveForward = false;
	this.moveBackward = false;
	this.moveLeft = false;
	this.moveRight = false;

    this.turnUp = false;
    this.turnLeft = false;
    this.turnRight = false;
    this.turnDown = false;

	this.mouseDragOn = false;

	this.viewHalfX = 0;
	this.viewHalfY = 0;

	if ( this.domElement !== document ) {
		this.domElement.setAttribute( 'tabindex', - 1 );
	}


	this.handleResize = function () {
		if ( this.domElement === document ) {
			this.viewHalfX = window.innerWidth / 2;
			this.viewHalfY = window.innerHeight / 2;
		} else {
			this.viewHalfX = this.domElement.offsetWidth / 2;
			this.viewHalfY = this.domElement.offsetHeight / 2;
		}
	};
	

	this.update = function( delta ) {

		if ( this.incSpeed ) {
			if(this.movementSpeed<1000){
				this.movementSpeed +=  10;
				console.log("movementSpeed " + this.movementSpeed);
			}
		}
		if ( this.decSpeed ) {
			if(this.movementSpeed>15){
				this.movementSpeed -= 10;
				console.log("movementSpeed " + this.movementSpeed);
			}
		}
		if (this.incLookSpeed){
			if(this.lookSpeed<1.0){this.lookSpeed += 0.01}
		}
		if (this.decLookSpeed){
			if(this.lookSpeed>0.05){this.lookSpeed -= 0.01}
		}
	
		if ( this.enabled === false ) return;

		if ( this.heightSpeed ) {

			var y = THREE.Math.clamp( this.object.position.y, this.heightMin, this.heightMax );
			var heightDelta = y - this.heightMin;

			this.autoSpeedFactor = delta * ( heightDelta * this.heightCoef );

		} else {

			this.autoSpeedFactor = 0.0;

		}

		var actualMoveSpeed = delta * this.movementSpeed;

		if ( this.moveForward || ( this.autoForward && ! this.moveBackward ) ) this.object.translateZ( - ( actualMoveSpeed + this.autoSpeedFactor ) );
		if ( this.moveBackward ) this.object.translateZ( actualMoveSpeed );

		if ( this.moveLeft ) this.object.translateX( - actualMoveSpeed );
		if ( this.moveRight ) this.object.translateX( actualMoveSpeed );

		if ( this.moveUp ) this.object.translateY( actualMoveSpeed );
		if ( this.moveDown ) this.object.translateY( - actualMoveSpeed );

		var actualLookSpeed = delta * this.lookSpeed;

		if ( ! this.activeLook ) {

			actualLookSpeed = 0;

		}

		var verticalLookRatio = 1;

		if ( this.constrainVertical ) {

			verticalLookRatio = Math.PI / ( this.verticalMax - this.verticalMin );

		}
		var factor = 700;
		if (this.turnUp) { this.lat += factor * actualLookSpeed; }
		if (this.turnDown) { this.lat -= factor * actualLookSpeed; }
		if (this.turnLeft) { this.lon -= factor * actualLookSpeed; }
		if (this.turnRight) { this.lon += factor * actualLookSpeed; }

		this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
		this.phi = THREE.Math.degToRad( 90 - this.lat );

		this.theta = THREE.Math.degToRad( this.lon );

		if ( this.constrainVertical ) {

			this.phi = THREE.Math.mapLinear( this.phi, 0, Math.PI, this.verticalMin, this.verticalMax );

		}

		this.targetPosition = this.target,
			position = this.object.position;

		this.targetPosition.x = position.x + 10 * Math.sin( this.phi ) * Math.cos( this.theta );
		this.targetPosition.y = position.y + 10 * Math.cos( this.phi );
		this.targetPosition.z = position.z + 10 * Math.sin( this.phi ) * Math.sin( this.theta );

		this.object.lookAt( this.targetPosition );
	};	

	this.handleResize();

};
