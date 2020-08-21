(function (window) {
    "use strict";

    function formatData(data) {
        const plantData = data.results;
        let plantObjectArr = [];

        plantData.forEach(el => {
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
        });

        return plantObjectArr;

    }

    function getData(searchValue, searchType) {
        const searchUrl = `https://explorer.natureserve.org/api/data/speciesSearch`;
    
        const sendObj = {
            "criteriaType" : "species",
            "textCriteria" : [ 
                  {
                    "paramType" : "textSearch",
                    "searchToken" : searchValue,
                    "matchAgainst" : searchType,
                    "operator" : "contains"
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
            "speciesTaxonomyCriteria" : [
                {
                    "paramType" : "scientificTaxonomy",
                    "level" : "KINGDOM",
                    "scientificTaxonomy" : "Plantae"
                  }
             ]
          }

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

                if (searchType === 'code') {
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
        getData: function (searchValue, searchType) {
            getData(searchValue, searchType);
        }
    }

    window.app = window.app || {};
    window.app.plantsModel = plantsModel;
}(window));