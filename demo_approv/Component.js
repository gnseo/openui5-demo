sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/ui/demo/basicTemplate/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("sap.ui.demo.basicTemplate.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);


			/*
			const url = "/sapodata/sap/opu/odata/sap/ZODOA_SRV"
			var oModel = new sap.ui.model.odata.v2.ODataModel({
			    serviceUrl: url
			});
			console.log("model", oModel)
			oModel.read("/CSNSet(Vkorg='1610',Onum='')", {
					success: function(oData, response){
						console.log("oData", oData)
						console.log("response", response)
					},
					error: function(oError){
						console.log(oError)
					}
				}
			)
			*/

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			/*
			this.getModel('csn').read("/CSNSet(Vkorg='1610',Onum='')", {
					success: function(oData, response){
						console.log("oData", oData)
						console.log("response", response)
					},
					error: function(oError){
						console.log("error", oError)
					}
				}
			)
			*/

			// create the views based on the url/hash
			this.getRouter().initialize();

		},
		createContentt: function(){
			const oModel = this.getModel('csn')
			const oMetaModel = oModel.getMetaModel()
			const thisApp = sap.ui.getCore().byId("app")
			const sPath = "/CSNSet"
      const oViewContainer = new sap.m.VBox();

			//oModel.setDefaultCountMode(sap.ui.model.odata.CountMode.None)

			oMetaModel.loaded().then(function(){
				const oEntityType = oMetaModel.getODataEntityType("ZODOA_SRV.CSN")
				//console.log(oMetaModel.getMetaContext(sPath))
				/*
        var oTemplateView = sap.ui.view({
                preprocessors: {
                    xml: {
                        bindingContexts: {
                            //meta: oMetaModel.getMetaContext(sPath)
                        },
                        models: {
                            //meta: oMetaModel
                        }
                    }
                },
                type: sap.ui.core.mvc.ViewType.XML,
                viewName: "sap.ui.demo.basicTemplate.view.Template1"
            });

        //oTemplateView.setModel(oModel);
        //oTemplateView.bindElement(sPath);
        oViewContainer.addItem(oTemplateView);
				*/
			})

			//return oViewContainer;
		}
	});
});
