import { Card, CardContent, CardFooter } from "@/components/ui/card";
import SendEmail from "@/components/home/SendEmail";

import BoxInput from "@/components/box/BoxInput";
import BoxItemList from "@/components/box/BoxItemList";
import BoxFooterActions from "@/components/box/BoxFooterActions";
import BoxQuantityItems from "@/components/box/BoxQuantityItems";

import { useBoxLogic, BoxType } from "@/hooks/box/useBoxLogic";
import { useEffect } from "react";
import Barcode from "@/components/home/Barcode";
import { useBarcodeLogic } from "@/hooks/barcode/useBarcodeLogic";
import { Separator } from "@/components/ui/separator";
import HeaderTitle from "@/components/home/HeaderTitle";

export default function Home() {
  const logic = useBoxLogic();

  // scanner global só funciona se locked = true
  const barcode = useBarcodeLogic(
    (code) => logic.addBarcode(code),
    logic.locked && !logic.isModalOpen,
    { current: document.getElementById("box-input") as HTMLInputElement }
  );

  // Ajuste de footer responsivo
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

  return (
    <div className="w-full flex justify-center p-5 h-[calc(100dvh-var(--footer-height))]">
      <Card className="w-full rounded-xl shadow-sm border flex flex-col overflow-hidden">
        <HeaderTitle />

        <CardContent className="flex flex-col gap-6 flex-1 overflow-auto p-6">
          <BoxInput
            value={logic.boxName}
            onChange={(e) =>
              !logic.locked && logic.setBoxName(e.target.value.toUpperCase())
            }
            onKeyDown={logic.handleBoxInput}
            disabled={logic.locked}
          />

          <Barcode
            ref={barcode.barcodeRef}
            onKeyDown={barcode.handleAutomaticScan}
          />

          {/* BoxBadges comentado, pode descomentar se quiser */}
          {/* <BoxBadges
            boxes={logic.boxes}
            selected={logic.selectedBoxIndex}
            onSelect={logic.loadBox}
            onDelete={logic.deleteBox}
          /> */}

          <BoxQuantityItems items={logic.items} />

          <Separator />

          <BoxItemList items={logic.items} removeItem={logic.removeItem} />
        </CardContent>

        <CardFooter className="px-6 pb-6">
          <BoxFooterActions
            locked={logic.locked}
            onNew={logic.newBox}
            onFinish={logic.finish}
          />
        </CardFooter>
      </Card>

      {/* SendEmail agora recebe boxes corretamente */}
      <SendEmail
        isOpen={logic.isModalOpen}
        boxes={logic.boxes} // agora ok
        onClose={() => logic.setIsModalOpen(false)}
      />

    </div>
  );
}
