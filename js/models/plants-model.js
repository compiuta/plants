(function (window) {
    "use strict";

    function getData(searchValue) {

        const searchUrl = `https://plantsdb.xyz/search${searchValue}`;

        fetch(searchUrl)
            .then((response) => response.json())
            .then((data) => {
                app.plantsController.searchData = data;
                app.plantsController.populateData();
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