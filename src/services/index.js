import request from '../utils/request';

export function query() {
  return request('/api/users');
}

export function login(options) {
  return request('/api/login', options);
}

export function register(options) {
  return request('/api/register', options);
}

export function getPosts(options) {
  return request('/api/getPost', options);
}

export function getLatestPosts(options) {
  return request('/api/getLatestPosts', options);
}

export function getUsers(options) {
  return request('/api/getUsers', options);
}

export function addFriend(options) {
  return request('/api/addFriend', options);
}
