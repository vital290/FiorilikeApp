sap.ui.define([
    'com/emc/fin/app/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/core/Fragment'

], function( BaseController, MessageBox, MessageToast, Fragment){
    'use strict';
    return BaseController.extend("com.emc.fin.app.controller.View2",{

         onInit : function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("superman").attachMatched(this.herculis,this);
         },
         herculis: function(oEvent){
            debugger;
            var fruitId = oEvent.getParameter("arguments").fruitId;
            var sPath = '/fruits/' + fruitId;
            this.getView().bindElement(sPath);

         },

         
         onBack: function(){
         this.getView() .getParent().to("idView1");
           
            },
        onSave: function(){
            
            var oResourceModel = this.getView().getModel("i18n");
            var oBundle = oResourceModel.getResourceBundle();
            var msgSucess = oBundle.getText('msgSucess',["858585"]);
            var msgError = oBundle.getText('msgError');



            MessageBox.confirm("Do you want to save?",{
                title:'Confirmation',
                onClose: function(status){
                    if(status === "OK"){
                        MessageToast.show(msgSucess);
                    }else{
                       
                       MessageBox.error(msgError);

                    }
                }

            });

        },
        oPopupSupplier:null,
        oCityPopup: null,
        oField : null,
        onFilter: function(){
            

            var that = this;
            // MessageBox.alert("This functonallty is under construction");
            if(!this.oPopupSupplier){
            Fragment.load({
                name:'com.emc.fin.app.fragments.popup',
                id:'Supplier',
                controller:this
            }).then(function(oFragment){
                 that.oPopupSupplier = oFragment;
                that.oPopupSupplier.setTitle("Supplier");

                that.getView().addDependent(that.oPopupSupplier);
                that.oPopupSupplier.bindAggregation("items",{
                    path : '/suppliers',
                    template: new sap.m.ObjectListItem({
                        title: '{name}',
                        intro: '{sinceWhen}',
                        number: '{contactNo}'
                    })
                });
                that.oPopupSupplier.open();  

            });
        }else{
            this.oPopupSupplier.open();
        }

        },

        onF4Help: function(oEvent){
            this.oField = oEvent.getSource();

            // MessageBox.alert("This functionallty is under construction");

            var that = this;
            // MessageBox.alert("This functonallty is under construction");
            if(!this.oCityPopup){
            Fragment.load({

                name:'com.emc.fin.app.fragments.popup',
                id:'city',
                controller:this

            }).then(function(oFragment){
                 that.oCityPopup = oFragment;
                that.oCityPopup.setTitle("Supplier");

                that.getView().addDependent(that.oCityPopup);
                that.oCityPopup.setMultiSelect(false); 
                that.oCityPopup.bindAggregation("items",{
                    path : '/cities',
                    template: new sap.m.ObjectListItem({
                        title: '{name}',
                        intro: '{famousFor}',
                        number: '{otherName}'
                    })
                });
                that.oCityPopup.open();  

            });
        }else{
            this.oCityPopup.open();
        }


        },
        onConfirmPopup: function(oEvent){

            var sId = oEvent.getSource().getId();
            if(sId.indexOf("city") !=-1){
                var oSelectedItemObject = oEvent.getParameter("selectedItem");
                var sText = oSelectedItemObject.getTitle();
                this.oField.setValue(sText);
            
            }else{

            }

           

            // var oSelectedItemObject = oEvent.getParameter("selectedItem");
            // var sText = oSelectedItemObject.getTitle();
            // this.oField.setValue(sText);
        


        },





        onCancel: function(){


        }




    });

});








