// TODO: Add more when I add filtering/etc
export type GitHubRepository = {
  description: string;
  html_url: string;
  id: number;
  name: string;
  owner: {
    html_url: string;
    login: string;
  };
};
