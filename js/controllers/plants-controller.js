(function (window) {
    "use strict";

    let currentPageState;

    function getCurrentPageState() {
        console.log('getting state');
        if (window.location.href.indexOf('?') > -1) {
            currentPageState = 'search';
        } else if (window.location.href.indexOf('page') > -1) {
            currentPageState = 'item';
        } else {
            currentPageState = 'landing';
        }
        console.log(currentPageState);
        app.plantsView.togglePageState(currentPageState);
    }

    function extractSearchParameter() {
        const url = window.location.href;
        const searchParameter = url.substr(url.indexOf("?"));

        return searchParameter;
    }

    function extractBaseUrl() {
        const urlArr = window.location.href.split('?');
        const baseUrl = urlArr[0];

        return baseUrl;
    }

    function showSearchResults() {
        const searchParameter = extractSearchParameter();
        app.plantsModel.getData(searchParameter);
    }

    function formSearch(e) {
        e.preventDefault();
        const searchValue = app.plantsView.getSearchInputValue();

        if ((window.location.href).indexOf("?") > -1) {
            const baseUrl = extractBaseUrl();
            window.history.pushState('page2', 'Title', baseUrl + `?Common_Name=${searchValue}`);
        } else {
            window.history.pushState('page2', 'Title', window.location.href + `?Common_Name=${searchValue}`);
        }

        getCurrentPageState();

        showSearchResults();
    }

    function showItemPage() {
        app.plantsView.populateItemPage();
    }

    console.log('Controller Initialised');

    const plantsController = {
        searchData: {},
        formSearch: function (e) {
            formSearch(e);
        },
        showSearchResults: function () {
            showSearchResults();
        },
        navigateBrowserHistory: function () {
            getCurrentPageState();

            if (currentPageState === 'search') {
                showSearchResults();
            } else if (currentPageState === 'item') {
                showItemPage();
            }
        },
        showItemPage: function () {
            showItemPage();
        },
        populateData: function () {
            app.plantsView.populateSearchResults();
        }
    }

    window.app = window.app || {};
    window.app.plantsController = plantsController;
}(window));