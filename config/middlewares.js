    // ~/strapi-aws-s3/backend/config/middlewares.js
    
    module.exports = [
      'strapi::errors',
      /* Replace 'strapi::security', with this snippet */
      /* Beginning of snippet */
      {
        name: 'strapi::security',
        config: {
          contentSecurityPolicy: {
            // useDefaults: true,
            directives: {
              'connect-src': ["'self'", 'https:'],
              'script-src-elem': [
                "'self'", // Ensures scripts from the same origin are allowed
                'https://cdn.ckeditor.com', // Allow CKEditor scripts
              ],
              'img-src': [
                "'self'",
                'data:',
                'blob:',
                'dl.airtable.com',
                '*.amazonaws.com',
                '*.media.strapiapp.com',
              ],
              'media-src': [
                "'self'",
                'data:',
                'blob:',
                'dl.airtable.com',
                '*.amazonaws.com',
                '*.media.strapiapp.com',
              ],
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