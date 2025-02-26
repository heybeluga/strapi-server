import type { Schema, Attribute } from '@strapi/strapi';

export interface ActivityBullets extends Schema.Component {
  collectionName: 'components_activity_bullets';
  info: {
    displayName: 'bullets';
  };
  attributes: {
    bullet: Attribute.String;
  };
}

export interface AnnouncementAnnouncement extends Schema.Component {
  collectionName: 'components_announcement_announcements';
  info: {
    displayName: 'Announcement';
  };
  attributes: {
    thumbnail: Attribute.Media;
    title: Attribute.String & Attribute.Required;
    description: Attribute.String & Attribute.Required;
    callToActionTitle: Attribute.String & Attribute.Required;
    callToActionLink: Attribute.String & Attribute.Required;
  };
}

export interface ArticlesParagraphText extends Schema.Component {
  collectionName: 'components_articles_paragraph_texts';
  info: {
    displayName: 'paragraphText';
    description: '';
  };
  attributes: {
    TextTitle: Attribute.Blocks & Attribute.Required;
    TextHeader: Attribute.String & Attribute.Required;
  };
}

export interface ArticlesParagraph extends Schema.Component {
  collectionName: 'components_articles_paragraph_s';
  info: {
    displayName: 'paragraph ';
    description: '';
  };
  attributes: {
    paragraphText: Attribute.Component<'articles.paragraph-text', true>;
  };
}

export interface ArticlesSummaryText extends Schema.Component {
  collectionName: 'components_articles_summary_texts';
  info: {
    displayName: 'summary-text';
    description: '';
  };
  attributes: {};
}

export interface GeneralAttribute extends Schema.Component {
  collectionName: 'components_general_attributes';
  info: {
    displayName: 'Attribute';
  };
  attributes: {
    key: Attribute.String & Attribute.Required;
    value: Attribute.String & Attribute.Required;
  };
}

export interface GeneralBullet extends Schema.Component {
  collectionName: 'components_general_bullets';
  info: {
    displayName: 'Bullet';
    description: '';
  };
  attributes: {
    Bullet: Attribute.Text;
  };
}

export interface GeneralImage extends Schema.Component {
  collectionName: 'components_general_images';
  info: {
    displayName: 'Image';
  };
  attributes: {
    image: Attribute.Media;
    imageHeader: Attribute.String;
  };
}

export interface LinkSocialMediaLink extends Schema.Component {
  collectionName: 'components_social_media_link_social_media_links';
  info: {
    displayName: 'Link';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    link: Attribute.String;
  };
}

export interface ProductReviewProductCard extends Schema.Component {
  collectionName: 'components_product_review_product_cards';
  info: {
    displayName: 'ProductCard';
    description: '';
  };
  attributes: {
    productImage: Attribute.Media;
    productName: Attribute.String;
    reviewRating: Attribute.Decimal &
      Attribute.SetMinMax<
        {
          min: 0;
          max: 5;
        },
        number
      >;
    attributes: Attribute.Component<'general.attribute', true>;
    pros: Attribute.Component<'general.bullet', true>;
    cons: Attribute.Component<'general.bullet', true>;
    review: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'Markdown';
          preset: 'rich';
        }
      >;
    overview: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'Markdown';
          preset: 'rich';
        }
      >;
  };
}

export interface UpcomingTokenUpcomingToken extends Schema.Component {
  collectionName: 'components_upcoming_token_upcoming_tokens';
  info: {
    displayName: 'UpcomingToken';
    description: '';
  };
  attributes: {
    logo: Attribute.Media & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    slug: Attribute.String & Attribute.Required;
    activeToken: Attribute.Boolean & Attribute.DefaultTo<false>;
    score: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Attribute.DefaultTo<0>;
    tokenLabel: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'activity.bullets': ActivityBullets;
      'announcement.announcement': AnnouncementAnnouncement;
      'articles.paragraph-text': ArticlesParagraphText;
      'articles.paragraph': ArticlesParagraph;
      'articles.summary-text': ArticlesSummaryText;
      'general.attribute': GeneralAttribute;
      'general.bullet': GeneralBullet;
      'general.image': GeneralImage;
      'link.social-media-link': LinkSocialMediaLink;
      'product-review.product-card': ProductReviewProductCard;
      'upcoming-token.upcoming-token': UpcomingTokenUpcomingToken;
    }
  }
}
