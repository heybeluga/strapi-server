module.exports = {
  // trigger deploy webhook after updating upcoming token entry
  async afterUpdate(event) {
    const { result, params } = event;

    // check if upcoming token has been published
    const entry = await strapi.entityService.findMany(
      "api::upcoming-token.upcoming-token",
      {
        filters: {
          id: result.id,
          publishedAt: {
            $ne: null,
          },
        },
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

  async beforeDelete(event) {
    const { result, params } = event;
    // check if deleted token was published
    const entry = await strapi.entityService.findMany(
      "api::upcoming-token.upcoming-token",
      {
        filters: {
          id: params.where.id,
          publishedAt: {
            $ne: null,
          },
        },
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
