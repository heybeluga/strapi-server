module.exports = {
    routes:[
        {
            method: 'GET',
            "path": "/ecosystem-social/ecosystem-slug/:slug",
            "handler": "ecosystem-social.findByEcosystemSlug",
        }
    ]
}