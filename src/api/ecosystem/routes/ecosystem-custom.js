module.exports = {
    routes:[
        {
            method: 'GET',
            "path": "/ecosystems/slug/:slug",
            "handler": "ecosystem.findBySlug",
        }
    ]
}