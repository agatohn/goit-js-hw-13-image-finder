import refs from './services/getRefs';
import ApiService from './services/api-service';
import makeMarkup from '../templates/imgcard.hbs';

const api = new ApiService();

const getImg = e => {
  e.preventDefault();
  const input = e.currentTarget.elements.query.value;
  if (!input) {
    return clearImgList();
  }
  api.resetPage();
  clearImgList();
  api.query = input;
  api.fetchImg().then(data => {
    return renderImgList(data);
  });
};
const clearImgList = () => {
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
};
const renderImgList = data => {
  refs.gallery.insertAdjacentHTML('beforeend', makeMarkup(data.hits));
  refs.loadMoreBtn.classList.remove('is-hidden');
};

const onLoadMoreBtn = () => {
  api.incrementPage();
  api.fetchImg().then(data => {
    renderImgList(data);
    refs.loadMoreBtn.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  });
};

refs.form.addEventListener('submit', getImg);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);
