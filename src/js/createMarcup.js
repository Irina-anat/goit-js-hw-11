function createMarcup(arr) {
  return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
    `<div class="photo-card">
     <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" class="foto"/>
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes || `Not found`}</b>
    </p>
    <p class="info-item">
      <b>Views ${views || `Not found`}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments || `Not found`}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads || `Not found`}</b>
    </p>
  </div>
</div>`)
    .join(``); 
};

export { createMarcup };