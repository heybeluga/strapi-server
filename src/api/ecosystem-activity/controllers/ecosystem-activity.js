'use strict';

/**
 * ecosystem-activity controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ecosystem-activity.ecosystem-activity', ({strapi})=>({
  async findByEcosystemSlug(ctx){
    const {slug} = ctx.params;
    const ecosystemEntry = await strapi.entityService.findMany('api::ecosystem-activity.ecosystem-activity',{
      filters:{
        publishedAt: {
          // avoid getting non-published ecosystem-dapp
          $ne: null
        },
        ecosystemSlug: {
          $eq:slug
        }
      },
      populate: {
        logo: true,
        bullets: true
      }
    })


    if (ecosystemEntry.length === 0) {
      return ctx.throw(404)
    }
    return this.transformResponse(ecosystemEntry)
  }
}));
