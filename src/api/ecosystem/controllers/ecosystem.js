'use strict';

/**
 * ecosystem controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ecosystem.ecosystem'
    , ({strapi})=>({
    async findBySlug(ctx){
        const {slug} = ctx.params;
        const ecosystemEntry = await strapi.entityService.findMany('api::ecosystem.ecosystem',{
            filters:{
                publishedAt: {
                    // avoid getting non-published ecosystem
                    $ne: null
                },
                ecosystemSlug: {
                    $eq:slug
                }
            },
            populate: {
                ecosystemLogo: true,
                ecosystemBackground: true,
                thirdPartyContent: {
                    populate: ['image']
                }
            }
        })


        if (ecosystemEntry.length === 0) {
            return ctx.throw(404)
          }
        return this.transformResponse(ecosystemEntry[0])
    },
    async findDraftBySlug(ctx){
        const {slug} = ctx.params;
        const ecosystemEntry = await strapi.entityService.findMany('api::ecosystem.ecosystem',{
            filters:{
                publishedAt: {
                    $eq:null
                },
                ecosystemSlug: {
                    $eq:slug
                }
            },
            populate: {
                ecosystemLogo: true,
                ecosystemBackground: true,
                thirdPartyContent: {
                    populate: ['image']
                }
            }
        })

        if (ecosystemEntry.length === 0) {
            return ctx.throw(404)
          }
        return this.transformResponse(ecosystemEntry[0])
    }
}));
