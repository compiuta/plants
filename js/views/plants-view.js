(function(window) {
    "use strict";

    let plantsViewHelpers = {
        getDomElements: function() {
            app.plantsView.searchForm = document.querySelector('[data-search="form"]');
            app.plantsView.searchInput = document.querySelector('[data-search="searchInput"]');
        },
        bindEvents: function() {
            app.plantsView.searchForm.addEventListener('submit', app.plantsController.formSearch);
        }
    }

    let plantsView = {

        init: function() {
            plantsViewHelpers.getDomElements();
            plantsViewHelpers.bindEvents();
            console.log('Plants View Initialised');
        }
    }

    window.app = window.app || {};
    window.app.plantsView = plantsView;
})(window);