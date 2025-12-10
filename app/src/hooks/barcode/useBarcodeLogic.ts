import { useRef } from "react";

export function useBarcodeLogic() {
  const barcodeRef = useRef<HTMLInputElement>(null);

  function handleAutomaticScan(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const code = e.currentTarget.value.trim();
      console.log("SCAN:", code);
      e.currentTarget.value = "";
    }
  }

  return {
    barcodeRef,
    handleAutomaticScan,
  };
}
