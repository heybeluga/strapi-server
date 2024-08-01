
module.exports = {
    routes:[
        {
            method: 'GET',
            "path": "/article-entries/drafts",
            "handler": "article-entry.findDrafts",
        },
        {
            method: 'GET',
            "path": "/article-entries/drafts/:slug",
            "handler": "article-entry.findDraftBySlug",
        }
    ]
}