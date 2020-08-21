(function (window) {
    "use strict";

    function formatData(data) {
        const plantData = data.results;
        let plantObjectArr = [];

        plantData.forEach(el => {
            if (el.recordType === 'SPECIES') {
                const plantObject = {
                    id: el.elementGlobalId,
                    Symbol: el.elcode,
                    Scientific_Name_x: el.scientificName,
                    Species: el.speciesGlobal.family,
                    Common_Name: el.primaryCommonName,
                    Class: el.speciesGlobal.taxclass,
                    SubKingdom: el.speciesGlobal.phylum,
                    Kingdom: el.speciesGlobal.kingdom,
                    Genus: el.speciesGlobal.genus
                }
    
                plantObjectArr.push(plantObject);
            }
        });

        return plantObjectArr;

    }

    function getData(searchValue, populatePage) {
        const searchUrl = `https://explorer.natureserve.org/api/data/search`;
    
        const sendObj = {
            "criteriaType" : "combined",
            "textCriteria" : [
              {
            "paramType" : "quickSearch",
            "searchToken" : `${searchValue}`
          }
          ],
            "statusCriteria" : [ ],
            "locationCriteria" : [ ],
            "pagingOptions" : {
              "page" : null,
              "recordsPerPage" : null
            },
            "recordSubtypeCriteria" : [ ],
            "modifiedSince" : null,
            "locationOptions" : null,
            "classificationOptions" : null,
            "recordTypeCriteria" : [ ]
          }
          console.log(searchValue);

        fetch(searchUrl, {
           method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(sendObj)
        })
            .then((response) => response.json())
            .then((data) => {

                const plantData = formatData(data);

                app.plantsController.searchData = plantData;

                console.log(plantData)

                if (populatePage) {
                    console.log('hello ' + plantData);
                    app.plantsController.fetchItemPageData(plantData);
                } else {
                    app.plantsController.populateData();
                }
            })
            .catch((error) => {
                app.plantsController.searchData = [];
                app.plantsController.populateData();
                console.error('Error:', error);
            });
    }

    console.log('Model Initialised');

    const plantsModel = {
        getData: function (searchValue, populatePage) {
            getData(searchValue, populatePage);
        }
    }

    window.app = window.app || {};
    window.app.plantsModel = plantsModel;
}(window));