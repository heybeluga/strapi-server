
module.exports = {
  // trigger deploy webhook after updating
  async afterUpdate(event) {
    const { result, params } = event;

    const entry = await strapi.entityService.findMany(
      "api::article-entry.article-entry",
      {
        filters: {
          id: result.id,
          publishedAt: {
            $ne: null,
          }
        }
      }
    );

    const webhooks = await strapi.webhookStore.findWebhooks();
    const vercelWebhook = webhooks.find(
      (webhook) => webhook.name === "vercel webhook"
    );

    if (vercelWebhook && entry.length > 0) {
      // trigger deploy webhook
      return await strapi.webhookRunner.run(vercelWebhook, "deploy", result);
    }
  },
};
