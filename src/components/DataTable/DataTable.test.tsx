import { render, screen } from "@testing-library/react";
import { DataTable } from ".";
import { expect, vi } from "vitest";

describe("DataTable", () => {
  const mockData = [
    {
      description: "A repository",
      html_url: "http://www.github.com/fake-user/fakeRepo",
      id: 123456,
      name: "fakeRepo",
      owner: {
        html_url: "http://www.github.com/fake-user",
        login: "fake-user",
      },
    },
    {
      description: "Another repository",
      html_url: "http://www.github.com/fake-user/realRepo",
      id: 123467,
      name: "realRepo",
      owner: {
        html_url: "http://www.github.com/fake-user",
        login: "fake-user",
      },
    },
  ];
  const setup = (mockRepositories = mockData) =>
    render(<DataTable repositories={mockRepositories} />);

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows empty state text if no repositories are passed in", () => {
    setup([]);
    expect(screen.getByText("No repositories available")).toBeVisible();
  });

  it("shows column names", () => {
    setup();
    expect(screen.getByText("Repository Name")).toBeVisible();
    expect(screen.getByText("Repository URL")).toBeVisible();
  });

  it("shows the repository name and url for each repository", () => {
    setup();
    mockData.forEach(({ name, html_url }) => {
      expect(screen.getByText(name)).toBeVisible();
      const repoLink = screen.getByText(html_url);
      expect(repoLink).toBeVisible();
      expect(repoLink).toHaveAttribute("href", html_url);
    });
  });
});
