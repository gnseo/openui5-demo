sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.demo.basicTemplate.controller.OverviewList", {

		onInit: function () {
			//sap.ui.getCore().byId("hh").setValue("ffs")
			const thisView = this.getView()
			//page.setBusy(true)
			console.log("OverviewList Controller", this)

			const oModel = this.getOwnerComponent().getModel('csn')
			const oMetaModel = oModel.getMetaModel()
			oMetaModel.loaded().then(function(result){
				console.log(oMetaModel)
      })
		},

    onPressItem: function(oEvent){
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView());
			var oItem = oEvent.getSource();
			oRouter.navTo("detail", {
				csnPath: oItem.getBindingContext("csn").getPath().substr(1)
			});
    },

		onFilterInvoices : function (oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Vkorg", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.getView().byId("csnList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}

  })
});
