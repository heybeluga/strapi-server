'use strict';

/**
 * article-entry service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::article-entry.article-entry');
