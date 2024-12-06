
module.exports = {
    routes:[
        {
            method: 'GET',
            "path": "/product-reviews/slug/:slug",
            "handler": "product-review.findBySlug",
        }
    ]
}