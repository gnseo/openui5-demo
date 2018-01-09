sap.ui.define([
	"sap/ui/core/mvc/Controller",
  "sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";

	return Controller.extend("sap.ui.demo.basicTemplate.controller.Detail", {

		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
      this.getView().bindElement({
				path: "/" + oEvent.getParameter("arguments").csnPath,
				model: "csn"
			});
		},

		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
      console.log(sPreviousHash)

      window.history.back();
      /*
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("home", {}, false);
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("home", {}, true);
			}
      */
		}

  })
});
