module.exports = {
    routes:[
        {
            method: 'GET',
            "path": "/ecosystem-dapp/ecosystem-slug/:slug",
            "handler": "ecosystem-dapp.findByEcosystemSlug",
        }
    ]
}