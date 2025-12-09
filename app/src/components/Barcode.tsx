import { useEffect, useRef } from 'react';

interface BarcodeProps {
  onScanned: (code: string) => void;
}

export default function Barcode({ onScanned }: BarcodeProps) {
  const bufferRef = useRef('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (bufferRef.current.trim() !== '') {
          onScanned(bufferRef.current.toUpperCase());
          bufferRef.current = '';
        }
      } else {
        bufferRef.current += event.key;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onScanned]);

  return null;
}
