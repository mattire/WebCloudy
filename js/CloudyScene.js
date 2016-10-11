
/**
 * @author mattire
 */

 
function CloudyScene(scene_, colladaFile_) {

    this.facade = null; 
	colladaFile 		= colladaFile_;
	loader 				= new THREE.ColladaLoader();
	this.scene 			= scene_;
	this.meshList 		= [];
	this.edgeList 		= [];
	this.cloudyDevices 	= [];
	
	this.transparent 		= false;
	this.toggleTransparency = false;
	this.lightIndex			= 0;
	this.lightList 			= []
	this.toggleLighting 	= false;
	
	var self = this;
	
	this.init = function () {
		
		console.log("init");
		console.log(colladaFile);
		console.log(this.meshList.length);
		
		loader.options.convertUpAxis = true;
		loader.load(colladaFile, function (collada) {
			dae = collada.scene;

			dae.traverse(function (child) {
				if (child instanceof THREE.Mesh) {
					//console.log("It's a mesh!");
					child.castShadow = true;
					child.receiveShadow = true;
					self.meshList.push(child);
					
				}	
			});

			dae.scale.x = dae.scale.y = dae.scale.z = 5.0;
			dae.updateMatrix();
			this.scene.add(dae);
			self.addEdges();
		});
		
		// Lights
		
		/*/ 
		particleLight = new THREE.Mesh(new THREE.SphereGeometry(14, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
		this.scene.add(particleLight);
		//*/ 
		
		var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0xeeeeee);
		directionalLight.position.x = Math.random() - 0.5;
		directionalLight.position.y = Math.random() - 0.5;
		directionalLight.position.z = Math.random() - 0.5;
		directionalLight.position.normalize();
		var ambientLight 	= new THREE.AmbientLight(0xcccccc);
		var particleLight 	= new THREE.Mesh(new THREE.SphereGeometry(14, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
		var hemiLight 		= new THREE.HemisphereLight( 0x0000ff, 0x00ff00, 0.6 ); 
		//var spotLight = new THREE.SpotLight( 0x0000ff, 0x00ff00, 0.6 ); 
		
		
		this.lightList.push(ambientLight);
		this.lightList.push(directionalLight);
		this.lightList.push(particleLight);
		this.lightList.push(hemiLight);
		this.lightList.forEach(function(light){
			light.castShadow	= true;
			light.shadowDarkness = 0.5;
			light.shadowCameraVisible = true;
			//light.receiveShadow	= true;
		});
		
		this.scene.add(new THREE.AmbientLight(0xcccccc));

		this.addSkybox();
	} 
	
	this.addSkybox = function () {
	    var imagePrefix = "../skybox/";
	    //var directions = ["sfront37", "sback37", "stop37", "sbottom37", "sright37", "sleft37"];
	    var directions = ["sright37", "sfront37", "stop37", "sbottom37", "sleft37", "sback37"];
	    var directions = ["sright37", "sleft37", "stop37", "sbottom37", "sfront37", "sback37"];
	    var imageSuffix = ".jpg";
	    var skyGeometry = new THREE.CubeGeometry(800, 800, 800);
	    //var skyGeometry = new THREE.CubeGeometry(2500, 2500, 2500);
	    //var skyGeometry = new THREE.CubeGeometry(5000, 5000, 5000);
	    //var skyGeometry = new THREE.CubeGeometry(50000, 50000, 50000);

	    var materialArray = [];
	    for (var i = 0; i < 6; i++)
	        materialArray.push(new THREE.MeshBasicMaterial({
	            map: THREE.ImageUtils.loadTexture(imagePrefix + directions[i] + imageSuffix),
	            side: THREE.BackSide
	        }));
	    var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
	    var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
	    this.scene.add(skyBox);
	}

	this.addEdges = function()
	{
		this.meshList.forEach(
			function (mesh, index){
				var edges = new THREE.EdgesHelper( mesh, 0x000000);
				edges.material.linewidth = 8;
			    // edges.material.linewidth = 32;
				// edges.material.linewidth = 64;
				self.scene.add(edges);
				self.edgeList.push(edges)
			}
		);
	}

	
	this.changeTransparency = function() {		
		var transp = false;
		var opac = 1.0;
		if(this.transparent==false){
			this.transparent = true;
			transp = true;
			opac = 0.1;
		} else {
			this.transparent = false;
		}
		this.meshList.forEach(function (mesh, index){
			if(mesh.material.name.startsWith("IfcWindow")){
				// do nothing
			} else {
				console.log(mesh.material.opacity);
				mesh.material.transparent = transp;
				mesh.material.opacity = opac;					
			}
		});
	}
	
	this.changeLighting = function() {
		this.scene.remove(this.lightList[this.lightIndex]);
		this.lightIndex++;
		if(this.lightIndex==this.lightList.length){
			this.lightIndex=0;
		}
		this.scene.add(this.lightList[this.lightIndex])
	}
	
	this.update = function( delta ) {
		if(this.toggleTransparency){
			this.changeTransparency();
			this.toggleTransparency = false;
		}
		if(this.toggleLighting){
			this.changeLighting();
			this.toggleLighting = false;
		}		
	}

	this.removeDevice = function () {
	    //device = this.facade.mouse.lastObjUnderMouse;
	    device = this.facade.mouse.contextMenuDevice;
	    this.scene.remove(device);
	    this.cloudyDevices.splice(this.cloudyDevices.indexOf(device), 1);
	    //this.cloudyDevices.remove(device);
	}

	this.removeAllDevices = function () {
	    self = this;
	    this.cloudyDevices.forEach(function (device) {
	        self.scene.remove(device);
	        
	    });
	    this.cloudyDevices = [];
	}
	
}

