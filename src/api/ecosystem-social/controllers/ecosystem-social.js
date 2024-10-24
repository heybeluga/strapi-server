'use strict';

/**
 * ecosystem-social controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ecosystem-social.ecosystem-social'
  , ({strapi})=>({
    async find(ctx){
      const { ecosystemId } = ctx.query;

      const socialAccounts = await strapi.entityService.findMany('api::ecosystem-social.ecosystem-social',{
        filters:{
          publishedAt: {
            // avoid getting non-published ecosystem-dapp
            $ne: null
          },
          ecosystem: ecosystemId
        },
        populate: {
          logo: true
        }
      })


      if (socialAccounts.length === 0) {
        return ctx.throw(404)
      }
      return this.transformResponse(socialAccounts)
    }
    }));
