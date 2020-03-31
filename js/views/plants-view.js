(function(window) {
    "use strict";

    //Get dom elements
    const searchForm = document.querySelector('[data-search="form"]');
    const searchInput = document.querySelector('[data-search="searchInput"]');
    const searchResults = document.querySelector('[data-search="results"]');
    
    //Bind events
    window.addEventListener('load', app.plantsController.showSearchResults);
    window.addEventListener('popstate', app.plantsController.navigateBrowserHistory);
    searchForm.addEventListener('submit', app.plantsController.formSearch);
        

    let plantsView = {
        getSearchInputValue: function() {
            const searchInputValue = searchInput.value;

            return searchInputValue;
        },
        render: function(data) {
            searchResults.innerText = '';
            
            if(data) {
                searchResults.innerText = data;
            }
        }
    }

    window.app = window.app || {};
    window.app.plantsView = plantsView;
})(window);