(function(window) {
    "use strict";

    let plantsControllerHelpers = {
        
    }
    
    let plantsController = {
        formSearch: function(e) {
            e.preventDefault();
            console.log('searching...');
        },
        init: function() {
            app.plantsModel.init();
            app.plantsView.init();
            console.log('Plants Controller Initialised');
        }
    }

    window.app = window.app || {};
    window.app.plantsController = plantsController;
    app.plantsController.init();
})(window);