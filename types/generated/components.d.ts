import type { Schema, Attribute } from '@strapi/strapi';

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

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'articles.paragraph-text': ArticlesParagraphText;
      'articles.paragraph': ArticlesParagraph;
      'articles.summary-text': ArticlesSummaryText;
      'general.bullet': GeneralBullet;
      'general.image': GeneralImage;
    }
  }
}
