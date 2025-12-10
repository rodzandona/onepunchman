import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Box } from "@/types/box.type";
import SendEmail from "@/components/SendEmail";

export default function Home() {
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

  const barcodeRef = useRef<HTMLInputElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  /* Mantém foco */
  useEffect(() => {
    if (locked && !isModalOpen) {
      try {
        barcodeRef.current?.focus();
      } catch {
        // evita crash em edge cases de foco
      }
    }
  }, [locked, items, isModalOpen]);

  useEffect(() => {
    function keepFocus() {
      if (!isModalOpen && locked && document.activeElement !== barcodeRef.current) {
        try {
          barcodeRef.current?.focus();
        } catch {
          // evita crash em edge cases de foco
        }
      }
    }

    document.addEventListener("click", keepFocus);
    document.addEventListener("focusin", keepFocus);
    return () => {
      document.removeEventListener("click", keepFocus);
      document.removeEventListener("focusin", keepFocus);
    };
  }, [locked, isModalOpen]);

  /* Calcula área sem footer */
  useEffect(() => {
    const footer = document.getElementById("main-footer");
    if (!footer) return;

    const updateFooterHeight = () => {
      const footerHeight = footer.offsetHeight + 16;
      document.documentElement.style.setProperty(
        "--footer-height",
        `${footerHeight}px`
      );
    };

    updateFooterHeight();
    window.addEventListener("resize", updateFooterHeight);
    return () => window.removeEventListener("resize", updateFooterHeight);
  }, []);

  /* Persistência no localStorage */
  useEffect(() => {
    localStorage.setItem("boxes", JSON.stringify(boxes));
  }, [boxes]);

  useEffect(() => {
    const saved = localStorage.getItem("boxes");
    if (saved) {
      try {
        const parsed: Box[] = JSON.parse(saved);
        setBoxes(parsed);
      } catch { }
    }
  }, []);

  /* Entrada da caixa (Enter) */
  function handleBoxInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    const name = boxName.trim().toUpperCase();
    if (!name) return;

    // Verifica duplicado
    const exists = boxes.some(b => b.BoxCode === name);
    if (exists) {
      toast.warning("Esta caixa já existe!", {
        description: name,
        duration: 2000,
        className: "text-gray-900",
      });
      return;
    }

    // Criar caixa nova
    if (selectedBoxIndex === null) {
      const newBox: Box = {
        BoxCode: name,
        Products: []
      };

      setBoxes(prev => [...prev, newBox]);
      setSelectedBoxIndex(boxes.length);
    }

    setLocked(true);
    setTimeout(() => barcodeRef.current?.focus(), 50);
  }


  /* Sincroniza alteração na caixa selecionada */
  function syncSelectedBox(updatedProducts: string[]) {
    if (selectedBoxIndex !== null) {
      setBoxes(prev => {
        const draft = [...prev];
        draft[selectedBoxIndex] = {
          ...draft[selectedBoxIndex],
          Products: updatedProducts
        };
        return draft;
      });
    }
  }

  /* Scanner automático */
  function handleAutomaticScan(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!locked) return;

    if (e.key === "Enter") {
      const code = e.currentTarget.value.trim();
      if (code) addBarcode(code);
      e.currentTarget.value = "";
    }
  }

  /* Adiciona item */
  function addBarcode(code: string) {
    const exists = items.some(i => i.code === code);
    if (exists) {
      toast.warning("Este item já está na caixa!", {
        description: code,
        duration: 2000,
        className: "text-gray-900",
      });
      return;
    }

    const updatedItems = [...items, { code, flash: true }];
    setItems(updatedItems);

    /* Atualiza a caixa selecionada imediatamente */
    if (selectedBoxIndex !== null) {
      setBoxes(prev => {
        const draft = [...prev];
        draft[selectedBoxIndex].Products = updatedItems.map(x => x.code);
        return draft;
      });
    }

    setTimeout(() => {
      setItems(prev =>
        prev.map(i => i.code === code ? { ...i, flash: false } : i)
      );
    }, 500);
  }

  /* Remove item */
  function removeItem(code: string) {
    setItems(prev =>
      prev.map(i => i.code === code ? { ...i, removing: true } : i)
    );

    setTimeout(() => {
      const updated = items.filter(i => i.code !== code);
      setItems(updated);
      syncSelectedBox(updated.map(x => x.code));
    }, 300);
  }

  /* Criar nova caixa */
  function handleNewBox() {
    setSelectedBoxIndex(null);
    setBoxName("");
    setItems([]);
    setLocked(false);
  }

  /* Carregar caixa existente */
  function loadBox(index: number) {
    const box = boxes[index];
    setSelectedBoxIndex(index);
    setBoxName(box.BoxCode);
    setItems(box.Products.map(p => ({ code: p })));
    setLocked(true);
  }

  /* Apagar caixa */
  function deleteBox(index: number) {
    const filtered = boxes.filter((_, i) => i !== index);
    setBoxes(filtered);

    if (selectedBoxIndex === index) {
      setSelectedBoxIndex(null);
      setBoxName("");
      setItems([]);
      setLocked(false);
    }
  }

  /* Finalizar */
  function handleFinish() {
    setIsModalOpen(true);
  }

  return (
    <div
      className="
        w-full flex justify-center items-start p-5 md:p-10 
        h-[calc(100dvh-var(--footer-height))]
        overflow-hidden
      "
    >
      <Card className="w-full h-full rounded-xl shadow-sm border flex flex-col overflow-hidden">
        <CardContent className="flex flex-col gap-6 flex-1 overflow-auto p-6">

          {/* LOGO NO TOPO */}
          {/* <img src="/johnsonNjohnson.png" className="mx-auto mt-2" /> */}

          {/* INPUT DA CAIXA */}
          <Input
            value={boxName}
            onChange={(e) => {
              if (!locked) {
                setSelectedBoxIndex(null); // impede highlight de outras caixas
                setBoxName(e.target.value.toUpperCase());
              }
            }}
            onKeyDown={handleBoxInput}
            disabled={locked}
            placeholder="AGUARDANDO CAIXA..."
            className="
              min-h-12 md:min-h-20 text-center uppercase font-semibold 
              text-gray-700 tracking-wide text-base md:text-lg
              placeholder:text-gray-400
            "
          />

          <Input
            ref={barcodeRef}
            onKeyDown={handleAutomaticScan}
            className="absolute opacity-0 h-0 w-0 pointer-events-none"
            autoFocus
          />

          {/* BADGES */}
          {boxes.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {boxes.map((b, idx) => (
                <Badge
                  key={idx}
                  variant={"none"}
                  onClick={() => loadBox(idx)}
                  className={`
                  flex items-center gap-1 cursor-pointer px-2 py-0.5 text-xs rounded-md
                  ${selectedBoxIndex === idx
                      ? "bg-amber-300 text-amber-600"
                      : "bg-gray-200 text-gray-600"
                    }
                `}
                >
                  <Icon icon="solar:box-bold-duotone" width={14} />

                  <span>{b.BoxCode}</span>

                  <Button
                    className="p-0 ml-1 h-auto bg-transparent hover:bg-transparent shadow-none border-none"
                    variant="none"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteBox(idx);
                    }}
                  >
                    <Icon icon="solar:close-circle-bold-duotone" width={14} />
                  </Button>

                </Badge>

              ))}
            </div>
          )}

          {/* TÍTULO */}
          <div className="flex items-center justify-between">
            <h2 className="text-gray-700 text-lg font-semibold tracking-wide">
              Itens dentro da caixa
            </h2>

            <Badge className="bg-gray-300 text-gray-900 font-bold px-3 py-1 hover:bg-gray-400">
              {items.length}
            </Badge>
          </div>

          <Separator />

          {/* LISTA DE ITENS */}
          <div className="flex flex-col gap-3 overflow-y-auto overscroll-contain overflow-x-hidden">
            {items.map((item, index) => (
              <div
                key={item.code}
                className={`
                  w-full min-h-12 md:min-h-20 flex items-center justify-between
                  bg-white border rounded-lg shadow-sm px-4 py-3 overflow-hidden
                  ${item.flash ? "animate-flash" : ""}
                  ${item.removing ? "animate-remove" : ""}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon icon="solar:box-bold-duotone" className="text-amber-600" width={26} />
                  <span className="font-medium text-gray-700 tracking-wide">
                    {item.code}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-gray-500 text-sm">#{index + 1}</span>

                  <button onClick={() => removeItem(item.code)}>
                    <Icon
                      icon="solar:trash-bin-trash-bold-duotone"
                      className="text-red-500 hover:text-red-700 transition"
                      width={22}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="px-6 pb-6">
          <div className="flex w-full gap-3 flex-col md:flex-row">
            <Button
              onClick={handleNewBox}
              className="
              flex-1 max-h-4 bg-[#D82B14] text-white font-semibold 
              py-3.5 text-xs tracking-wide rounded-lg 
              flex items-center justify-center gap-2 w-full
              hover:bg-[#b82410] 
              transition-all duration-300
              disabled:opacity-60 disabled:cursor-not-allowed 
              group 
              focus:outline-none focus:ring-0
            "

            >
              <Icon icon="solar:add-circle-bold-duotone" width={18} />
              NOVA CAIXA
            </Button>

            <Button
              onClick={handleFinish}
              disabled={!locked}
              className="
                flex-1 max-h-4 bg-[#D82B14] font-medium py-4 
                text-xs tracking-wide rounded-lg transition
                disabled:opacity-40
                flex items-center justify-center gap-2 w-full bg-[#D82B14] 
                hover:bg-[#b82410] text-white font-semibold py-3.5 rounded-lg 
                transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group
              "
            >
              <Icon icon="solar:check-circle-bold-duotone" width={18} />
              FINALIZAR
            </Button>
          </div>
        </CardFooter>
      </Card>

      <SendEmail
        isOpen={isModalOpen}
        boxes={boxes}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
