(function (window) {
    "use strict";

    let currentPageState;

    function getCurrentPageState() {
        console.log('getting state');
        if (window.location.href.indexOf('search') > -1) {
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
        const searchParameter = url.substr(url.indexOf("&") + 1);

        return searchParameter;
    }

    function extractBaseUrl() {
        const urlArr = window.location.href.split('?');
        const baseUrl = urlArr[0];

        return baseUrl;
    }

    function showSearchResults() {
        const searchParameter = extractSearchParameter();
        console.log(searchParameter);
        app.plantsModel.getData(searchParameter);
    }

    function formSearch(e) {
        e.preventDefault();
        const searchValue = app.plantsView.getSearchInputValue();

        if ((window.location.href).indexOf("?") > -1) {
            const baseUrl = extractBaseUrl();
            window.history.pushState('page2', 'Title', baseUrl + `?search&Common_Name=${searchValue}`);
        } else {
            window.history.pushState('page2', 'Title', window.location.href + `?search&Common_Name=${searchValue}`);
        }

        showSearchResults();
    }

    function searchLocalData(propertyToSearch) {
        const savedData = app.plantsController.searchData.data;

        if (savedData) {
            const searchedData = savedData.filter(x => x.id === (+propertyToSearch))[0];
            return searchedData;
        } else {
            return undefined;
        }
    }

    function fetchItemPageData(pageData) {
        app.plantsView.populateItemPage(pageData);
        getCurrentPageState();
    }

    function getItemPageData() {
        const url = window.location.href;
        const startSliceIndex = url.indexOf('=') + 1;
        const itemId = url.slice(startSliceIndex);
        let data;

        if (searchLocalData(itemId)) {
            data =  searchLocalData(itemId);
            return data;
        } else {
            console.log(`?id=${itemId}`);
            app.plantsModel.getData(`?id=${itemId}`);
        }
    }

    function showItemPage() {

        const pageData = getItemPageData();

        if (pageData) {
            getCurrentPageState();

            app.plantsView.populateItemPage(pageData);
        } else {
            return;
        }
    }

    function getTargetPageInfo(e) {
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
        navigateBrowserHistory: function (e) {

            if (window.location.href.indexOf('search') > -1) {
                showSearchResults();
            } else if (window.location.href.indexOf('page') > -1) {
                showItemPage();
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
        }
    }

    window.app = window.app || {};
    window.app.plantsController = plantsController;
}(window));