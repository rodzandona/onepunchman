import { Card, CardContent, CardFooter } from "@/components/ui/card";
import SendEmail from "@/components/SendEmail";

import BoxInput from "@/components/box/BoxInput";
import BoxBadges from "@/components/box/BoxBadges";
import BoxItemList from "@/components/box/BoxItemList";
import BoxFooterActions from "@/components/box/BoxFooterActions";

import { useBoxLogic } from "@/hooks/box/useBoxLogic";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import Barcode from "@/components/Barcode";

export default function Home() {

  useEffect(() => {
    const footer = document.getElementById("main-footer");
    if (!footer) return;

    const updateFooterHeight = () => {
      const footerHeight = footer.offsetHeight + 16; // footer height + bottom-4
      document.documentElement.style.setProperty(
        "--footer-height",
        `${footerHeight}px`
      );
    };

    updateFooterHeight();

    // Atualiza caso a janela mude
    window.addEventListener("resize", updateFooterHeight);

    return () => window.removeEventListener("resize", updateFooterHeight);
  }, []);

  const logic = useBoxLogic();

  return (
    <div className="w-full flex justify-center p-5 h-[calc(100dvh-var(--footer-height))]">
      <Card className="w-full rounded-xl shadow-sm border flex flex-col overflow-hidden">
        <CardContent className="flex flex-col gap-6 flex-1 overflow-auto p-6">

          <BoxInput
            value={logic.boxName}
            disabled={logic.locked}
            onChange={(e) => logic.setBoxName(e.target.value.toUpperCase())}
            onKeyDown={logic.handleBoxInput}
          />

          <Barcode
            ref={logic.barcodeRef}
            onKeyDown={logic.handleAutomaticScan}
          />

          <BoxBadges
            boxes={logic.boxes}
            selected={logic.selectedBoxIndex}
            onSelect={logic.loadBox}
            onDelete={logic.deleteBox}
          />

          <BoxItemList
            items={logic.items}
            removeItem={logic.removeItem}
          />

        </CardContent>

        <CardFooter className="px-6 pb-6">
          <BoxFooterActions
            locked={logic.locked}
            onNew={logic.newBox}
            onFinish={logic.finish}
          />
        </CardFooter>
      </Card>

      <SendEmail
        isOpen={logic.isModalOpen}
        boxes={logic.boxes}
        onClose={() => logic.setIsModalOpen(false)}
      />
    </div>
  );
}
