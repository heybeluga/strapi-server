'use strict';

/**
 * upcoming-token service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::upcoming-token.upcoming-token');
