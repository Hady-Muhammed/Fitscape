import { renderHook } from "@testing-library/react";
import { toast } from "react-toastify";
import useChampion from "./useChampion";
import useRest from "../useRest/useRest";
jest.mock("../useRest/useRest.tsx");
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

const mockGet = jest.fn();
const env = { API_URL: "https://fitscape-backend.onrender.com" };

describe("useChampion", () => {
  beforeEach(() => {
    useRest.mockReturnValue({ get: mockGet });
    mockGet.mockClear();
    toast.error.mockClear();
  });

  it("should return champions on successful fetch", async () => {
    const mockChamps = [{ name: "Champion 1" }, { name: "Champion 2" }];
    mockGet.mockResolvedValueOnce({ champs: mockChamps });

    const { result } = renderHook(() => useChampion());

    const champions = await result.current.getAllChampions();

    expect(champions).toEqual(mockChamps);
    expect(mockGet).toHaveBeenCalledWith(`${env.API_URL}/api/champs`);
  });

  it("should show an error toast on fetch failure", async () => {
    const mockError = new Error("Failed to fetch");
    mockGet.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useChampion());

    const champions = await result.current.getAllChampions();

    expect(champions).toBeUndefined();
    expect(mockGet).toHaveBeenCalledWith(`${env.API_URL}/api/champs`);
    expect(toast.error).toHaveBeenCalledWith(mockError.message);
  });
});
