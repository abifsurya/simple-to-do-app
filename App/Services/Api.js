// a library to wrap and simplify api calls
import apisauce from 'apisauce';

// our "constructor"
const create = () => {
  const api = apisauce.create({
    // base URL is read from the "constructor"
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 10000,
  });

  const getRoot = () => api.get('');
  const getRate = () => api.get('rate_limit');
  const getUser = (username) => api.get('search/users', {q: username});

  const getCurrentTime = () =>
    api.get('http://worldtimeapi.org/api/timezone/Asia/Jakarta');

  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,

    getCurrentTime,
  };
};

// let's return back our create method as the default.
export default {
  create,
};
