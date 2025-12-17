import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  criarBox,
  adicionarProduto,
  fecharBox,
} from "@/services/boxService";


export function useBoxLogic() {

  const [boxId, setBoxId] = useState<number | null>(null);
  const [boxName, setBoxName] = useState("");
  const [locked, setLocked] = useState(false);

  const [items, setItems] = useState<
    { code: string; flash?: boolean; removing?: boolean }[]
  >([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const barcodeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (locked && !isModalOpen) {
      barcodeRef.current?.focus();
    }
  }, [locked, items, isModalOpen]);


  async function createBox() {
    if (!boxName.trim()) return;

    try {
      const box = await criarBox();

      setBoxId(box.id);
      setLocked(true);

      toast.success("Box criada com sucesso!");
      setTimeout(() => barcodeRef.current?.focus(), 100);
    } catch (error) {
      toast.error("Erro ao criar a box");
    }
  }

  function handleBoxInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") createBox();
  }


  async function addBarcode(code: string) {
    if (!boxId) return;

    try {
      await adicionarProduto(boxId, code);

      setItems(prev => [...prev, { code, flash: true }]);

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


  function removeItem(code: string) {
    setItems(prev =>
      prev.map(i =>
        i.code === code ? { ...i, removing: true } : i
      )
    );

    setTimeout(() => {
      setItems(prev => prev.filter(i => i.code !== code));
    }, 300);
  }


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

  function newBox() {
    setBoxId(null);
    setBoxName("");
    setItems([]);
    setLocked(false);
  }

  return {
    boxName,
    setBoxName,
    items,
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
