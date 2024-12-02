sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'com/emc/fin/app/util/lifeSaver'
], function( Controller, lifeSaver){
    'use strict';
    return Controller.extend("com.emc.fin.app.controller.BaseController",{
        formatter:lifeSaver

    });

});