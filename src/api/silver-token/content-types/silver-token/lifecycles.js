async function triggerDeploy(result) {
    const webhooks = await strapi.webhookStore.findWebhooks();
    const vercelWebhook = webhooks.find(
      (webhook) => webhook.name === "vercel webhook"
    );
  
    if (vercelWebhook) {
      // trigger deploy webhook
      return await strapi.webhookRunner.run(vercelWebhook, "deploy", result);
    }
  }
  
  module.exports = {
    async beforeUpdate(event) {
      const { result, params } = event;
  
      // if the token entry toggle publishedAt then trigger deploy webhook
      if ('publishedAt' in params.data) {
        return triggerDeploy(result);
      }
  
      // check if edited token is published
      const entry = await strapi.entityService.findMany(
        "api::silver-token.silver-token",
        {
          filters: {
            id: params.data.id,
            publishedAt: {
              $ne: null,
            },
          },
        }
      );
  
      if (entry.length > 0) {
        triggerDeploy(result);
      }
    },
  
    async beforeDelete(event) {
      const { result, params } = event;
      // check if deleted token was published
      const entry = await strapi.entityService.findMany(
        "api::silver-token.silver-token",
        {
          filters: {
            id: params.where.id,
            publishedAt: {
              $ne: null,
            },
          },
        }
      );
  
      if (entry.length > 0) {
        triggerDeploy(result);
      }
    },
  };
  