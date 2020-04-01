(function (window) {
    "use strict";

    function getData(searchValue) {

        const searchUrl = `https://plantsdb.xyz/search${searchValue}`;

        fetch(searchUrl)
            .then((response) => response.json())
            .then((data) => {
                const currentSearchData = JSON.stringify(data);
                app.plantsController.searchData = currentSearchData;
                app.plantsController.populateData(currentSearchData);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    console.log('Model Initialised');

    const plantsModel = {
        getData: function (searchValue) {
            getData(searchValue);
        }
    }

    window.app = window.app || {};
    window.app.plantsModel = plantsModel;
}(window));