'use strict';

/**
 * book-store controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::book-store.book-store');
