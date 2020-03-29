(function(window) {
    "use strict";

    let plantsControllerHelpers = {
        
    }
    
    let plantsController = {
        formSearch: function(e) {
            e.preventDefault();
            const searchValue = app.plantsView.searchInput.value;

            if((window.location.href).indexOf("?") > -1) {
                const baseUrl = app.plantsController.extractBaseUrl();
                window.location.href = baseUrl + `?Common_Name=${searchValue}`;
            } else {
                window.location.href = window.location.href + `?Common_Name=${searchValue}`;
            }
        },
        extractBaseUrl: function() {
            const urlArr = window.location.href.split('?');
            const baseUrl = urlArr[0];

            return baseUrl;
        },
        showSearchResults: function() {
            if(window.location.href.indexOf("?") > -1) {
                const searchParameter = app.plantsController.extractSearchParameter();
                app.plantsModel.getData(searchParameter);
            }

            return;
            
        },
        extractSearchParameter: function() {
            const url = window.location.href;
            const searchParameter = url.substr(url.indexOf("?"));

            return searchParameter;
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