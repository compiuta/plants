(function (window) {
    "use strict";

    //Get dom elements
    const searchForm = document.querySelector('[data-search="form"]');
    const searchInput = document.querySelector('[data-search="searchInput"]');
    const searchResults = document.querySelector('[data-search="results"]');
    const bodyTag = document.querySelector('[data-element="bodyTag"]');
    const itemPageContainer = document.querySelector('[data-search="itemPage"]');
    const loader = document.querySelector('[data-js="loader"]');
    const currentYearArr = document.querySelectorAll('[data-js="currentYear"]');
    const itemPropertiesContainer = document.querySelector('[data-item="properties"]');
    const itemPageImage = document.querySelector('[data-item="image"]');
    const itemPageTitle = document.querySelector('[data-item="title"]');
    const itemPageId = document.querySelector('[data-item="id"]');
    const itemPageSymbol = document.querySelector('[data-item="symbol"]');
    const ItemPageScienceName = document.querySelector('[data-item="scienceName"]');

    function populateCurrentYear() {
        const currentDate = new Date();
        currentYearArr.forEach(element => {
            element.innerText = currentDate.getFullYear();
        });
    }

    function toggleLoader() {
        loader.classList.toggle('hide');
        loader.classList.toggle('show-loader');
    }

    function togglePageState(pageState) {
        const possibleStates = [
            'landing',
            'search',
            'item',
            'error'
        ];

        possibleStates.forEach(function (element) {
            if (element !== pageState) {
                bodyTag.classList.remove(element);
            } else {
                bodyTag.classList.add(element);
            }
        });
    }

    function createItemPropertyElements(key, value) {
        const propertyContainer = document.createElement('div');
        const propertyTitleContainer = document.createElement('div');
        const propertyTitle = document.createElement('h6');
        const keyNameContainer = document.createElement('div');
        const keyNameElement = document.createElement('h6');

        propertyContainer.classList.add('item-property-container');
        keyNameContainer.classList.add('item-key-name-container');
        keyNameElement.classList.add('item-key-name');
        propertyTitleContainer.classList.add('item-title-container');
        propertyTitle.classList.add('item-property-title');

        keyNameElement.innerText = key;
        propertyTitle.innerText = value;

        keyNameContainer.appendChild(keyNameElement);
        propertyTitleContainer.appendChild(propertyTitle);
        propertyContainer.appendChild(keyNameContainer);
        propertyContainer.appendChild(propertyTitleContainer);

        return propertyContainer;
    }

    function populateItemProperties(data) {

        const fragment = document.createDocumentFragment();

        Object.keys(data).forEach(function(key) {
            if (data[key] !== '') {
                console.log(key);
                const propertyElement = createItemPropertyElements(key, data[key]);
                fragment.appendChild(propertyElement);
            }
        });

        itemPropertiesContainer.appendChild(fragment);
    }

    function formatImageSrc(imageSrc) {
        const imageStringArr = imageSrc.toLowerCase().split(',');
        const imageString = imageStringArr[0].split('/');
        return imageString[0];
    }

    function populateItemInfoArea(data) {
        let  imagePath;

        if(data.Growth_Habit) {
            imagePath = formatImageSrc(data.Growth_Habit);
        } else {
            imagePath = 'default';
        }

        itemPageImage.src = `images/${imagePath}.png`;
        itemPageTitle.innerText = data.Common_Name;
        itemPageId.innerText = data.id
        itemPageSymbol.innerText = data.Symbol
        ItemPageScienceName.innerText = data.Scientific_Name_x;
    }


    function populateItemPage(pageData) {
        console.log(pageData);
        const data = pageData;

        console.log(data);
        console.log(itemPageTitle);

        populateItemProperties(data);
        populateItemInfoArea(data);
    }

    function createSearchResultItem(data) {
        const itemData = data;
        const searchItem = document.createElement('a');
        const searchItemInner = document.createElement('div');
        const searchCommonName = document.createElement('h3');
        const plantImage = document.createElement('img');
        let plantImageSrc;

        if (itemData.Growth_Habit) {
            plantImageSrc = formatImageSrc(itemData.Growth_Habit);
        } else {
            plantImageSrc = 'default';
        }

        searchItem.classList.add('plant-search-container');
        searchItemInner.classList.add('plant-search-inner');
        searchCommonName.classList.add('plant-name');
        plantImage.classList.add('plant-image');

        searchCommonName.innerText = itemData.Common_Name;

        searchItemInner.appendChild(searchCommonName);
        searchItemInner.appendChild(plantImage);
        searchItem.appendChild(searchItemInner);

        searchItem.setAttribute('href', 'javascript:void(0);');
        searchItem.setAttribute('data-plant-id', itemData.id);

        plantImage.setAttribute('src', `images/${plantImageSrc}.png`);

        searchItem.addEventListener('click', app.plantsController.getTargetPageInfo);

        return searchItem;
    }

    function createNoSearchResultsElements() {
        const noResultsContainer = document.createElement('div');
        const noRestultsTitle = document.createElement('h6');

        noResultsContainer.classList.add('no-results');
        noRestultsTitle.classList.add('no-results__title');

        noRestultsTitle.innerText = 'Nothing to see here. Try a different search :)';

        noResultsContainer.appendChild(noRestultsTitle);

        return noResultsContainer;
    }

    function populateSearchResults() {

        searchResults.innerText = '';

        const searchData = app.plantsController.searchData.data;

        console.log(searchData);

        const dataFragment = document.createDocumentFragment();

        if (searchData) {
            searchData.forEach(function (element) {
                dataFragment.appendChild(createSearchResultItem(element));
            });
        } else {
            dataFragment.appendChild(createNoSearchResultsElements());
        }

        searchResults.appendChild(dataFragment);
    }

    //Bind events
    window.addEventListener('load', app.plantsController.navigateBrowserHistory);
    window.addEventListener('popstate', app.plantsController.navigateBrowserHistory);
    searchForm.addEventListener('submit', app.plantsController.formSearch);

    populateCurrentYear();

    console.log('View Initialised');

    const plantsView = {
        getSearchInputValue: function () {
            const searchInputValue = searchInput.value;

            return searchInputValue;
        },
        toggleLoader: function () {
            toggleLoader();
        },
        togglePageState: function (pageState) {
            togglePageState(pageState);
        },
        populateSearchResults: function () {
            populateSearchResults();
        },
        populateItemPage: function (pageData) {
            populateItemPage(pageData);
        }
    }

    window.app = window.app || {};
    window.app.plantsView = plantsView;
}(window));