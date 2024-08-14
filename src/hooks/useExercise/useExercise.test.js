import { renderHook } from "@testing-library/react";
import { toast } from "react-toastify";
import useExercise from "./useExercise";
import useRest from "../useRest/useRest";

jest.mock("../useRest/useRest.tsx");
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

const mockGet = jest.fn();
const env = { API_URL: "https://fitscape-backend.onrender.com" };

describe("useExercise", () => {
  beforeEach(() => {
    useRest.mockReturnValue({ get: mockGet });
    mockGet.mockClear();
    toast.error.mockClear();
  });

  it("should return exercises on successful fetch", async () => {
    const mockExers = [
      { exerciseName: "Pushups" },
      { exerciseName: "Pullups" },
    ];
    mockGet.mockResolvedValueOnce({ exers: mockExers });

    const { result } = renderHook(() => useExercise());

    const exercises = await result.current.getAllExercises();

    expect(exercises).toEqual(mockExers);
    expect(mockGet).toHaveBeenCalledWith(`${env.API_URL}/api/exercises`);
  });

  it("should show an error toast on fetch failure", async () => {
    const mockError = new Error("Failed to fetch");
    mockGet.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useExercise());

    const exercises = await result.current.getAllExercises();

    expect(exercises).toBeUndefined();
    expect(mockGet).toHaveBeenCalledWith(`${env.API_URL}/api/exercises`);
    expect(toast.error).toHaveBeenCalledWith(mockError.message);
  });
});
