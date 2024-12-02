sap.ui.define([
    'com/emc/fin/app/controller/BaseController',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function( BaseController, Filter, FilterOperator){
    'use strict';
    return BaseController.extend("com.emc.fin.app.controller.View1",{

         onInit : function(){
            this.oRouter = this.getOwnerComponent().getRouter();


         }, 
        
         onNext: function(myFruitId){
            this.oRouter.navTo("superman",{
                fruitId:myFruitId
            });
            // var oCurrentView = this.getView();
            // var oAppCon = oCurrentView.getParent();

            // oAppCon.to("idView2");

         },


         onItemDelete: function(){
            var oList = this.getView().byId("idList");
            var aSelectItems = oList.getSelectItems();
            aSelectItems.forEach(element => {
                oList.removeItem(element);
            
            });


         },
         
         onItemSelect: function(oEvent){
             var sPath = oEvent.getParameter("listItem").getBindingContextPath();
             var myId = sPath.split("/")[sPath.split("/").length-1];
            //  var oAppCon = this.getView().getParent();
            //  var oV2 = oAppCon.getPages()[1];
            // var oV2 = this.getView().getParent().getParent().getDetailPage("idView2");
            //  oV2.bindElement(sPath);
             this.onNext(myId);
        


         },

         onItemDelete: function(oEvent){
            var oItemToBeDeleted = oEvent.getParameter("listItem");
            console.log(oItemToBeDeleted.getTitle() + "will be deleted now!");
            // var oList = this.getView().byId("idMyList");
            var oList = oEvent.getSource(); 
            oList.removeItem(oItemToBeDeleted);


         },
         onSearch:function(oEvent){
            var sVal = oEvent.getParameter("query");
            if (!sVal){
                sVal = oEvent.getParameter("newValue");
            }
            var oFilter1 = new Filter("name", FilterOperator.Contains, sVal);
            var oFilter2 = new Filter("type", FilterOperator.Contains, sVal);
            var aFilter = [oFilter1, oFilter2];
            var oFilter = new Filter({
                filters : aFilter,
                and: false
            });
            
            this.getView().byId("idMyList").getBinding("items").filter(oFilter);
         }

    });

});