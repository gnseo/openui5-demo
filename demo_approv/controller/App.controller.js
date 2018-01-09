sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("sap.ui.demo.basicTemplate.controller.App", {

		onInitt: function () {
			//sap.ui.getCore().byId("hh").setValue("ffs")
			const thisView = this.getView()
			const page = this.getView().byId("page")
			const csn_form = this.getView().byId("csn-form")
			const test_label = this.getView().byId("test_label")

			//page.setBusy(true)

			const oModel = this.getOwnerComponent().getModel('csn')
			const oMetaModel = oModel.getMetaModel()
			oMetaModel.loaded().then(function(result){
				return;
				/*
				const oEntityType = oMetaModel.getODataEntityType("ZODOA_SRV.CSN")
				const oProperty = oMetaModel.getODataProperty(oEntityType, 'Vkorg')
				oEntityType.property.map(prop => {
					csn_form.getFormContainers().map((cont, index) => {
						cont.addFormElement(new sap.ui.layout.form.FormElement({
								fields: [new sap.m.Input({
									id: prop["name"],
									maxLength: prop["maxLength"] && parseInt(prop["maxLength"])
								})]
							}).setLabel(new sap.m.Label({
								text: prop["sap:label"],
								labelFor: prop["name"]
							}))
						)
					})
				})
				*/
				/*
				oModel.read("/CSNSet(Vkorg='1610',Onum='')", {
						success: function(oData, response){
							//hh_input.setValue(oData.Zoabh)
							console.log("oData", oData)
							console.log("response", response)
							page.setBusy(false)
						},
						error: function(oError){
							console.log("error", oError)
							page.setBusy(false)
						}
					}
				)
				*/
			})

		}
	});
});
