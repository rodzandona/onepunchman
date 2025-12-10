import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

interface BoxFooterActionsProps {
  locked: boolean;
  onNew: () => void;
  onFinish: () => void;
}


export default function BoxFooterActions({ locked, onNew, onFinish }: BoxFooterActionsProps) {
  return (
    <div className="flex w-full gap-3 flex-col md:flex-row">
      <Button
        onClick={onNew}
        className="
          flex-1 max-h-4 bg-[#D82B14] text-white font-semibold 
          py-3.5 text-xs tracking-wide rounded-lg 
          flex items-center justify-center gap-2 w-full
          hover:bg-[#b82410]
        "
      >
        <Icon icon="solar:add-circle-bold-duotone" width={18} />
        NOVA CAIXA
      </Button>

      <Button
        onClick={onFinish}
        disabled={!locked}
        className="
          flex-1 max-h-4 bg-[#D82B14] text-white font-semibold 
          py-3.5 text-xs rounded-lg 
          flex items-center justify-center gap-2
        "
      >
        <Icon icon="solar:check-circle-bold-duotone" width={18} />
        FINALIZAR
      </Button>
    </div>
  );
}
