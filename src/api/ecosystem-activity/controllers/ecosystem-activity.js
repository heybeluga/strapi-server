'use strict';

/**
 * ecosystem-activity controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ecosystem-activity.ecosystem-activity', ({ strapi }) => ({
  async find(ctx) {
    const { ecosystemId } = ctx.query;

    const ecosystemActivities = await strapi.entityService.findMany('api::ecosystem-activity.ecosystem-activity', {
      filters: {
        publishedAt: {
          // avoid getting non-published ecosystem-dapp
          $ne: null
        },
        ecosystem: ecosystemId
      },
      populate: ['logo', 'bullets']
    });
    if (ecosystemActivities.length === 0) {
      return ctx.throw(404)
    }

    return this.transformResponse(ecosystemActivities);
  },
}));
