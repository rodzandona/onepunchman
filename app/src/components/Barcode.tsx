import { forwardRef } from "react";
import { Input } from "./ui/input";

type BarcodeProps = {
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Barcode = forwardRef<HTMLInputElement, BarcodeProps>(({ onKeyDown }, ref) => {
  return (
    <Input
      ref={ref}
      onKeyDown={onKeyDown}
      className="absolute opacity-0 h-0 w-0 p-0 m-0 pointer-events-none"
      autoFocus
    />
  );
});

Barcode.displayName = "Barcode";

export default Barcode;
