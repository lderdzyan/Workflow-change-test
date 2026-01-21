interface Window {
  MS_API_SERVICES: string;
  TAXAMO_PUBLIC_KEY: string;
  TAXAMO_PRIVATE_KEY: string;
  GOOGLE_ANALYTICS_ID: string;
  MS_GOOGLE_TAG_MANAGER_ID: string;
  MS_VWO_SMARTCODE_ACCOUNT_ID: string;
  MS_CDN_URL: string;
  MS_UPLOADS_URL: string;
  dataLayer: Array<any>;
  MS_APP_PATH: string;
  MS_SAVE_TAXAMO_RESPONSE: boolean;
  pendo: {
    initialize(options: any): void;
  };
  MS_MIRROR_REFLECTIONS_ENABLED: boolean;
  MS_BUILDER_ENABLED: boolean;
  MS_INDICATOR_ENABLED: boolean;
}

