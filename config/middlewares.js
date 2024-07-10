    // ~/strapi-aws-s3/backend/config/middlewares.js
    
    module.exports = [
      'strapi::errors',
      /* Replace 'strapi::security', with this snippet */
      /* Beginning of snippet */
      {
        name: 'strapi::security',
        config: {
          contentSecurityPolicy: {
            directives: {
              'connect-src': ["'self'", 'https:'],
              'img-src': [
                "'self'",
                'data:',
                'blob:',
                'dl.airtable.com',
                'xxx-strapi.s3.amazonaws.com',
              ],
              'media-src': [
                "'self'",
                'data:',
                'blob:',
                'dl.airtable.com',
                'xxx-strapi.s3.amazonaws.com',
              ]
            },
          },
        },
      },
      /* End of snippet */
      'strapi::cors',
      'strapi::poweredBy',
      'strapi::logger',
      'strapi::query',
      'strapi::body',
      'strapi::session',
      'strapi::favicon',
      'strapi::public',
    ];