'use strict';

/**
 * ecosystem-dapp controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ecosystem-dapp.ecosystem-dapp'
    , ({strapi})=>({
    async find(ctx){
      const { ecosystemId } = ctx.query;

        const ecosystemEntry = await strapi.entityService.findMany('api::ecosystem-dapp.ecosystem-dapp',{
            filters:{
                publishedAt: {
                    // avoid getting non-published ecosystem-dapp
                    $ne: null
                },
              ecosystem: ecosystemId
            },
            populate: {
                dappDisplayImage: true
            }
        })


        if (ecosystemEntry.length === 0) {
            return ctx.throw(404)
          }
        return this.transformResponse(ecosystemEntry)
    }
}));
