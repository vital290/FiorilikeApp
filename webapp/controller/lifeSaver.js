sap.ui.define([

], function () {
    'use strict';
    
    return {
        getStatus: function (status) {
            switch (status) {
                case "Available":
                    return "Success"; 
                case "Out of stock":
                    return "Warning"; 
                case "In stock":
                    return "Error";    
                default:
                    break;
                    
            }
        }
    }
});
