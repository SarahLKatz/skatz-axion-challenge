import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputForm } from ".";
import { expect, vi } from "vitest";
import axios from "axios";

describe("InputForm", () => {
  const setup = (mockSetData = vi.fn()) =>
    render(<InputForm setData={mockSetData} />);

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("show expected fields", () => {
    setup();
    expect(screen.getByText("Username or organization")).toBeVisible();
    expect(screen.getByLabelText("Username")).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Search Repositories" })
    ).toBeVisible();
  });

  it("clicking submit calls the github api and uses the result to call the passed in setData function", async () => {
    const mockSetData = vi.fn();
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
    ];
    const mockSearchTerm = "fake-user";
    const axiosSpy = vi.spyOn(axios, "get");
    axiosSpy.mockImplementationOnce(async () => ({ data: mockData }));
    setup(mockSetData);
    const usernameField = screen.getByLabelText("Username");
    userEvent.type(usernameField, mockSearchTerm);
    await waitFor(() => {
      expect(usernameField).toHaveDisplayValue(mockSearchTerm);
    });
    userEvent.click(
      screen.getByRole("button", { name: "Search Repositories" })
    );
    await waitFor(() => {
      expect(axiosSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          `https://api.github.com/users/${mockSearchTerm}/repos`
        )
      );
    });
    expect(mockSetData).toHaveBeenCalledWith(mockData);
  });

  test.each([
    {
      fieldName: "type",
      labelText: "Repository type",
      optionToSelect: "owner",
    },
    {
      fieldName: "sort",
      labelText: "Sort",
      optionToSelect: "pushed",
    },
  ])(
    "updating filter options for $labelText changes the options sent to the api",
    async ({ fieldName, labelText, optionToSelect }) => {
      const axiosSpy = vi.spyOn(axios, "get");
      setup();
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
        expect(axiosSpy).toHaveBeenCalledWith(
          expect.stringContaining(`${fieldName}=${optionToSelect}`)
        );
      });
    }
  );

  it.todo("updating result direction changes the direction sent to the api");

  it.todo(
    "updating results per page changes the per_page option sent to the api"
  );
});
