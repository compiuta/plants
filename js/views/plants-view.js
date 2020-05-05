(function (window) {
    "use strict";

    const searchFormElements = document.querySelectorAll('[data-search="form"]');
    const searchResults = document.querySelector('[data-search="results"]');
    const bodyTag = document.querySelector('[data-element="bodyTag"]');
    const loader = document.querySelector('[data-js="loader"]');
    const currentYearArr = document.querySelectorAll('[data-js="currentYear"]');
    const itemPropertiesContainer = document.querySelector('[data-item="properties"]');
    const itemInnerContainer = document.querySelector('[data-item="innerPropertiesContainer"]');
    const itemPageImage = document.querySelector('[data-item="image"]');
    const itemPageTitle = document.querySelector('[data-item="title"]');
    const itemPageId = document.querySelector('[data-item="id"]');
    const itemPageSymbol = document.querySelector('[data-item="symbol"]');
    const ItemPageScienceName = document.querySelector('[data-item="scienceName"]');
    let showSliderButton = document.querySelector('[data-js="showPropertiesSlider"]');
    let showListButton = document.querySelector('[data-js="showPropertiesList"]');
    let searchSimilarPlantButton = document.querySelector('[data-item-page="searchSimilarPlantLink"]');
    let currentJsLinks = document.querySelectorAll('[data-js="link"]');
    let sliderLeftButton;
    let sliderRightButton;
    let itemPagePropertyWrapArr;
    let activeSlider = 1;
    let slidesCount;

    function anchorJsLinkHandle(e) {
        const clickedAnchorParameters = e.target.dataset.parameters;

        app.plantsController.pushStateToHistory(clickedAnchorParameters, true);
        app.plantsController.navigateBrowserHistory();
    }

    currentJsLinks.forEach(function (anchor) {
        anchor.addEventListener('click', anchorJsLinkHandle);
    });

    function populateCurrentYear() {
        const currentDate = new Date();

        currentYearArr.forEach(function (element) {
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
            'item-page',
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

    function createContainerForPropertyElements(iteration) {
        const container = document.createElement('div');

        container.classList.add('item-properties-wrap');

        container.setAttribute('data-item', 'itemPropertiesWrap');
        container.setAttribute('data-slider-index', iteration);

        return container;
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

        keyNameElement.innerText = key.replace(/_/g, ' ');
        propertyTitle.innerText = value;

        keyNameContainer.appendChild(keyNameElement);
        propertyTitleContainer.appendChild(propertyTitle);
        propertyContainer.appendChild(keyNameContainer);
        propertyContainer.appendChild(propertyTitleContainer);

        return propertyContainer;
    }

    function populateItemProperties(data) {
        const fragment = document.createDocumentFragment();
        let indexCount = 1;
        let propertyContainerIteration = 1;
        let propertiesWrap = createContainerForPropertyElements(propertyContainerIteration);

        Object.keys(data).forEach(function (key, index) {
            if (data[key] !== '') {
                const propertyElement = createItemPropertyElements(key, data[key]);

                propertiesWrap.appendChild(propertyElement);

                indexCount += 1;

                if ((indexCount % 6) === 0 || (index += 1) === Object.keys(data).length) {
                    propertyContainerIteration += 1;
                    fragment.appendChild(propertiesWrap);
                    propertiesWrap = createContainerForPropertyElements(propertyContainerIteration);
                }
            } else if ((index += 1) === Object.keys(data).length) {
                fragment.appendChild(propertiesWrap);
            }
        });

        itemPropertiesContainer.appendChild(fragment);

        itemPropertiesContainer.style.left = `0px`;
        activeSlider = 1;
        searchSimilarPlantButton.setAttribute('data-parameters', `?search&Family=${data.Family}`);
    }

    function formatImageSrc(imageSrc) {
        const imageStringArr = imageSrc.toLowerCase().split(',');
        const imageString = imageStringArr[0].split('/');

        return imageString[0];
    }

    function populateItemInfoArea(data) {
        let imagePath;

        if (data.Growth_Habit) {
            imagePath = formatImageSrc(data.Growth_Habit);
        } else {
            imagePath = 'default';
        }

        itemPageImage.src = `images/${imagePath}.png`;
        itemPageTitle.innerText = data.Common_Name;
        itemPageId.innerText = data.id;
        itemPageSymbol.innerText = data.Symbol;
        ItemPageScienceName.innerText = data.Scientific_Name_x;
    }

    function itemPropertiesContainerPosition() {
        const sliceTo = itemPropertiesContainer.style.left.indexOf('p');

        return +itemPropertiesContainer.style.left.slice(0, sliceTo);
    }

    function sliderResize() {
        const itemPropertiesContainerCurrentSize = itemPropertiesContainerPosition();
        const currentSingleItemPropertySize = Math.ceil(itemPagePropertyWrapArr[0].offsetWidth);
        let newitemPropertiesPosition;
        let currentTimeout;

        if (itemPropertiesContainerCurrentSize < 0) {
            itemPropertiesContainer.classList.remove('slide-transition');
            newitemPropertiesPosition = `-${currentSingleItemPropertySize * (activeSlider - 1)}px`;
            itemPropertiesContainer.style.left = newitemPropertiesPosition;
            clearTimeout(currentTimeout);
            currentTimeout = setTimeout(function () {
                itemPropertiesContainer.classList.add('slide-transition');
            }, 200);
        }
    }

    function resizePropertyWrappers() {
        const itemInnerContainerWidth = `${Math.ceil(itemInnerContainer.offsetWidth)}px`;

        itemPagePropertyWrapArr.forEach(function (element) {
            element.style.width = itemInnerContainerWidth;
        });

        sliderResize();
    }

    function hideShowSliderButtons() {
        if (activeSlider === 1) {
            sliderLeftButton.classList.add('hide');
        } else {
            sliderLeftButton.classList.remove('hide');
        }

        if (activeSlider === slidesCount) {
            sliderRightButton.classList.add('hide');
        } else {
            sliderRightButton.classList.remove('hide');
        }
    }

    function moveSlider(e) {
        const sliderDirection = e.target.dataset.sliderDirection;
        const itemPropertiesContainerSize = itemPropertiesContainerPosition();
        let newSliderSize;

        if (sliderDirection === 'left') {
            newSliderSize = itemInnerContainer.offsetWidth;
            activeSlider -= 1;
        } else {
            newSliderSize = +('-' + itemInnerContainer.offsetWidth);
            activeSlider += 1;
        }

        itemPropertiesContainer.style.left = itemPropertiesContainerSize + newSliderSize + 'px';

        hideShowSliderButtons();
    }

    function populateItemPage(pageData) {
        const data = pageData;

        populateItemProperties(data);
        populateItemInfoArea(data);

        itemPagePropertyWrapArr = document.querySelectorAll('[data-item="itemPropertiesWrap"]');
        sliderLeftButton = document.querySelector('[data-slider="leftButton"]');
        sliderRightButton = document.querySelector('[data-slider="rightButton"]');
        slidesCount = itemPagePropertyWrapArr.length;

        sliderLeftButton.addEventListener('click', moveSlider);
        sliderRightButton.addEventListener('click', moveSlider);

        window.addEventListener('resize', resizePropertyWrappers);

        resizePropertyWrappers();
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
        const searchData = app.plantsController.searchData.data;
        const dataFragment = document.createDocumentFragment();

        searchResults.innerText = '';

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
    window.addEventListener('load', function () {
        console.log('load event')
        app.plantsController.navigateBrowserHistory();
    });
    window.addEventListener('popstate', function () {
        console.log('popstate event')
        app.plantsController.navigateBrowserHistory();
    });
    searchFormElements.forEach(function (element) {
        element.addEventListener('submit', app.plantsController.formSearch);
    });

    populateCurrentYear();

    console.log('View Initialised');

    const plantsView = {
        getSearchInputValue: function (form) {
            const searchInputValue = form.querySelector('[data-search="searchInput"]').value;

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
        },
        resizePropertyWrappers: function () {
            resizePropertyWrappers();
            console.log('resizing');
        }
    }

    window.app = window.app || {};
    window.app.plantsView = plantsView;
}(window));