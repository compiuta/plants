(function(window) {
    "use strict";

    let plantsViewHelpers = {
        getDomElements: function() {
            app.plantsView.searchForm = document.querySelector('[data-search="form"]');
            app.plantsView.searchInput = document.querySelector('[data-search="searchInput"]');
            app.plantsView.searchResults = document.querySelector('[data-search="results"]');
        },
        bindEvents: function() {
            window.addEventListener('load', app.plantsController.showSearchResults);
            window.addEventListener('popstate', app.plantsController.navigateBroserHistory);
            app.plantsView.searchForm.addEventListener('submit', app.plantsController.formSearch);
        }
    }

    let plantsView = {
        populateElements: function(data) {
            app.plantsView.searchResults.innerText = '';
            app.plantsView.searchResults.innerText = data;
        },
        init: function() {
            plantsViewHelpers.getDomElements();
            plantsViewHelpers.bindEvents();
            console.log('Plants View Initialised');
        }
    }

    window.app = window.app || {};
    window.app.plantsView = plantsView;
})(window);