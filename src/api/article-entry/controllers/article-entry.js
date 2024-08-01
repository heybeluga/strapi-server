'use strict';

/**
 * article-entry controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article-entry.article-entry'
    , ({strapi})=>({
    async findDrafts(ctx){
        // should be an easier way to populate every field
        const draftArticles = await strapi.entityService.findMany('api::article-entry.article-entry',{
            filters:{
                publishedAt: {
                    $eq:null
                }
            },
            populate: {
                ArticleSummary: {
                    populate: ['summaryBullets']
                },
                articleText: {
                    populate: ['paragraphText']
                },
                titleImage: {
                    populate: ['imageHeader', 'image']
                }
            }
        })

        
        if (draftArticles.length === 0) {
            ctx.body = {
              data: null,
              error: {
                status: 404,
                name: "NotFoundError",
                message: "Not Found",
                details: {},
              },
            };
          }
          return ctx.body = {data:draftArticles};
    }
    ,
    async findDraftBySlug(ctx){
        const {slug} = ctx.params;
        // should be an easier way to populate every field
        const draftArticle = await strapi.entityService.findMany('api::article-entry.article-entry',{
            filters:{
                publishedAt: {
                    $eq:null
                },
                articleSlug: {
                    $eq:slug
                }
            },
            populate: {
                ArticleSummary: {
                    populate: ['summaryBullets']
                },
                articleText: {
                    populate: ['paragraphText']
                },
                titleImage: {
                    populate: ['imageHeader', 'image']
                }
            }
        })

        
        if (draftArticle.length === 0) {
            ctx.body = {
              data: null,
              error: {
                status: 404,
                name: "NotFoundError",
                message: "Not Found",
                details: {},
              },
            };
          }
          return ctx.body = {data: draftArticle[0]};
    }
})
);
