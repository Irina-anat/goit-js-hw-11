import axios from 'axios';
const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "35791203-a082b793cbab5a6f0440a6e52";
//const currentPage = 1;
let page = 0 

async function getImages(searchQuery, page = 1) {//, 
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  //page
  })
  const URL = `${BASE_URL}?${params}`
  const images = await axios.get(`${BASE_URL}?${params}&page=${page}`);//.then(page +=1)
  console.log(images.data)
  return images.data;
}

export {getImages, page}