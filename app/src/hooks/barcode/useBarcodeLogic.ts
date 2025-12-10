import { useEffect, useRef } from "react";

export function useBarcodeLogic(
  onScanned: (code: string) => void,
  isEnabled: boolean,
  ignoredRef?: React.RefObject<HTMLInputElement>
) {
  const bufferRef = useRef("");
  const barcodeRef = useRef<HTMLInputElement>(null);

  /** Scanner global */
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isEnabled) return; // 🚫 scanner desativado

      // 🚫 Ignorar digitação no input de nome da caixa
      if (ignoredRef?.current && document.activeElement === ignoredRef.current) {
        return;
      }

      if (event.key === "Enter") {
        const code = bufferRef.current.trim();
        if (code !== "") onScanned(code.toUpperCase());
        bufferRef.current = "";
      } else {
        bufferRef.current += event.key;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onScanned, isEnabled, ignoredRef]);

  /** Scanner do input invisível */
  function handleAutomaticScan(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isEnabled) return;

    if (e.key === "Enter") {
      const code = e.currentTarget.value.trim();
      if (code !== "") onScanned(code.toUpperCase());
      e.currentTarget.value = "";
    }
  }

  return {
    barcodeRef,
    handleAutomaticScan,
  };
}
