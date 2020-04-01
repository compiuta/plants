(function (window) {
    "use strict";

    //Get dom elements
    const searchForm = document.querySelector('[data-search="form"]');
    const searchInput = document.querySelector('[data-search="searchInput"]');
    const searchResults = document.querySelector('[data-search="results"]');
    const bodyTag = document.querySelector('[data-element="bodyTag"]');

    function togglePageState(pageState) {
        const possibleStates = [
            'landing',
            'search',
            'item'
        ];

        possibleStates.forEach(function (element) {
            if (element !== pageState) {
                bodyTag.classList.remove(element);
            } else {
                bodyTag.classList.add(element);
            }
        });
    }

    //Bind events
    window.addEventListener('load', app.plantsController.navigateBrowserHistory);
    window.addEventListener('popstate', app.plantsController.navigateBrowserHistory);
    searchForm.addEventListener('submit', app.plantsController.formSearch);

    console.log('View Initialised');

    const plantsView = {
        getSearchInputValue: function () {
            const searchInputValue = searchInput.value;

            return searchInputValue;
        },
        togglePageState: function (pageState) {
            togglePageState(pageState);
        },
        populateSearchResults: function (data) {
            searchResults.innerText = '';

            if (data) {
                searchResults.innerText = data;
            }
        },
        populateItemPage: function () {
            app.plantsController.getCurrentPageState();
            console.log('item page');
        }
    }

    window.app = window.app || {};
    window.app.plantsView = plantsView;
}(window));