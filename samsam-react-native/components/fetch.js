//import React from 'react';
export function getData(url = '') {
  return fetch(url, {
    method: 'GET',
  }).then(response => response.json());
}
