import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getImages } from "./js/getImages";
import { createMarcup } from "./js/createMarcup";

const form = document.querySelector('.search-form');
const gallery = document.querySelector(`.gallery`);
const guard = document.querySelector(`.js-guard`);

let searchQuery = ``;
let currentPage = 1;
let perPage = 40;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const options = {
  root: null,
  rootMargin: '600px',
  threshold: 0,
};

const observer = new IntersectionObserver(onLoadMore, options);

form.addEventListener(`submit`, onSearch);

async function onSearch(evn) {
  evn.preventDefault()
  searchQuery = evn.currentTarget.elements.searchQuery.value.trim();
  if (!searchQuery) {
    clear()
    Notify.failure("Please fill in the search field.")
    observer.unobserve(guard)
    return
  };
  
  try {
    resetCurretPage()
    const data = await getImages(searchQuery, currentPage);
    console.log(data.hits)
    if (data.hits.length === 0) {
      form.reset()
      clear()
      Notify.failure("Sorry, there are no images matching your search query. Please try again.")
      return;
    } 
      form.reset()
      clear()
      resetSlider() 
      gallery.insertAdjacentHTML('beforeend', createMarcup(data.hits))
      observer.observe(guard)
      Notify.success(`Hooray! We found ${data.totalHits} images.`)
      lightbox.refresh();  
  }
  catch (err) {
    console.log('ERROR: ' + `error`)
    clear()
  } 
}; 


  async function onLoadMore(entries, observer) {
     
     try {
       entries.forEach(async function (entry) {

         if (entry.isIntersecting) {
           currentPage += 1;
           const data = await getImages(searchQuery, currentPage);
           // console.log(data)
           let totalPages = Math.ceil(data.totalHits / perPage);
           gallery.insertAdjacentHTML('beforeend', createMarcup(data.hits));
           if (totalPages === currentPage) {
             Notify.failure("We're sorry, but you've reached the end of search results.");
             observer.unobserve(guard);
           }
           lightbox.refresh();
         }
       })     
    }
     catch {
       console.log('ERROR: ' + `error`)
       clear();
    }
};

function resetCurretPage() {
  currentPage = 1;
};

 function clear() {
    gallery.innerHTML = ''
};

function resetSlider() {
  const slider = document.getElementById('slider');
  window.scrollTo(0, slider.offsetTop);
};






/*function scroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}*/

    


/*const loadMoreBtn = document.querySelector(`.load-more`);
loadMoreBtn.addEventListener(`click`, onLoadMore);
btnHidden();

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
      
      if (data.hits < 1) {
        clear()
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        form.reset()
      } else {
        clear()
        gallery.insertAdjacentHTML('beforeend', createMarcup(data.hits))
        btnVisual()
        observer.observe(guard)
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
  currentPage += 1
  const totalPages = page * 40
  try {
    const data = await getImages(searchQuery, currentPage)
    console.log(data.hits.length)
    console.log(totalPages)
    console.log(data.totalHits)
    if (data.hits.length === 0 || totalPages === data.totalHits) {
      Notify.failure("We're sorry, but you've reached the end of search results.")
      btnHidden()
      //form.reset()
    } 
    
    gallery.insertAdjacentHTML('beforeend', createMarcup(data.hits))
    const lightbox = new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionDelay: 250,
        }).refresh();
        form.reset()
  }
  catch {
    Notify.failure("We're sorry, but you've reached the end of search results.")
    btnHidden()
    //form.reset()
  }
}

function btnHidden() {
    loadMoreBtn.classList.add("is-hidden");
};

function btnVisual() {
    loadMoreBtn.classList.remove("is-hidden");
}*/