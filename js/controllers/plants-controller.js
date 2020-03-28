(function(window) {
    "use strict";

    let plantsControllerHelpers = {
        
    }
    
    let plantsController = {
        formSearch: function(e) {
            e.preventDefault();
            app.plantsModel.getData(app.plantsView.searchInput.value);
            app.plantsView.searchInput.value = '';
            
            
        },
        populateData: function(data) {
            const searchData = JSON.stringify(data);
            app.plantsView.populateElements(searchData);
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