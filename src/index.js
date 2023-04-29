import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
//Notify.failure("Sorry, there are no images matching your search query. Please try again."); - червоне  "We're sorry, but you've reached the end of search results."
//Notify.success("Hooray! We found totalHits images."); зелене
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { getImages } from "./js/getImages";
import {createMarcup} from "./js/createMarcup"

const searchQuery = document.querySelector('input[name="searchQuery"]');
//console.log(searchQuery)
const form = document.querySelector('.search-form');
//console.log(form)
const gallery = document.querySelector(`.gallery`);
//console.log(gallery);
//const searchBtn = document.querySelector(`.search-button`);
//console.log(searchBtn);
const loadMoreBtn = document.querySelector(`.load-more`);
//console.log(loadMoreBtn)
let searchValue = ``;
form.addEventListener(`submit`, onSearch);
loadMoreBtn.addEventListener(`click`, onClickLoadMore);

async function onSearch(evn) {
  evn.preventDefault()
   searchValue = searchQuery.value.trim()
  if (!searchValue) {
    clear();
     Notify.failure("Please fill in the search field.")
    return;
  }
  //console.log(searchValue)
  else {
    try {
      const data = await getImages(searchValue);
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
    { console.log(err) }
  }    
}


function clear() {
    gallery.innerHTML = '';
};

function onClickLoadMore() {
 // console.log(`click`)
  currentPage += 1;
}











    










