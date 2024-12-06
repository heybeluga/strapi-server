'use strict';

/**
 * product-review controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product-review.product-review',
    ({strapi})=>({
        async findBySlug(ctx){
            const {slug} = ctx.params;
            const productReview  = await strapi.entityService.findMany('api::product-review.product-review',{
                filters:{
                    reviewSlug: {
                        $eq: slug
                    }
                },
                // @ts-ignore
                populate: 'deep'
            })
    
            
            if (productReview.length === 0) {
                return ctx.throw(404)
            }
              
            return this.transformResponse(productReview[0])
    }})
);
