export type CognitoUser = {
  sub: string;
  username?: string;
  client_id: string;
  token_use: 'access';
  scope?: string;
  groups: string[];
};
