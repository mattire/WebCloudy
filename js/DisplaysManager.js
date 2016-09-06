function DisplayManager() {

    this.contextItemToDisplayIdMap = {
        "Show key controls list": "controlsList",
        "Add sensor here": "addSensorForm",
        "Add controller here": "addControllerForm"
    };

    this.menuItemClicked = function (itemText) {
        var dispId = this.contextItemToDisplayIdMap[itemText];
        this.toggleDisplay(dispId);
    }

    this.toggleDisplay = function (elementId) {
        var disp = document.getElementById(elementId);
        if (disp.style.display == 'block' || disp.style.display == "") {
            disp.style.display = 'none';
        } else {
            disp.style.display = 'block';
        }
    }

}