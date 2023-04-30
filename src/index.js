import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
//Notify.failure("Sorry, there are no images matching your search query. Please try again."); - червоне  "We're sorry, but you've reached the end of search results."
//Notify.success("Hooray! We found totalHits images."); зелене
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { getImages, page} from "./js/getImages";
import {createMarcup} from "./js/createMarcup"

//const searchQuery = document.querySelector('input[name="searchQuery"]');
//console.log(searchQuery)
const form = document.querySelector('.search-form');
//console.log(form)
const gallery = document.querySelector(`.gallery`);
//console.log(gallery);
//const searchBtn = document.querySelector(`.search-button`);
//console.log(searchBtn);
const loadMoreBtn = document.querySelector(`.load-more`);
//console.log(loadMoreBtn)
let searchQuery = ``;
let currentPage = 1;
form.addEventListener(`submit`, onSearch);
loadMoreBtn.addEventListener(`click`, onLoadMore);

async function onSearch(evn) {
  evn.preventDefault()
   searchQuery = evn.currentTarget.elements.searchQuery.value.trim() //searchQuery.value.trim() можна буде отримати значення, коли ф-я в ін файлі
  if (!searchQuery) {
    clear();
     Notify.failure("Please fill in the search field.")
    return;
  }
  //console.log(searchQuery)
  else {
    try {
      const data = await getImages(searchQuery);
      if (data.hits <= 1) {
        clear()
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        form.reset()
      } else {
        clear()
        gallery.insertAdjacentHTML('beforeend', createMarcup(data.hits))
        Notify.success(`Hooray! We found ${data.totalHits} images.`)
        const lightbox = new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionDelay: 250,
        }).refresh();
        form.reset()
      }
    }
    catch (err)
    { console.log('ERROR: ' + `error`) }
  }    
}

 function clear() {
    gallery.innerHTML = '';
};

async function onLoadMore() {
  currentPage +=1
  try {
    
    const data = await getImages(searchQuery, currentPage)
    gallery.insertAdjacentHTML('beforeend', createMarcup(data.hits))
    
  }
  catch {
   { console.log(err) } 
  }
}








    










