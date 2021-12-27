/* eslint-disable no-console */
import { HttpClient } from './client';

const main = () => {
  const client = new HttpClient('test', 'test1', 'test2');
  const response = client.call('get', 'test', { something: 'new' });
  console.log(response);
};

main();
