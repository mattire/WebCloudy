function DisplayManager() {

    this.facade = null;

    this.contextItemToDisplayIdMap = {
        "Show key controls list": "controlsList",
        "Add sensor here": "addSensorForm",
        "Add controller here": "addControllerForm"
    };

    this.contextItemToActionMap = {
        "Remove all": "removeAllDevices"
    };

    this.menuItemClicked = function (itemText) {
        this.facade.mouse.contextMenuOn = false;
        var dispId = this.contextItemToDisplayIdMap[itemText];
        if (dispId != undefined)
            this.toggleDisplay(dispId);
        else {
            console.log('undefined');
            var action = this.contextItemToActionMap[itemText];
            this[action]()
        }
    }

    this.removeAllDevices = function () {
        this.facade.cloudyScene.removeAllDevices();
    }

    this.toggleDisplay = function (elementId) {
        var disp = document.getElementById(elementId);
        if (disp.style.display == "") disp.style.display = 'block';
        try{
            if (disp.style.display == 'block') { disp.style.display = 'none'; }
            else                               { disp.style.display = 'block'; }
        } catch(err){
            disp.style.display == 'block';
        }

        //if (disp.style.display == 'block' || disp.style.display == "") {
        //    disp.style.display = 'none';
        //} else {
        //    disp.style.display = 'block';
        //}
    }

    this.setDisplay = function (id, disp) {
        var dis = document.getElementById(id);
        dis.style.display = disp;
    }

    this.setDynamicInfoTextAndPosition = function (txt, posX, posY) {
        var dInfo = document.getElementById("dynamicInfo");
        dInfo.innerText = "";
        var content = document.createTextNode(txt);
        dInfo.appendChild(content);
        dInfo.style.left = posX + 'px';
        dInfo.style.top = posY + 'px';
    }

}