

function CloudyFacade() {
 
    this.cam     = null;
    this.scene   = null;
    this.keys    = null;
    this.mouse   = null;
    this.display = null;
    var self = this;

    this.setField = function(field, obj){
        obj.facade  = self;
        self[field] = obj;
    }

	//this.init = function () {
	//	console.log("init");
	//} 
}
