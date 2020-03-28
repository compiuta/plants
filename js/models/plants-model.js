(function() {
    "use strict";

    let plantsModelHelpers = function() {
        
    }

    let plantsModel = {
        getData: function(searchValue) {
            console.log(searchValue);
            const searchUrl = `https://plantsdb.xyz/search?Common_Name=${searchValue}`;
            console.log(searchUrl);
            fetch(searchUrl)
            .then((response) => response.json())
            .then((data) => {
                app.plantsController.populateData(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        },
        init: function() {
            console.log('Plants Model Initialised');
        }
    }

    window.app = window.app || {};
    window.app.plantsModel = plantsModel;
})(window);