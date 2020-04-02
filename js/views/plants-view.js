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
    function populateItemPage() {
        console.log('populating page');
    }

    function createSearchResultItem(data) {
        const itemData = data;
        const searchItem = document.createElement('a');
        const searchCommonName = document.createElement('h3');
        const searchScienceName = document.createElement('h3');
        const searcItemSymbol = document.createElement('span');

        searchItem.classList.add('plant-search-container');
        searchCommonName.classList.add('plant-name');
        searchScienceName.classList.add('plant-name');
        searcItemSymbol.classList.add('plant-symbol');

        searchCommonName.innerText = itemData.Common_Name;
        searchScienceName.innerText = itemData.Scientific_Name_x;
        searcItemSymbol.innerText = itemData.Symbol;

        searchItem.appendChild(searchCommonName);
        searchItem.appendChild(searchScienceName);
        searchItem.appendChild(searcItemSymbol);

        searchItem.setAttribute('href', 'javascript:void(0);');
        searchItem.setAttribute('data-search-item', itemData.Common_Name);

        searchItem.addEventListener('click', populateItemPage);

        return searchItem;
    }

    function populateSearchResults() {
        searchResults.innerText = '';

        const searchData = app.plantsController.searchData.data;
        const dataFragment = document.createDocumentFragment();

        searchData.forEach(function (element) {
            dataFragment.appendChild(createSearchResultItem(element));
        });

        searchResults.appendChild(dataFragment);
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
        populateSearchResults: function () {
            populateSearchResults();
        }
    }

    window.app = window.app || {};
    window.app.plantsView = plantsView;
}(window));