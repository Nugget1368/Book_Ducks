'use strict';

/**
 * book-store service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::book-store.book-store');
