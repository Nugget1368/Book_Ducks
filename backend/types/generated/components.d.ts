import type { Schema, Struct } from '@strapi/strapi';

export interface RatingValue extends Struct.ComponentSchema {
  collectionName: 'components_rating_values';
  info: {
    description: '';
    displayName: 'value';
    icon: 'star';
  };
  attributes: {
    profiles: Schema.Attribute.Relation<'oneToMany', 'api::profile.profile'>;
    value: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'rating.value': RatingValue;
    }
  }
}
