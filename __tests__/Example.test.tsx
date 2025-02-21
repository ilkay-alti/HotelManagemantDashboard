import "@testing-library/jest-dom/jest-globals"; // Doğru import
import { render, screen } from "@testing-library/react";
import Header from "../components/Header"; // Header bileşeninizin yolunu doğru şekilde belirtin
import { describe, it, expect } from "@jest/globals"; // expect'i ekleyin

describe("Header Component", () => {
  it("renders the correct text", () => {
    render(<Header />); // Header bileşenini render et

    // Ekranda belirli bir metni kontrol et
    const headerText = screen.getByText("Hotel Management Dashboard"); // "HeaderComponent" metnini arar
    expect(headerText).toBeInTheDocument(); // Metnin dokümanda olduğunu doğrula
  });
});
