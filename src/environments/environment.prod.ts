let packageJson = require('../../package.json');

export const environment = {
  production: true,
  urls: {
    api: 'https://glacial-forest-26792.herokuapp.com/gwa'
  },
  version: packageJson.version,
  author: packageJson.author
};
