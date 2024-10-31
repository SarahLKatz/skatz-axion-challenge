export const RepoType = {
  ALL: "all",
  OWNER: "owner",
  MEMBER: "member",
} as const;

export const SortType = {
  CREATED: "created",
  UPDATED: "updated",
  PUSHED: "pushed",
  FULL_NAME: "full_name",
} as const;

export const DirectionType = {
  ASC: "asc",
  DESC: "desc",
} as const;

export const defaultSearchValues = {
  username: "",
  repoType: RepoType.ALL,
  sort: SortType.FULL_NAME,
  direction: DirectionType.ASC,
  perPage: 30,
};
