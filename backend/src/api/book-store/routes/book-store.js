'use strict';

/**
 * book-store router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::book-store.book-store');
