import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  criarBox,
  adicionarProduto,
  fecharBox,
} from "@/services/boxService";

// Tipo de cada box no front
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


  const [boxes, setBoxes] = useState<BoxType[]>([]);

 
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [loading, setLoading] = useState(false);

 
  const [loadingAdd, setLoadingAdd] = useState(false);


  const barcodeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (locked && !isModalOpen) {
      barcodeRef.current?.focus();
    }
  }, [locked, items, isModalOpen]);

  async function createBox() {
    if (!boxName.trim()) return;

    try {
 
      const response = await criarBox();

      
      const id = response.data.id;

      setBoxId(id);

 
      setLocked(true);

  
      setBoxes(prev => [
        ...prev,
        { id, name: boxName, items: [] },
      ]);

      toast.success("Box criada com sucesso!");

      setTimeout(() => barcodeRef.current?.focus(), 100);
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar a box");
    }
  }

  async function addBarcode(code: string) {
    console.log("Código de barras recebido:", code);
    console.log("Box ID atual:", boxId);

  
    if (!boxId || loadingAdd) return;

    setLoadingAdd(true);

    try {
  
      await adicionarProduto(boxId, code);


      setItems(prev => [...prev, { code, flash: true }]);

 
      setBoxes(prev =>
        prev.map(b =>
          b.id === boxId
            ? { ...b, items: [...b.items, { code }] }
            : b
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
    } finally {
      setLoadingAdd(false);
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

      setBoxes(prev =>
        prev.map(b =>
          b.id === boxId
            ? { ...b, items: b.items.filter(i => i.code !== code) }
            : b
        )
      );
    }, 300);
  }


  async function finish() {
    if (!boxId || loading) return;

    setLoading(true);

    try {
      // Chamada para fechar a box no backend
      await fecharBox(boxId);

      setIsModalOpen(true);
      toast.success("Box finalizada!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao finalizar a box");
    } finally {
      setLoading(false);
    }
  }
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
    boxes,
    locked,
    barcodeRef,
    isModalOpen,
    setIsModalOpen,
    handleBoxInput,
    addBarcode,
    removeItem,
    newBox,
    finish,
    loading,
    loadingAdd,
  };
}
