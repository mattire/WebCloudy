
/**
 * @author mattire
 */

 
function CloudyScene(scene_, colladaFile_) {
 
	colladaFile 		= colladaFile_;
	loader 				= new THREE.ColladaLoader();
	this.scene 			= scene_;
	this.meshList 		= [];
	this.edgeList 		= [];
	this.cloydyDevices 	= [];
	
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
					console.log("It's a mesh!");
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
		var ambientLight = new THREE.AmbientLight(0xcccccc);
		var particleLight = new THREE.Mesh(new THREE.SphereGeometry(14, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
		// this.scene.add(directionalLight);
		this.lightList.push(ambientLight);
		this.lightList.push(directionalLight);
		this.lightList.push(particleLight);
		this.scene.add(new THREE.AmbientLight(0xcccccc));
	} 
	
	this.addEdges = function()
	{
		this.meshList.forEach(
			function (mesh, index){
				var edges = new THREE.EdgesHelper( mesh, 0x000000);
				edges.material.linewidth = 16;
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
	
}

