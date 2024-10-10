import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSessionDetails } from "@/hooks/useSessionDetails";
import { getSessionDetails } from "@/services/sessionService";
import { vi, describe, it, expect } from "vitest";

vi.mock("@/services/sessionService", () => ({
  getSessionDetails: vi.fn(),
}));

describe("useSessionDetails", () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should fetch session details successfully", async () => {
    const mockSession = { id: 1, name: "Test Session" };
    getSessionDetails.mockResolvedValueOnce(mockSession);

    const { result } = renderHook(() => useSessionDetails(1), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockSession);
    expect(getSessionDetails).toHaveBeenCalledWith(1);
  });
});
