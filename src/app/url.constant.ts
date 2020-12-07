import { environment } from '../environments/environment';
const baseUrl = environment.baseUrl;
const contentUrl = environment.contentUrl;

export const apiUrl = {
  /* BASE_URL */
  token: baseUrl + '/api/token',
  login: baseUrl + '/api/login',
  register: baseUrl + '/api/register',
  user: baseUrl + '/api/user',
  ensure: baseUrl + '/api/tokencheck',
  /* CONTENT_URL */
  tab: contentUrl + '/api/tab',
  serie: contentUrl + '/api/serie',
  celeb: contentUrl + '/api/celeb',
  genre: contentUrl + '/api/genre_jj',
  person: contentUrl + '/api/person',
  // content: contentUrl + '/api/contentbase/tab',
  // banner: contentUrl + '/api/contentbase/banner',
};
