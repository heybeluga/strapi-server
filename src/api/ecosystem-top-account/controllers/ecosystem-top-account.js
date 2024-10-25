'use strict';

/**
 * ecosystem-top-account controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ecosystem-top-account.ecosystem-top-account'
  , ({strapi})=>({
    async find(ctx){
      const { ecosystemId } = ctx.query;

      const topAccounts = await strapi.entityService.findMany('api::ecosystem-top-account.ecosystem-top-account',{
        filters:{
          publishedAt: {
            // avoid getting non-published ecosystem-dapp
            $ne: null
          },
          ecosystem: ecosystemId
        },
        populate: {
          profilePicture: true
        }
      })


      if (topAccounts.length === 0) {
        return ctx.throw(404)
      }
      return this.transformResponse(topAccounts)
    }
    }));
