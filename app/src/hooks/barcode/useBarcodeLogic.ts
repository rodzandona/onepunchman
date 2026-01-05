import { useEffect, useRef } from "react";

export function useBarcodeLogic(
  onScanned: (code: string) => void,
  isEnabled: boolean,
  ignoredRef?: React.RefObject<HTMLInputElement | null>
) {
  const bufferRef = useRef("");
  const startTimeRef = useRef<number | null>(null);


  const barcodeRef = useRef<HTMLInputElement | null>(null);


  const MIN_LENGTH = 4; 
  const MAX_TOTAL_TIME = 1000; 


  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isEnabled) return;


      if (ignoredRef?.current && document.activeElement === ignoredRef.current) {
        return;
      }

      const now = performance.now();

      if (startTimeRef.current == null) {
        startTimeRef.current = now;
        bufferRef.current = "";
      }

  
      if (event.key === "Enter") {
        const totalTime = now - startTimeRef.current;
        const value = bufferRef.current.trim();

        const isScanner =
          value.length >= MIN_LENGTH &&
          totalTime <= MAX_TOTAL_TIME &&
          /^[0-9A-Za-z]+$/.test(value); // só letras/números

        if (totalTime > MAX_TOTAL_TIME){
          console.log("timing ultrapassou de ",MAX_TOTAL_TIME,"ms - timing =", totalTime)
        }

        if (value.length < MIN_LENGTH){
          console.log("barcode menor que ", MIN_LENGTH," caracteres. Quantidade inserida = ", value.length)
        }
        
        if (isScanner) {
          onScanned(value.toUpperCase());
        }

 
        bufferRef.current = "";
        startTimeRef.current = null;
        return;
      }

    
      if (event.key.length === 1) {
        bufferRef.current += event.key;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onScanned, isEnabled, ignoredRef]);

  function handleAutomaticScan(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isEnabled) return;
   
    e.preventDefault();
    e.stopPropagation();
  }

  return {
    barcodeRef,
    handleAutomaticScan,
  };
}
