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
            // @ts-ignore
            populate: 'deep'
        })

        
        if (draftArticles.length === 0) {
            return ctx.body = {
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
            // @ts-ignore
            populate: 'deep'
        })

        
        if (draftArticle.length === 0) {
            return ctx.body = {
              data: null,
              error: {
                status: 404,
                name: "NotFoundError",
                message: "Not Found",
                details: {},
              },
            };
          }
          const {id, ...articleData} = draftArticle[0];
          return ctx.body = {data: {id, attributes: articleData}};
    },
    async findByTags(ctx){
        try {
            const { tags } = ctx.query;

            if(!tags){
                return ctx.throw(400, 'tags query parameter is required');
            }
           
            const tagList = tags.toString().split(',');
    
            const articles = await strapi.entityService.findMany('api::article-entry.article-entry',{
                filters:{
                    publishedAt: {
                        $ne:null
                    },
                    $and: tagList.map(tag => ({
                        tags: {
                            tagValue: tag
                        }
                    }))
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
                    },
                    tags: {
                        populate: ['tagValue']
                    }
                }
            })
    
            return this.transformResponse(articles);   
        } catch (error) {
            return ctx.throw(500)
        }
    },
    async findFeatured(ctx){
        try {
            const articles = await strapi.entityService.findMany('api::article-entry.article-entry',{
                filters:{
                    publishedAt: {
                        $ne:null
                    },
                    featuredArticle: {
                        $eq:true
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
                    },
                    tags: {
                        populate: ['tagValue']
                    }
                }
            })
    
            return this.transformResponse(articles);
        } catch (error) {
            return ctx.throw(500)
        }
    }
})
);
