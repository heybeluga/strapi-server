module.exports = {
  // trigger deploy webhook after updating home page entry
  async afterUpdate(event) {
    const { result, params } = event;

    const webhooks = await strapi.webhookStore.findWebhooks();
    const vercelWebhook = webhooks.find(
      (webhook) => webhook.name === "vercel webhook"
    );
    if (vercelWebhook) {
      // trigger deploy webhook
      return await strapi.webhookRunner.run(vercelWebhook, "deploy", result);
    }
  },
};
