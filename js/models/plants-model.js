(function() {
    "use strict";

    function getData(searchValue) {
            
        const searchUrl = `https://plantsdb.xyz/search${searchValue}`;
        
        fetch(searchUrl)
        .then((response) => response.json())
        .then((data) => {
            app.plantsController.populateData(JSON.stringify(data));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    let plantsModel = {
        getData: function (searchValue) {
            getData(searchValue);
        }
    }

    window.app = window.app || {};
    window.app.plantsModel = plantsModel;
})(window);