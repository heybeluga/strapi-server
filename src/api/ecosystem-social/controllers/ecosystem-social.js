'use strict';

/**
 * ecosystem-social controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ecosystem-social.ecosystem-social'
    , ({strapi})=>({
        async findByEcosystemSlug(ctx){
            const {slug} = ctx.params;
            const ecosystemEntry = await strapi.entityService.findMany('api::ecosystem-social.ecosystem-social',{
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
                    displayMedia: true
                }
            })
    
            
            if (ecosystemEntry.length === 0) {
                return ctx.throw(404)
              }
            return this.transformResponse(ecosystemEntry)
        }
    }));