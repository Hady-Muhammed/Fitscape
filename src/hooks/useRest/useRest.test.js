import { renderHook, act } from "@testing-library/react";
import useRest from "./useRest";

// eslint-disable-next-line no-undef
global.fetch = jest.fn();

describe("useRest", () => {
  const mockToken = "mocked-token";
  const mockResponseData = { data: "some data" };

  beforeEach(() => {
    localStorage.setItem("token", JSON.stringify(mockToken));
    fetch.mockClear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should handle a successful GET request", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponseData,
    });

    const { result } = renderHook(() => useRest());

    let response;
    await act(async () => {
      response = await result.current.get("mocked-url");
    });

    expect(response).toEqual(mockResponseData);
    expect(fetch).toHaveBeenCalledWith("mocked-url", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mockToken}`,
      },
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle a failed GET request and set an error", async () => {
    const mockErrorMessage = "Failed to fetch";
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: mockErrorMessage }),
    });

    const { result } = renderHook(() => useRest());

    await act(async () => {
      try {
        await result.current.get("mocked-url");
      } catch (error) {
        // Expected error
      }
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(mockErrorMessage);
    expect(fetch).toHaveBeenCalledWith("mocked-url", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mockToken}`,
      },
    });
  });

  it("should handle a successful POST request", async () => {
    const mockRequestBody = { key: "value" };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponseData,
    });

    const { result } = renderHook(() => useRest());

    let response;
    await act(async () => {
      response = await result.current.post("mocked-url", mockRequestBody);
    });

    expect(response).toEqual(mockResponseData);
    expect(fetch).toHaveBeenCalledWith("mocked-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mockToken}`,
      },
      body: JSON.stringify(mockRequestBody),
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle a failed POST request and set an error", async () => {
    const mockErrorMessage = "Failed to post";
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: mockErrorMessage }),
    });

    const { result } = renderHook(() => useRest());

    await act(async () => {
      try {
        await result.current.post("mocked-url", { key: "value" });
      } catch (error) {
        // Expected error
      }
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(mockErrorMessage);
  });
});
