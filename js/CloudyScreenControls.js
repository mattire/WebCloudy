

screenCtrls = new CloudySceenControls();

function forwarddown() {
    console.log("fd");
    screenCtrls.forwarddown();
}

function forwardup() {
    console.log("fu");
    screenCtrls.forwardup();
}

function CloudySceenControls(domElement) {
    this.facade = null;

    this.mouseDown = function (event) {
        console.log("obj fd");
        console.log(event);
        facade.cam[event] = true;
    }

    this.mouseUp = function(event) {
        console.log("obj fu");
        console.log(event);
        facade.cam[event] = false;
    }

    this.mouseOver = function (event) { facade.mouse.boxAddDisabled = true; }
    this.mouseOut  = function (event) { facade.mouse.boxAddDisabled = false; }
}