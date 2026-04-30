import type { Schema, Struct } from '@strapi/strapi';

export interface ContentCallout extends Struct.ComponentSchema {
  collectionName: 'components_content_callouts';
  info: {
    displayName: 'Callout';
  };
  attributes: {
    description: Schema.Attribute.Text;
    variant: Schema.Attribute.Enumeration<
      ['note', 'important', 'tip', 'warning', 'danger', 'success']
    > &
      Schema.Attribute.DefaultTo<'note'>;
  };
}

export interface ContentImage extends Struct.ComponentSchema {
  collectionName: 'components_content_images';
  info: {
    displayName: 'Image';
  };
  attributes: {
    altText: Schema.Attribute.String & Schema.Attribute.Required;
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    width: Schema.Attribute.Enumeration<['full', 'wide', 'normal']> &
      Schema.Attribute.DefaultTo<'normal'>;
  };
}

export interface ContentRichText extends Struct.ComponentSchema {
  collectionName: 'components_content_rich_texts';
  info: {
    displayName: 'Rich Text';
  };
  attributes: {
    body: Schema.Attribute.Blocks;
  };
}

export interface ContentStep extends Struct.ComponentSchema {
  collectionName: 'components_content_steps';
  info: {
    displayName: 'Step';
  };
  attributes: {
    body: Schema.Attribute.Blocks & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentVideoEmbed extends Struct.ComponentSchema {
  collectionName: 'components_content_video_embeds';
  info: {
    displayName: 'Video';
  };
  attributes: {
    caption: Schema.Attribute.String;
    video: Schema.Attribute.Media<'files' | 'videos', true>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
  };
  attributes: {
    metaDescription: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String;
    ogImage: Schema.Attribute.Media<'images' | 'files'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.callout': ContentCallout;
      'content.image': ContentImage;
      'content.rich-text': ContentRichText;
      'content.step': ContentStep;
      'content.video-embed': ContentVideoEmbed;
      'shared.seo': SharedSeo;
    }
  }
}
