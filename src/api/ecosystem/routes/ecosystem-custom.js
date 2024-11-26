module.exports = {
    routes:[
        {
            method: 'GET',
            "path": "/ecosystems/slug/:slug",
            "handler": "ecosystem.findBySlug",
        },

        {
            method: 'GET',
            "path": "/ecosystems/drafts/:slug",
            "handler": "ecosystem.findDraftBySlug",
        },
    ]
}