'use strict';

/**
 * ecosystem router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::ecosystem.ecosystem');
