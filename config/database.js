module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("127.0.0.1"),
      port: env.int("5432"),
      database: env("strapi"),
      user: env("postgres"),
      password: env("database"),
    },
    useNullAsDefault: true,
  },
});