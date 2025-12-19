import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  criarBox,
  adicionarProduto,
  fecharBox,
} from "@/services/boxService";

// Tipo para a Box
export type BoxType = {
  id: number;
  name: string;
  items: { code: string; flash?: boolean; removing?: boolean }[];
};

export function useBoxLogic() {
  const [boxId, setBoxId] = useState<number | null>(null);
  const [boxName, setBoxName] = useState("");
  const [locked, setLocked] = useState(false);

  const [items, setItems] = useState<
    { code: string; flash?: boolean; removing?: boolean }[]
  >([]);

  // Novo estado para múltiplas boxes
  const [boxes, setBoxes] = useState<BoxType[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const barcodeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (locked && !isModalOpen) {
      barcodeRef.current?.focus();
    }
  }, [locked, items, isModalOpen]);

  // Criar nova box
  async function createBox() {
    if (!boxName.trim()) return;

    try {
      const box = await criarBox();

      setBoxId(box.id);
      setLocked(true);

      // Adiciona a box ao array de boxes
      setBoxes(prev => [
        ...prev,
        { id: box.id, name: boxName, items: [] },
      ]);

      toast.success("Box criada com sucesso!");
      setTimeout(() => barcodeRef.current?.focus(), 100);
    } catch (error) {
      toast.error("Erro ao criar a box");
    }
  }

  // Adicionar código de barras à box atual
  async function addBarcode(code: string) {
    if (!boxId) return;

    try {
      await adicionarProduto(boxId, code);

      // Atualiza lista de items da box atual
      setItems(prev => [...prev, { code, flash: true }]);

      // Atualiza também no array de boxes
      setBoxes(prev =>
        prev.map(b =>
          b.id === boxId ? { ...b, items: [...b.items, { code }] } : b
        )
      );

      setTimeout(() => {
        setItems(prev =>
          prev.map(i =>
            i.code === code ? { ...i, flash: false } : i
          )
        );
      }, 300);
    } catch (error: any) {
      toast.error(error.message || "Erro ao adicionar produto");
    }
  }

  // Remover item
  function removeItem(code: string) {
    setItems(prev =>
      prev.map(i =>
        i.code === code ? { ...i, removing: true } : i
      )
    );

    setTimeout(() => {
      setItems(prev => prev.filter(i => i.code !== code));
      setBoxes(prev =>
        prev.map(b =>
          b.id === boxId
            ? { ...b, items: b.items.filter(i => i.code !== code) }
            : b
        )
      );
    }, 300);
  }

  // Finalizar box
  async function finish() {
    if (!boxId) return;

    try {
      await fecharBox(boxId);
      setIsModalOpen(true);
      toast.success("Box finalizada!");
    } catch {
      toast.error("Erro ao finalizar a box");
    }
  }

  // Criar nova box (reset)
  function newBox() {
    setBoxId(null);
    setBoxName("");
    setItems([]);
    setLocked(false);
  }

  function handleBoxInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") createBox();
  }

  return {
    boxName,
    setBoxName,
    items,
    boxes, // agora existe
    locked,
    barcodeRef,
    isModalOpen,
    setIsModalOpen,
    handleBoxInput,
    addBarcode,
    removeItem,
    newBox,
    finish,
  };
}