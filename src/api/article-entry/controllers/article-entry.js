'use strict';

// Util function to replace key in object with another key
function replaceKey(obj, oldKey, newKey) {
    if (Array.isArray(obj)) {
      // Iterate over arrays recursively
      return obj.map(item => replaceKey(item, oldKey, newKey));
    } else if (typeof obj === 'object' && obj !== null) {
      // Create a new object with replaced keys where applicable
      return Object.keys(obj).reduce((acc, key) => {
        const value = obj[key];
        if (key === oldKey) {
          acc[newKey] = replaceKey(value, oldKey, newKey);
        } else {
          acc[key] = replaceKey(value, oldKey, newKey);
        }
        return acc;
      }, {});
    }
    // Return non-object values as-is
    return obj;
}

/**
 * article-entry controller
 */

const { createCoreController, transformResponse } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article-entry.article-entry'
    , ({strapi})=>({
    async findDrafts(ctx){
        // should be an easier way to populate every field
        const draftArticles = await strapi.entityService.findMany('api::article-entry.article-entry',{
            publicationState: 'preview',
            // @ts-ignore
            populate: 'deep'
        })

        if (draftArticles.length === 0) {
            return ctx.throw(404, 'No draft articles found');
        }
        return this.transformResponse(draftArticles);
    }
    ,
    async findDraftBySlug(ctx){
        const {slug} = ctx.params;
        const draftArticle = await strapi.entityService.findMany('api::article-entry.article-entry',{
            filters:{
                articleSlug: {
                    $eq:slug
                }
            },
            publicationState: 'preview',
            // @ts-ignore
            populate: 'deep'
        })

        
        if (draftArticle.length === 0) {
            return ctx.throw(404, 'Article not found');
        }
            
        return this.transformResponse(draftArticle[0]);
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
    },
    async findAllContent(ctx){
        // query articles entries
        const { results, pagination } = await strapi
            .service("api::article-entry.article-entry")
            .find({
                populate: {
                    titleImage: {
                        populate: ['imageHeader', 'image']
                    },
                    tags: {
                        populate: ['tagValue']                    
                    },
                },
                sort: {
                    migratedPublishedDate: 'desc'
                },
                pagination: ctx.query.pagination,
                filters: replaceKey(ctx.query.filters, 'title', 'ArticleTitle')
            });

        // query product reviews
        const { results: reviews, pagination: reviewsPagination } = await strapi
            .service("api::product-review.product-review")
            .find({
                populate: {
                    reviewImage: {
                        populate: ['imageHeader', 'image']
                    },
                    tags: {
                        populate: ['tagValue']                    
                    },
                },
                sort: {
                    migratedPublishedDate: 'desc'
                },
                pagination: ctx.query.pagination,
                filters: replaceKey(ctx.query.filters, 'title', 'reviewTitle')
            });
        
        //@ts-ignore 
        const {data:transformedReviews, meta: reviewsMeta} = strapi.controller('api::product-review.product-review').transformResponse(reviews, { pagination: reviewsPagination})
        const reviewHasNext = reviewsMeta.pagination.total > reviewsMeta.pagination.pageSize * reviewsMeta.pagination.page;
        //@ts-ignore 
        const {data: transformedArticles, meta: articlesMeta} = this.transformResponse(results, { pagination });
        const articleHasNext = articlesMeta.pagination.total > articlesMeta.pagination.pageSize * articlesMeta.pagination.page;
        
        const pageCount = articlesMeta.pagination.pageCount > reviewsMeta.pagination.pageCount ? articlesMeta.pagination.pageCount : reviewsMeta.pagination.pageCount;

        const mergedMeta = {
            pagination: {
                ...articlesMeta.pagination,
                pageCount: pageCount,
                hasNext: articleHasNext || reviewHasNext,
                total: articlesMeta.pagination.total + reviewsMeta.pagination.total
            }
        }

        const sortedContent = [...transformedArticles, ...transformedReviews].sort((a, b) => {
            return new Date(b.attributes.migratedPublishedDate).getTime() - new Date(a.attributes.migratedPublishedDate).getTime();
        });

        return ctx.body = { 
            data: sortedContent, 
            meta: mergedMeta
        };

    }
})
);
