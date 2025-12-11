import { forwardRef, useRef } from "react";
import { Input } from "../ui/input";

type BarcodeProps = {
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Barcode = forwardRef<HTMLInputElement, BarcodeProps>(({ onKeyDown }, ref) => {
  const lastTimeRef = useRef<number>(Date.now());

  function secureScanner(e: React.KeyboardEvent<HTMLInputElement>) {
    const now = Date.now();
    const diff = now - lastTimeRef.current;
    lastTimeRef.current = now;

    // SCANNER → sempre muito rápido (< 30ms)
    const isScannerSpeed = diff < 30;

    // Teclas geradoras de caractere (a-z, 0-9, etc.)
    const isCharacter = e.key.length === 1;

    if (isCharacter && !isScannerSpeed) {
      // Teclado humano → BLOQUEIA
      e.preventDefault();
      return;
    }

    // Enter libera o evento normal
    onKeyDown(e);
  }

  return (
    <Input
      ref={ref}
      onKeyDown={secureScanner}
      className="absolute opacity-0 h-0 w-0 p-0 m-0 pointer-events-none"
      autoFocus
    />
  );
});

Barcode.displayName = "Barcode";

export default Barcode;
