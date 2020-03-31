(function(window) {
    "use strict";

    function extractBaseUrl() {
        const urlArr = window.location.href.split('?');
        const baseUrl = urlArr[0];

        return baseUrl;
    }

    function showSearchResults() {
        if(window.location.href.indexOf("?") > -1) {
            const searchParameter = extractSearchParameter();
            app.plantsModel.getData(searchParameter);
        }

        return;
    }

    function formSearch(e) {
        e.preventDefault();
        const searchValue = app.plantsView.getSearchInputValue();

        if((window.location.href).indexOf("?") > -1) {
            const baseUrl = extractBaseUrl();
            window.history.pushState('page2', 'Title', baseUrl + `?Common_Name=${searchValue}`);
        } else {
            window.history.pushState('page2', 'Title', window.location.href + `?Common_Name=${searchValue}`);
        }

        showSearchResults();
    }

    function extractSearchParameter() {
        const url = window.location.href;
        const searchParameter = url.substr(url.indexOf("?"));

        return searchParameter;
    }
    
    let plantsController = {
        formSearch: function(e) {
            formSearch(e);
        },
        showSearchResults: function() {
            showSearchResults();
        },
        navigateBrowserHistory: function() {
            if(window.location.href.indexOf("?") > -1) {
                showSearchResults();
            } else {
                app.plantsView.render();
            }
        },
        populateData: function(data) {
            app.plantsView.render(data);
        }
    }

    window.app = window.app || {};
    window.app.plantsController = plantsController;
})(window);