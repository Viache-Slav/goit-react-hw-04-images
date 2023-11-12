export const API_KEY = process.env.REACT_APP_API_KEY;
export const BASE_URL = 'https://pixabay.com/api/';
export const PER_PAGE = 12;

export const getUrlForPage = (query,page)=>{
  return `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;
}