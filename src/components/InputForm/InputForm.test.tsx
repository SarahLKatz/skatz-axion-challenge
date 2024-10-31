import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";
import { InputForm } from ".";

describe("InputForm", () => {
  const setup = ({ mockFetchData = vi.fn(), mockUpdateFilters = vi.fn() }) =>
    render(
      <InputForm fetchData={mockFetchData} updateFilters={mockUpdateFilters} />
    );

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("show expected fields", () => {
    setup({});
    expect(screen.getByText("Username or organization")).toBeVisible();
    expect(screen.getByLabelText("Username")).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Search Repositories" })
    ).toBeVisible();
  });

  it("clicking submit passed-in data fetching and update filter functions", async () => {
    const mockFetchData = vi.fn();
    const mockSearchTerm = "fake-user";
    setup({ mockFetchData });
    const usernameField = screen.getByLabelText("Username");
    userEvent.type(usernameField, mockSearchTerm);
    await waitFor(() => {
      expect(usernameField).toHaveDisplayValue(mockSearchTerm);
    });
    userEvent.click(
      screen.getByRole("button", { name: "Search Repositories" })
    );
    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalledWith(
        expect.objectContaining({ username: mockSearchTerm }),
        1
      );
    });
  });

  test.each([
    {
      fieldName: "repoType",
      labelText: "Repository type",
      optionToSelect: "owner",
    },
    {
      fieldName: "sort",
      labelText: "Sort",
      optionToSelect: "pushed",
    },
  ])(
    "updating filter options for $labelText updates the filters",
    async ({ fieldName, labelText, optionToSelect }) => {
      const mockUpdateFilters = vi.fn();
      setup({ mockUpdateFilters });
      userEvent.type(await screen.findByLabelText("Username"), "name");
      const formField = await screen.findByLabelText(labelText);
      userEvent.click(formField);
      userEvent.click(
        await screen.findByRole("option", { name: optionToSelect })
      );
      userEvent.click(
        await screen.findByRole("button", { name: "Search Repositories" })
      );
      await waitFor(() => {
        expect(mockUpdateFilters).toHaveBeenCalledWith(
          expect.objectContaining({ [fieldName]: optionToSelect })
        );
      });
    }
  );

  it.todo("updating result direction changes the direction sent to the api");

  it.todo(
    "updating results per page changes the per_page option sent to the api"
  );
});
