const TAGS = ["Products", "Product Review"];

module.exports = {
  // trigger deploy webhook after updating home page entry
  async afterUpdate(event) {
    const { result, params } = event;

    // check if edited article has at least one of the tags (only check for published articles)
    const entry = await strapi.entityService.findMany(
      "api::article-entry.article-entry",
      {
        filters: {
          id: result.id,
          publishedAt: {
            $ne: null,
          },
          $or: TAGS.map((tag) => ({
            tags: {
              tagValue: tag,
            },
          })),
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
    // check if deleted article has at least one of the tags (only check for published articles)
    const entry = await strapi.entityService.findMany(
      "api::article-entry.article-entry",
      {
        filters: {
          id: params.where.id,
          publishedAt: {
            $ne: null,
          },
          $or: TAGS.map((tag) => ({
            tags: {
              tagValue: tag,
            },
          })),
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
  }
};
