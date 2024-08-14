import { renderHook, act } from "@testing-library/react";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import useTable from "./useTable";
import useRest from "../useRest/useRest";

// Mocking dependencies
jest.mock("jwt-decode");
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));
jest.mock("../useRest/useRest");

describe("useTable", () => {
  const mockGet = jest.fn();
  const mockPost = jest.fn();
  const mockPut = jest.fn();
  const mockDelete = jest.fn();

  const env = { API_URL: "https://fitscape-backend.onrender.com" };

  beforeEach(() => {
    useRest.mockReturnValue({
      get: mockGet,
      post: mockPost,
      put: mockPut,
      deletee: mockDelete,
    });

    mockGet.mockClear();
    mockPost.mockClear();
    mockPut.mockClear();
    mockDelete.mockClear();
    toast.error.mockClear();
  });

  it("should add a row successfully", async () => {
    const mockResponse = { success: true };
    mockPost.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useTable());

    let currentTable;
    await act(async () => {
      currentTable = await result.current.addRow(
        { preventDefault: jest.fn() },
        {
          exerciseName: "Pushups",
          set1: "10",
          set2: "10",
          set3: "10",
          set4: "10",
          rest: "60",
          weight: "20kg",
        },
        "123",
      );
    });

    expect(currentTable).toEqual(mockResponse);
    expect(mockPost).toHaveBeenCalledWith(`${env.API_URL}/api/workouts/rows/`, {
      id: "123",
      exercise: {
        exerciseName: "Pushups",
        set1: "10",
        set2: "10",
        set3: "10",
        set4: "10",
        rest: "60",
        weight: "20kg",
      },
    });
    expect(result.current.warning).toBe(false);
  });

  it("should show a warning if exerciseName is missing when adding a row", async () => {
    const { result } = renderHook(() => useTable());

    await act(async () => {
      await result.current.addRow(
        { preventDefault: jest.fn() },
        {
          exerciseName: "",
          set1: "10",
          set2: "10",
          set3: "10",
          set4: "10",
          rest: "60",
          weight: "20kg",
        },
        "123",
      );
    });

    expect(result.current.warning).toBe(true);
    expect(mockPost).not.toHaveBeenCalled();
  });

  it("should handle error and show toast when adding a row fails", async () => {
    const mockError = new Error("Failed to add row");
    mockPost.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useTable());

    await act(async () => {
      await result.current.addRow(
        { preventDefault: jest.fn() },
        {
          exerciseName: "Pushups",
          set1: "10",
          set2: "10",
          set3: "10",
          set4: "10",
          rest: "60",
          weight: "20kg",
        },
        "123",
      );
    });

    expect(toast.error).toHaveBeenCalledWith(mockError.message);
    expect(result.current.warning).toBe(false);
  });

  it("should submit a row successfully", async () => {
    const mockResponse = { success: true };
    mockPut.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useTable());

    let currentTable;
    await act(async () => {
      currentTable = await result.current.submitRow(
        {
          _id: "row123",
          exerciseName: "Pushups",
          set1: "10",
          set2: "10",
          set3: "10",
          set4: "10",
          rest: "60",
          weight: "20kg",
        },
        new Date().toISOString(),
      );
    });

    expect(currentTable).toEqual(mockResponse);
    expect(mockPut).toHaveBeenCalledWith(`${env.API_URL}/api/workouts/rows/`, {
      date: expect.any(String),
      id: "row123",
      editedExer: {
        exerciseName: "Pushups",
        set1: "10",
        set2: "10",
        set3: "10",
        set4: "10",
        rest: "60",
        weight: "20kg",
      },
    });
    expect(result.current.isEditing).toBe(false);
    expect(result.current.editSuccess).toBe(true);
  });

  it("should handle error and show toast when submitting a row fails", async () => {
    const mockError = new Error("Failed to submit row");
    mockPut.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useTable());

    await act(async () => {
      await result.current.submitRow(
        {
          _id: "row123",
          exerciseName: "Pushups",
          set1: "10",
          set2: "10",
          set3: "10",
          set4: "10",
          rest: "60",
          weight: "20kg",
        },
        new Date().toISOString(),
      );
    });

    expect(toast.error).toHaveBeenCalledWith(mockError.message);
    expect(result.current.isEditing).toBe(false);
    expect(result.current.editSuccess).toBe(false);
  });

  it("should create a new table successfully", async () => {
    const mockEmail = "test@example.com";
    const mockId = "table123";
    const mockTableResponse = {
      _id: mockId,
      rows: [],
    };

    jwtDecode.mockReturnValueOnce({ email: mockEmail });
    mockPost.mockResolvedValueOnce(mockId);
    mockGet.mockResolvedValueOnce(mockTableResponse);

    const { result } = renderHook(() => useTable());

    let tableData;
    await act(async () => {
      tableData = await result.current.createNewTable(new Date().toISOString());
    });

    expect(tableData).toEqual({
      currentTable: { _id: mockId, rows: [] },
      isTableFound: true,
    });
    expect(mockPost).toHaveBeenCalledWith(`${env.API_URL}/api/workouts/`, {
      email: mockEmail,
      date: expect.any(String),
    });
    expect(result.current.createSuccess).toBe(true);
  });

  it("should change workout successfully", async () => {
    jest.useFakeTimers(); // Enable fake timers

    const mockResponse = { _id: "table123", rows: [] };
    mockGet.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useTable());

    let tableData;
    await act(async () => {
      tableData = await result.current.changeWorkout("2023-07-31");
    });

    expect(tableData).toEqual({
      currentTable: mockResponse,
      isTableFound: true,
    });
    expect(mockGet).toHaveBeenCalledWith(
      `${env.API_URL}/api/workouts?date=2023-07-31`,
    );
    // Advance timers and check state inside act
    await act(async () => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.isLoading).toBe(false);
    jest.useRealTimers(); // Restore real timers
  });

  it("should handle error and show toast when changing workout fails", async () => {
    jest.useFakeTimers(); // Enable fake timers

    const mockError = new Error("Failed to change workout");
    mockGet.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useTable());

    await act(async () => {
      await result.current.changeWorkout("2023-07-31");
    });

    expect(toast.error).toHaveBeenCalledWith(mockError.message);
    await act(async () => {
      jest.advanceTimersByTime(2000);
    });
    expect(result.current.isLoading).toBe(false);
    jest.useRealTimers(); // Restore real timers
  });
});
