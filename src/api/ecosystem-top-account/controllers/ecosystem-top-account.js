'use strict';

/**
 * ecosystem-top-account controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ecosystem-top-account.ecosystem-top-account'
    , ({strapi})=>({
        async findByEcosystemSlug(ctx){
            const {slug} = ctx.params;
            const ecosystemEntry = await strapi.entityService.findMany('api::ecosystem-top-account.ecosystem-top-account',{
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
                    profilePicture: true
                }
            })
    
            
            if (ecosystemEntry.length === 0) {
                return ctx.throw(404)
              }
            return this.transformResponse(ecosystemEntry)
        }
    }));