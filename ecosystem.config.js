module.exports = {
    apps: [
      {
        name: 'strapi', // Your project name
        cwd: '/home/ubuntu/strapi-server', // Path to your project
        script: 'npm', // For this example we're using npm, could also be yarn
        args: 'start', // Script to start the Strapi server, `start` by default
        env: {
          APP_KEYS: 'z1PHjve3orRYhDKzzj1o4g==,/GeOHIRpaBgCrgpSO/6M2A==,/4XrpIwuRvqwyNvsU5Cf9g==,VurHYyGurfGLcm5HmPhbEA==', // you can find i>
          API_TOKEN_SALT: 'U8eoAz6ZRw9fuwlfTgkgMQ==',
          ADMIN_JWT_SECRET: 'eXxh9TF2QV1K/6jUSCHsYw==',
          JWT_SECRET: 'PYl5O1nXBttdE5UqfaiZAg==',
          NODE_ENV: 'production',
          DATABASE_HOST: 'strapi-db.cshsvfm1h9eg.us-east-1.rds.amazonaws.com', // database Endpoint under 'Connectivity & Security' tab
          DATABASE_PORT: '5432',
          DATABASE_NAME: 'strapi-db', // DB name under 'Configuration' tab
          DATABASE_USERNAME: 'postgres', // default username
          DATABASE_PASSWORD: 'database',
          AWS_ACCESS_KEY_ID: 'ASIA4QBVHJ2NJQ7GDG5N',
          AWS_ACCESS_SECRET: 'qrbMtEBCnuI6hDMK1tRXFj8Hm+kFRko7ykHvVBSX', // Find it in Amazon S3 Dashboard
          AWS_REGION: 'us-east-1',
          AWS_BUCKET_NAME: 'xxx-strapi',
        },
      },
    ],
  };
  
  