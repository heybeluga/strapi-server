import type { Schema, Attribute } from '@strapi/strapi';

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
  attributes: {
    summaryBullets: Attribute.Component<'general.bullet', true>;
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

export interface UpcomingTokenUpcomingToken extends Schema.Component {
  collectionName: 'components_upcoming_token_upcoming_tokens';
  info: {
    displayName: 'UpcomingToken';
  };
  attributes: {
    logo: Attribute.Media & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    slug: Attribute.String & Attribute.Required;
    activeToken: Attribute.Boolean & Attribute.DefaultTo<false>;
    featuredToken: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'announcement.announcement': AnnouncementAnnouncement;
      'articles.paragraph-text': ArticlesParagraphText;
      'articles.paragraph': ArticlesParagraph;
      'articles.summary-text': ArticlesSummaryText;
      'general.bullet': GeneralBullet;
      'general.image': GeneralImage;
      'upcoming-token.upcoming-token': UpcomingTokenUpcomingToken;
    }
  }
}
