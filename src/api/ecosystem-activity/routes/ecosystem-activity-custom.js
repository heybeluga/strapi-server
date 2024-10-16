module.exports = {
  routes:[
    {
      method: 'GET',
      "path": "/ecosystem-activity/ecosystem-slug/:slug",
      "handler": "ecosystem-activity.findByEcosystemSlug",
    }
  ]
}
