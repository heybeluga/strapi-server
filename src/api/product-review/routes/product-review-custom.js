
module.exports = {
    routes:[
        {
            method: 'GET',
            "path": "/product-reviews/slug/:slug",
            "handler": "product-review.findBySlug",
        },
        {
            method: 'GET',
            "path": "/product-reviews/draft/:slug",
            "handler": "product-review.findDraftBySlug",
        }
    ]
}