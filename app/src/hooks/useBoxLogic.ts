import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Box } from "@/types/box.type";

export function useBoxLogic() {
  const [boxes, setBoxes] = useState<Box[]>(() => {
    try {
      const saved = localStorage.getItem("boxes");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedBoxIndex, setSelectedBoxIndex] = useState<number | null>(null);
  const [boxName, setBoxName] = useState("");
  const [locked, setLocked] = useState(false);

  const [items, setItems] = useState<
    { code: string; flash?: boolean; removing?: boolean }[]
  >([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const barcodeRef = useRef<HTMLInputElement>(null);

  /** Foco automático somente quando pode escanear */
  useEffect(() => {
    if (locked && !isModalOpen) {
      barcodeRef.current?.focus?.();
    }
  }, [locked, items, isModalOpen]);

  /** Mantém foco no scanner sempre que necessário */
  useEffect(() => {
    function keepFocus() {
      if (!isModalOpen && locked && document.activeElement !== barcodeRef.current) {
        barcodeRef.current?.focus?.();
      }
    }

    document.addEventListener("click", keepFocus);
    document.addEventListener("focusin", keepFocus);

    return () => {
      document.removeEventListener("click", keepFocus);
      document.removeEventListener("focusin", keepFocus);
    };
  }, [locked, isModalOpen]);

  /** Salva caixas no localStorage */
  useEffect(() => {
    localStorage.setItem("boxes", JSON.stringify(boxes));
  }, [boxes]);

  /** Criar nova caixa */
  function createBox() {
    const name = boxName.trim().toUpperCase();
    if (!name) return;

    const exists = boxes.some(b => b.BoxCode === name);
    if (exists) {
      toast.warning("Esta caixa já existe!", { description: name });
      return;
    }

    const newBox: Box = { BoxCode: name, Products: [] };

    setBoxes(prev => [...prev, newBox]);
    setSelectedBoxIndex(boxes.length);
    setLocked(true);

    setTimeout(() => barcodeRef.current?.focus?.(), 50);
  }

  /** Enter no input da caixa */
  function handleBoxInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") createBox();
  }

  /** Sincronizar alterações dos produtos */
  function syncSelectedBox(updatedProducts: string[]) {
    if (selectedBoxIndex === null) return;

    setBoxes(prev => {
      const draft = [...prev];
      draft[selectedBoxIndex].Products = updatedProducts;
      return draft;
    });
  }

  /** Adicionar item via scanner */
  function addBarcode(code: string) {
    const exists = items.some(i => i.code === code);

    if (exists) {
      toast.warning("Item já existe!", { description: code });
      return;
    }

    const updated = [...items, { code, flash: true }];
    setItems(updated);
    syncSelectedBox(updated.map(i => i.code));

    setTimeout(() => {
      setItems(prev =>
        prev.map(i =>
          i.code === code ? { ...i, flash: false } : i
        )
      );
    }, 400);
  }

  /** Remover item */
  function removeItem(code: string) {
    setItems(prev =>
      prev.map(i =>
        i.code === code ? { ...i, removing: true } : i
      )
    );

    setTimeout(() => {
      const updated = items.filter(i => i.code !== code);
      setItems(updated);
      syncSelectedBox(updated.map(i => i.code));
    }, 300);
  }

  /** Reset para criar nova caixa */
  function newBox() {
    setSelectedBoxIndex(null);
    setBoxName("");
    setItems([]);
    setLocked(false);
  }

  /** Selecionar caixa existente */
  function loadBox(index: number) {
    const b = boxes[index];
    setSelectedBoxIndex(index);
    setBoxName(b.BoxCode);
    setItems(b.Products.map(p => ({ code: p })));
    setLocked(true);
  }

  /** Remover caixa */
  function deleteBox(index: number) {
    const filtered = boxes.filter((_, i) => i !== index);
    setBoxes(filtered);

    if (selectedBoxIndex === index) newBox();
  }

  /** Abrir modal de envio */
  function finish() {
    setIsModalOpen(true);
  }

  return {
    boxes,
    items,
    boxName,
    setBoxName,
    selectedBoxIndex,
    locked,

    barcodeRef,
    isModalOpen,
    setIsModalOpen,

    handleBoxInput,
    addBarcode,
    removeItem,

    newBox,
    loadBox,
    deleteBox,
    finish,
  };
}
