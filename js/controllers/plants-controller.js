(function (window) {
    "use strict";

    let currentPageState;

    function getCurrentPageState() {
        if (window.location.href.indexOf('search') > -1) {
            currentPageState = 'search';
        } else if (window.location.href.indexOf('page') > -1) {
            currentPageState = 'item-page';
        } else {
            currentPageState = 'landing';
        }
        console.log(`current state is: ${currentPageState} page`);
        app.plantsView.togglePageState(currentPageState);
    }

    function extractSearchParameter() {
        const url = window.location.href;
        const urlSearchParameter = url.substr(url.indexOf("=") + 1);
        const searchParameter = urlSearchParameter.replace(/'+'/g, ' ');
        return searchParameter;
    }

    function extractBaseUrl() {
        const urlArr = window.location.href.split('?');
        const baseUrl = urlArr[0];

        return baseUrl;
    }

    function showSearchResults() {
        const searchParameter = extractSearchParameter();
        app.plantsModel.getData(searchParameter, 'allNames');
    }

    function pushStateToHistory(parameter, isLink) {
        let searchValue;

        if(isLink) {
            searchValue = parameter;
        } else {
            searchValue = `?search&common_name=${parameter}`;
        }

        if ((window.location.href).indexOf("?") > -1) {
            const baseUrl = extractBaseUrl();
            window.history.pushState('page2', 'Title', baseUrl + searchValue);
        } else {
            window.history.pushState('page2', 'Title', window.location.href + searchValue);
        }
    }

    function formSearch(e) {
        e.preventDefault();

        app.plantsView.toggleLoader();
        const searchValue = app.plantsView.getSearchInputValue(e.target);

        pushStateToHistory(searchValue);
        showSearchResults();
    }

    function searchLocalData(propertyToSearch) {
        const savedData = app.plantsController.searchData;
        
        if (savedData && (Object.keys(savedData).length > 0)) {
            const searchedData = savedData.filter(x => x.Symbol === propertyToSearch)[0];
            
            return searchedData;
        } else {
            return undefined;
        }
    }

    function fetchItemPageData(pageData) {
        app.plantsView.populateItemPage(pageData);
        getCurrentPageState();
        app.plantsView.resizePropertyWrappers();
        app.plantsView.toggleLoader();
    }

    function getItemPageData(itemId) {
        let data;

        if (searchLocalData(itemId)) {
            data = searchLocalData(itemId);
        }

        return data;
    }

    function showItemPage() {
        const url = window.location.href;
        const startSliceIndex = url.indexOf('=') + 1;
        const itemId = url.slice(startSliceIndex);
        const pageData = getItemPageData();

        if (pageData) {
            getCurrentPageState();
            app.plantsView.populateItemPage(pageData);
            app.plantsView.toggleLoader();
        } else {
            app.plantsModel.getData(itemId, 'code');
        }
    }

    function getTargetPageInfo(e) {
        app.plantsView.toggleLoader();
        const pageName = e.currentTarget;
        const baseUrl = extractBaseUrl();
        window.history.pushState('page2', pageName, baseUrl + `?page=${pageName.dataset.plantId}`);

        showItemPage();
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
            console.log('navigateBrowserHistory running');
            if (window.location.href.indexOf('search') > -1) {
                app.plantsView.toggleLoader();
                showSearchResults();
            } else if (window.location.href.indexOf('page') > -1) {
                app.plantsView.toggleLoader();
                showItemPage();
            } else {
                getCurrentPageState();
            }
        },
        fetchItemPageData: function(pageData) {
            fetchItemPageData(pageData);
        },
        showItemPage: function () {
            showItemPage();
        },
        getTargetPageInfo: function (e) {
            getTargetPageInfo(e);
        },
        populateData: function () {
            app.plantsView.populateSearchResults();
            getCurrentPageState();
            app.plantsView.toggleLoader();
        },
        pushStateToHistory: function (parameter, isLink) {
            pushStateToHistory(parameter, isLink);
        }
    }

    window.app = window.app || {};
    window.app.plantsController = plantsController;
}(window));