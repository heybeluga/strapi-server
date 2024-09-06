'use strict';

/**
 * ecosystem-dapp service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ecosystem-dapp.ecosystem-dapp');
