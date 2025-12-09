import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [boxName, setBoxName] = useState("");
  const [locked, setLocked] = useState(false);

  const [items, setItems] = useState<
    { code: string; flash?: boolean; removing?: boolean }[]
  >([]);

  const barcodeRef = useRef<HTMLInputElement>(null);

  /** Mantém foco para escaneamento */
  useEffect(() => {
    if (locked) barcodeRef.current?.focus();
  }, [locked, items]);

  /** 🔥 Nunca perder foco */
  useEffect(() => {
    function keepFocus() {
      if (locked && document.activeElement !== barcodeRef.current) {
        barcodeRef.current?.focus();
      }
    }

    document.addEventListener("click", keepFocus);
    document.addEventListener("focusin", keepFocus);

    return () => {
      document.removeEventListener("click", keepFocus);
      document.removeEventListener("focusin", keepFocus);
    };
  }, [locked]);

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

  function handleBoxInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && boxName.trim()) {
      setLocked(true);
      setTimeout(() => barcodeRef.current?.focus(), 50);
    }
  }

  function handleAutomaticScan(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!locked) return;

    if (e.key === "Enter") {
      const code = e.currentTarget.value.trim();
      if (code) addBarcode(code);
      e.currentTarget.value = "";
    }
  }

  function addBarcode(code: string) {
    const exists = items.some((i) => i.code === code);

    if (exists) {
      toast.warning("Este item já está na caixa!", {
        description: code,
        duration: 2000,
        className: "text-gray-900",
      });
      return;
    }

    setItems((prev) => [...prev, { code, flash: true }]);

    setTimeout(() => {
      setItems((prev) =>
        prev.map((i) =>
          i.code === code ? { ...i, flash: false } : i
        )
      );
    }, 500);
  }

  function removeItem(code: string) {
    setItems((prev) =>
      prev.map((i) =>
        i.code === code ? { ...i, removing: true } : i
      )
    );

    setTimeout(() => {
      setItems((prev) => prev.filter((i) => i.code !== code));
    }, 300);
  }

  function handleNewBox() {
    setBoxName("");
    setLocked(false);
    setItems([]);
  }

  function handleFinish() {
    alert("Finalizar conferência — implementar backend.");
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

          <Input
            value={boxName}
            onChange={(e) => !locked && setBoxName(e.target.value.toUpperCase())}
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

          {/* HEADER LISTA */}
          <div className="flex items-center justify-between">
            <h2 className="text-gray-700 text-lg font-semibold tracking-wide">
              Itens dentro da caixa
            </h2>

            <Badge className="bg-gray-300 text-gray-900 font-bold px-3 py-1 hover:bg-gray-400">
              {items.length}
            </Badge>
          </div>

          <Separator />

          {/* LISTA */}
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
                flex-1 max-h-4 bg-[#D82B14] font-medium py-4 
                text-xs tracking-wide rounded-lg transition
                flex items-center justify-center gap-2 w-full bg-[#D82B14] hover:bg-[#b82410] text-white font-semibold py-3.5 rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group
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
                flex items-center justify-center gap-2 w-full bg-[#D82B14] hover:bg-[#b82410] text-white font-semibold py-3.5 rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              <Icon icon="solar:check-circle-bold-duotone" width={18} />
              FINALIZAR
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
