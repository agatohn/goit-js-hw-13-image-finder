export default class ApiService {
  #API_KEY = '23292771-6d1481bed529939f67189ab21';
  BASE_URL = 'https://pixabay.com/api/';

  constructor() {
    this.q = '';
    this.page = 1;
  }

  fetchImg() {
    // https://pixabay.com/api/?key=23292771-6d1481bed529939f67189ab21&q=yellow+flowers&image_type=photo

    const queryParams = new URLSearchParams({
      key: this.#API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: this.page,
      q: this.q,
    });

    return fetch(`${this.BASE_URL}?${queryParams}`).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Something went wrong');
    });
  }
  set query(qValue) {
    this.q = qValue.split(' ').join('+');
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
