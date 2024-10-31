import { RepoType } from "./constants";

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

export type SearchFormValues = {
  username: string;
  repoType: (typeof RepoType)[keyof typeof RepoType];
  sort: (typeof SortType)[keyof typeof SortType];
  direction: (typeof DirectionType)[keyof typeof DirectionType];
  perPage?: number;
};
