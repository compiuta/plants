(function (window) {
    "use strict";

    function getData(searchValue) {

        const searchUrl = `https://plantsdb.xyz/search?limit=30&${searchValue}`;
        console.log(searchUrl);

        fetch(searchUrl)
            .then((response) => response.json())
            .then((data) => {

                app.plantsController.searchData = data;

                if (searchValue.indexOf('id') > -1) {
                    console.log('hello ' + data);
                    app.plantsController.fetchItemPageData(data.data[0]);
                } else {
                    app.plantsController.populateData();
                }
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