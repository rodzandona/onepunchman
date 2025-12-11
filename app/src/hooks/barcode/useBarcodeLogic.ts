import { useEffect, useRef } from "react";

export function useBarcodeLogic(
  onScanned: (code: string) => void,
  isEnabled: boolean,
  ignoredRef?: React.RefObject<HTMLInputElement>
) {
  const bufferRef = useRef("");
  const startTimeRef = useRef<number | null>(null);

  // Mantemos o ref porque o componente <Barcode /> usa
  const barcodeRef = useRef<HTMLInputElement>(null);

  // diferenciar scanner x teclado humano
  const MIN_LENGTH = 4; 
  const MAX_TOTAL_TIME = 300; 

  /** Scanner global (captura tudo que o dispositivo "digita") */
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isEnabled) return;

      // Não interferir no input de nome da caixa
      if (ignoredRef?.current && document.activeElement === ignoredRef.current) {
        return;
      }

      const now = performance.now();

      if (startTimeRef.current == null) {
        startTimeRef.current = now;
        bufferRef.current = "";
      }

      // ENTER finaliza a leitura
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

        // sempre limpa o buffer
        bufferRef.current = "";
        startTimeRef.current = null;
        return;
      }

      // Só queremos caracteres "reais"
      if (event.key.length === 1) {
        bufferRef.current += event.key;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onScanned, isEnabled, ignoredRef]);

  function handleAutomaticScan(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isEnabled) return;
    // Bloqueia qualquer digitação manual dentro do input invisível
    e.preventDefault();
    e.stopPropagation();
  }

  return {
    barcodeRef,
    handleAutomaticScan,
  };
}
