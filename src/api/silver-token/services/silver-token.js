'use strict';

/**
 * silver-token service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::silver-token.silver-token');
