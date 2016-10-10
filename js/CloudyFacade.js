

function CloudyFacade() {
 
    this.cam            = null;
    this.cloudyScene    = null;
    this.keys           = null;
    this.mouse          = null;
    this.display        = null;
    this.screenControls = null;

    var self = this;

    this.setField = function(field, obj){
        obj.facade  = self;
        self[field] = obj;
    }

	//this.init = function () {
	//	console.log("init");
	//} 
}
