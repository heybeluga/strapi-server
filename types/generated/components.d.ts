import type { Schema, Attribute } from '@strapi/strapi';

export interface PublicTradingWalletToken extends Schema.Component {
  collectionName: 'components_public_trading_wallet_tokens';
  info: {
    displayName: 'Token';
    description: '';
  };
  attributes: {
    Ticker: Attribute.String;
    Chain: Attribute.String;
    Name: Attribute.String;
    EntryPrice: Attribute.Decimal;
    WalletTokenIsIn: Attribute.String;
    AmountOfTokens: Attribute.Decimal;
    CurrentPrice: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'public-trading-wallet.token': PublicTradingWalletToken;
    }
  }
}
