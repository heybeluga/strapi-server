
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
        },
        {
            method: 'GET',
            "path": "/article-entries/find-by-tags",
            "handler": "article-entry.findByTags",
        }
    ]
}