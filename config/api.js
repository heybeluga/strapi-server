// path: ./config/api.js
module.exports = ({ env }) => ({
  responses: {
    privateAttributes: ['_v', 'id', 'created_at'],
  },
  rest: {
    prefix: '/api',
    defaultLimit: 100,
    maxLimit: 250,
  },
});
