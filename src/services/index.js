import request from '../utils/request';

export function query() {
  return request('http://localhost:3000/users');
}

export function login(options) {
  return request('http://localhost:3000/login', options);
}

export function register(options) {
  return request('http://localhost:3000/register', options);
}

export function getPosts(options) {
  return request('http://localhost:3000/getPost', options);
}

export function getLatestPosts(options) {
  return request('http://localhost:3000/getLatestPosts', options);
}

export function getUsers(options) {
  return request('http://localhost:3000/getUsers', options);
}

export function addFriend(options) {
  return request('http://localhost:3000/addFriend', options);
}

export function saveRemark(options) {
  return request('http://localhost:3000/saveRemark', options);
}

export function saveUserInfo(options) {
  return request('http://localhost:3000/saveUserInfo', options);
}

export function getUserInfo(options) {
  return request('http://localhost:3000/getUserInfo', options);
}