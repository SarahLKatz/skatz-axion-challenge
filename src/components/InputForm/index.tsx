import axios from "axios";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { GitHubRepository } from "../../types";

type InputFormProps = {
  setData: Dispatch<SetStateAction<GitHubRepository[]>>;
};

export const InputForm = ({ setData }: InputFormProps) => {
  const fetchRepositories = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");

    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      setData(res.data);
    } catch (err) {
      console.error("Oops", err);
      // TODO: Error handling
    }
  };

  return (
    <>
      <form onSubmit={fetchRepositories}>
        <label htmlFor="username">Username or organization</label>
        <input type="text" name="username" />
        <button type="submit">Search Repositories</button>
      </form>
    </>
  );
};
