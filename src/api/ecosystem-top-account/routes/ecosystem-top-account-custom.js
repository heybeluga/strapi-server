module.exports = {
    routes:[
        {
            method: 'GET',
            "path": "/ecosystem-top-account/ecosystem-slug/:slug",
            "handler": "ecosystem-top-account.findByEcosystemSlug",
        }
    ]
}