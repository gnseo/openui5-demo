sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
  "sap/ui/core/routing/History"
], function(Controller, History, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("sap.ui.demo.basicTemplate.controller.Detail", {
		csnPath: "",

		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			const csnPath = oEvent.getParameter("arguments").csnPath
			this.csnPath = csnPath
      this.getView().bindElement({
				path: "/" + csnPath,
				model: "csn"
			});
		},

		onNavBack: function () {
			let oHistory = sap.ui.core.routing.History.getInstance();
			let sPreviousHash = oHistory.getPreviousHash();
      //console.log(sPreviousHash)

			const oModel = this.getOwnerComponent().getModel('csn')
			const thisView = this.getView()
			const thisController = this

			if ( oModel.hasPendingChanges() ){
				let bCompact = !!thisView.$().closest(".sapUiSizeCompact").length;
				sap.m.MessageBox.show(`Do you want to lose changes?`, {
					icon: sap.m.MessageBox.Icon.INFO,
					title: "Lose Changes",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					id: "lost_changes",
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					contentWidth: "100px",
					onClose: function(oAction){
						if ( oAction === sap.m.MessageBox.Action.YES ){
							oModel.resetChanges()
							if (sPreviousHash !== undefined) {
								window.history.go(-1);
							} else {
								let oRouter = sap.ui.core.UIComponent.getRouterFor(thisController);
								oRouter.navTo("home", {}, true);
							}
						}
					}
				});
			}else{
				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					let oRouter = sap.ui.core.UIComponent.getRouterFor(thisController);
					oRouter.navTo("home", {}, true);
				}
			}

		},

		onUpdate: function (event) {
			const thisView = this.getView()
			const oModel = this.getOwnerComponent().getModel('csn')
			const csnPath = this.csnPath

			console.log(oModel.getPendingChanges())
			if ( Object.keys(oModel.getPendingChanges()).length === 0 ){
				let msg = 'Nothing changed, thus the Update did not run';
				sap.m.MessageToast.show(msg);
			}else{
				Object.keys(oModel.getPendingChanges()).map((key) => {
					oModel.update(`/${key}`, oModel.getPendingChanges()[key], {
						success: function(oData, response){
							//console.log("Update successfully", arguments)
							if ( response.statusCode === "204" ){
								if ( response.headers.succeed === "true" ){
									let bCompact = !!thisView.$().closest(".sapUiSizeCompact").length;
									sap.m.MessageBox.show(``, {
										icon: sap.m.MessageBox.Icon.SUCCESS,
										title: "Succeed",
										actions: [sap.m.MessageBox.Action.CLOSE],
										id: "messageBoxId2",
										details: response,
										styleClass: bCompact ? "sapUiSizeCompact" : "",
										contentWidth: "100px"
									});
								}else{
										let bCompact = !!thisView.$().closest(".sapUiSizeCompact").length;
										sap.m.MessageBox.show(`Error Occured`, {
											icon: sap.m.MessageBox.Icon.ERROR,
											title: response.statusText,
											actions: [sap.m.MessageBox.Action.CLOSE],
											id: "messageBoxId2",
											details: response,
											styleClass: bCompact ? "sapUiSizeCompact" : "",
											contentWidth: "100px"
										});
								}
							}else{
								let bCompact = !!thisView.$().closest(".sapUiSizeCompact").length;
								sap.m.MessageBox.show(`Status Code: ${response.statusCode}\n` +
										`Status Text: ${response.statusText}`, {
									icon: sap.m.MessageBox.Icon.ERROR,
									title: response.statusText,
									actions: [sap.m.MessageBox.Action.CLOSE],
									id: "messageBoxId2",
									details: response,
									styleClass: bCompact ? "sapUiSizeCompact" : "",
									contentWidth: "100px"
								});
							}
						},
						error: function(e){
							let bCompact = !!thisView.$().closest(".sapUiSizeCompact").length;

							sap.m.MessageBox.show(`Status Code: ${e.statusCode}\n` +
									`Status Text: ${e.statusText}`, {
								icon: sap.m.MessageBox.Icon.ERROR,
								title: e.message,
								actions: [sap.m.MessageBox.Action.CLOSE],
								id: "messageBoxId2",
								details: e.statusCode === 500 ? e.responseText : JSON.parse(e.responseText),
								styleClass: bCompact ? "sapUiSizeCompact" : "",
								contentWidth: "100px"
							});
						}
					})
				}
				)
			}
		},

				onCreate: function (event) {
					const thisView = this.getView()
					const oModel = this.getOwnerComponent().getModel('csn')
					const csnPath = this.csnPath

					console.log(oModel.getProperty(`/${csnPath}`))
					console.log(oModel.getPendingChanges())

						oModel.create(`/CSNSet`, oModel.getProperty(`/${csnPath}`), {
							success: function(oData, response){
								console.log("Create successfully", arguments)
								oModel.resetChanges()

					      let oRouter = sap.ui.core.UIComponent.getRouterFor(thisView);
								oRouter.navTo("detail", {
									csnPath: `CSNSet(Vkorg='${oData['Vkorg']}',Onum='${oData['Onum']}')`
								});

								if ( response.statusCode === "201" ){
									if ( "sap-message" in response.headers ){
										let sapMsg = JSON.parse(response.headers["sap-message"])
										console.log(sapMsg)

										let bCompact = !!thisView.$().closest(".sapUiSizeCompact").length;
										sap.m.MessageBox.show(`${sapMsg.severity} - ${sapMsg.code} - ${sapMsg.message}`, {
											icon: sap.m.MessageBox.Icon.SUCCESS,
											title: "Succeed",
											actions: [sap.m.MessageBox.Action.CLOSE],
											id: "messageBoxId2",
											details: response,
											styleClass: bCompact ? "sapUiSizeCompact" : "",
											contentWidth: "100px"
										});
									}else{
											let bCompact = !!thisView.$().closest(".sapUiSizeCompact").length;
											sap.m.MessageBox.show(`Error Occured`, {
												icon: sap.m.MessageBox.Icon.ERROR,
												title: response.statusText,
												actions: [sap.m.MessageBox.Action.CLOSE],
												id: "messageBoxId2",
												details: response,
												styleClass: bCompact ? "sapUiSizeCompact" : "",
												contentWidth: "100px"
											});
									}
								}else{
									let bCompact = !!thisView.$().closest(".sapUiSizeCompact").length;
									sap.m.MessageBox.show(`Status Code: ${response.statusCode}\n` +
											`Status Text: ${response.statusText}`, {
										icon: sap.m.MessageBox.Icon.ERROR,
										title: response.statusText,
										actions: [sap.m.MessageBox.Action.CLOSE],
										id: "messageBoxId2",
										details: response,
										styleClass: bCompact ? "sapUiSizeCompact" : "",
										contentWidth: "100px"
									});
								}
							},
							error: function(e){
								let bCompact = !!thisView.$().closest(".sapUiSizeCompact").length;

								sap.m.MessageBox.show(`Status Code: ${e.statusCode}\n` +
										`Status Text: ${e.statusText}`, {
									icon: sap.m.MessageBox.Icon.ERROR,
									title: e.message,
									actions: [sap.m.MessageBox.Action.CLOSE],
									id: "messageBoxId2",
									details: e.statusCode === 500 ? e.responseText : JSON.parse(e.responseText),
									styleClass: bCompact ? "sapUiSizeCompact" : "",
									contentWidth: "100px"
								});
							}
						})
				},

						onDelete: function (event) {
							const thisView = this.getView()
							const oModel = this.getOwnerComponent().getModel('csn')
							const csnPath = this.csnPath

							console.log(oModel.getProperty(`/${csnPath}`))
							console.log(oModel.getPendingChanges())

								oModel.remove(`/${csnPath}`, {
									success: function(oData, response){
										console.log("Delete successfully", arguments)

							      let oRouter = sap.ui.core.UIComponent.getRouterFor(thisView);
										oRouter.navTo("home", {}, true);

										if ( "sap-message" in response.headers ){
											let sapMsg = JSON.parse(response.headers["sap-message"])
											console.log(sapMsg)

											let bCompact = !!thisView.$().closest(".sapUiSizeCompact").length;
											sap.m.MessageBox.show(`${sapMsg.severity} - ${sapMsg.code} - ${sapMsg.message}`, {
												icon: sap.m.MessageBox.Icon.SUCCESS,
												title: "Succeed",
												actions: [sap.m.MessageBox.Action.CLOSE],
												id: "messageBoxId2",
												details: response,
												styleClass: bCompact ? "sapUiSizeCompact" : "",
												contentWidth: "100px"
											});
										}else{
											let bCompact = !!thisView.$().closest(".sapUiSizeCompact").length;
											sap.m.MessageBox.show(`Status Code: ${response.statusCode}\n` +
													`Status Text: ${response.statusText}`, {
												icon: sap.m.MessageBox.Icon.ERROR,
												title: response.statusText,
												actions: [sap.m.MessageBox.Action.CLOSE],
												id: "messageBoxId2",
												details: response,
												styleClass: bCompact ? "sapUiSizeCompact" : "",
												contentWidth: "100px"
											});
										}
									},
									error: function(e){
										let bCompact = !!thisView.$().closest(".sapUiSizeCompact").length;

										sap.m.MessageBox.show(`Status Code: ${e.statusCode}\n` +
												`Status Text: ${e.statusText}`, {
											icon: sap.m.MessageBox.Icon.ERROR,
											title: e.message,
											actions: [sap.m.MessageBox.Action.CLOSE],
											id: "messageBoxId2",
											details: e.statusCode === 500 ? e.responseText : JSON.parse(e.responseText),
											styleClass: bCompact ? "sapUiSizeCompact" : "",
											contentWidth: "100px"
										});
									}
								})
						}
  })
});
