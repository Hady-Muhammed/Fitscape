import { renderHook, act } from "@testing-library/react";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";
import useUser from "./useUser";
import { enviroment } from "../../enviroment";
import useRest from "../useRest/useRest";

// Mock dependencies
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("jwt-decode", () => jest.fn());

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));

jest.mock("../useRest/useRest.tsx");

describe("useUser", () => {
  const mockPost = jest.fn();
  const mockGet = jest.fn();
  const mockPush = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    jwtDecode.mockReturnValue({ email: "test@example.com", password: "test" });
    useHistory.mockReturnValue({ push: mockPush });
    useRest.mockReturnValue({
      get: mockGet,
      post: mockPost,
    });
    mockGet.mockClear();
    mockPost.mockClear();
    toast.error.mockClear();
  });

  it("should log in the user and redirect based on email", async () => {
    mockPost.mockResolvedValueOnce({
      message: "Logged in successfully!!",
      token: "mockToken",
    });

    const { result } = renderHook(() => useUser());
    const event = { preventDefault: jest.fn() };

    await act(async () => {
      await result.current.logIn(event, {
        email: "test@example.com",
        password: "password",
      });
    });

    expect(mockPost).toHaveBeenCalledWith(enviroment.API_URL + "/api/auth/", {
      email: "test@example.com",
      password: "password",
    });

    expect(toast.success).toHaveBeenCalledWith("Logged in successfully!!!");
    expect(mockPush).toHaveBeenCalledWith("/"); // Change to "/dashboard" if email matches "admin@gmail.com"
  });

  it("should log out the user and redirect to /signin", async () => {
    jest.useFakeTimers(); // Enable fake timers

    const { result } = renderHook(() => useUser());
    act(() => {
      result.current.logout();
    });

    expect(localStorage.getItem("token")).toBeNull();
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    expect(toast.success).toHaveBeenCalledWith("Logged out successfully!");
    expect(mockPush).toHaveBeenCalledWith("/signin");
    jest.useRealTimers(); // Restore real timers
  });

  it("should return user data on successful fetch", async () => {
    mockGet.mockResolvedValueOnce({
      user: { name: "John Doe", email: "john@example.com" },
    });

    const { result } = renderHook(() => useUser());

    const userData = await result.current.getUser();

    expect(mockGet).toHaveBeenCalledWith(
      enviroment.API_URL + `/api/users/test@example.com`,
    );
    expect(userData).toEqual({ name: "John Doe", email: "john@example.com" });
  });

  it("should send a message and show success toast", async () => {
    mockPost.mockResolvedValueOnce({});

    const { result } = renderHook(() => useUser());

    await act(async () => {
      await result.current.sendMessage("Hello!");
    });

    expect(mockPost).toHaveBeenCalledWith(
      enviroment.API_URL + "/api/users/contact",
      {
        email: "test@example.com",
        message: "Hello!",
        avatar: "",
      },
    );

    expect(toast.success).toHaveBeenCalledWith("Sent successfully!");
  });

  it("should like the app without errors", async () => {
    const { result } = renderHook(() => useUser());

    await act(async () => {
      await result.current.likeTheApp();
    });

    expect(mockPost).toHaveBeenCalledWith(
      enviroment.API_URL + "/api/users/like",
      {
        email: "test@example.com",
      },
    );
  });

  it("should return whether the app is liked or not", async () => {
    mockGet.mockResolvedValueOnce({ liked: true });

    const { result } = renderHook(() => useUser());

    const isLiked = await result.current.checkLiked();

    expect(mockGet).toHaveBeenCalledWith(
      enviroment.API_URL + `/api/users/isLiked/test@example.com`,
    );
    expect(isLiked).toBe(true);
  });
});
