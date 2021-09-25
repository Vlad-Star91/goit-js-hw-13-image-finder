const debounce = require('lodash.debounce');

import animateScrollTo from 'animated-scroll-to';
import templatesCard from '../template/imageCards.hbs';
import ApiService from './apiService.js';

const containerCard = document.querySelector('.gallery');
const btnEl = document.querySelector('[data-action=load]');
const inputEl = document.querySelector('#search-form');
const nameEl = document.querySelector('[name=query]');

inputEl.addEventListener('submit', onInputSearchImages);
btnEl.addEventListener('click', fetchCreateMarkupLoadMore);

const apiService = new ApiService();

function onInputSearchImages(e) {
    clearList();
    if (nameEl.value.length === 0) {
        btnEl.disabled = true;
        return;
    }
    e.preventDefault();

    btnEl.disabled = false;
    apiService.query = nameEl.value;
    apiService.resetPage();
    fetchCreateMarkupLoadMore();
}

async function fetchCreateMarkupLoadMore() {
    try {
        const hits = await apiService.searchImages();
        markup(hits);
        const standardLength = containerCard.children.length;

        const getTop = standardLength - 12;
        animateScrollTo(containerCard.children[`${getTop}`], {
            speed: 500,
            maxDuration: 3000,
            verticalOffset: -20,
        });
        if (hits.length === 0) {
            btnEl.disabled = true;
        }
    } catch (error) {
        console.warn(error);
    }
}

function markup(data) {
    const cards = templatesCard(data);
    containerCard.insertAdjacentHTML('beforeend', cards);
}

function clearList() {
    containerCard.innerHTML = '';
}