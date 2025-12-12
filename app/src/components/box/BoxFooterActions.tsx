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
    flex-1 min-h-[44px] sm:min-h-10
    bg-[#D82B14] hover:bg-[#b82410] active:bg-[#9c1f0d]
    text-white font-semibold 
    py-3 px-4 text-sm rounded-lg 
    flex items-center justify-center gap-2 w-full
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-[#D82B14] focus:ring-offset-1
    disabled:opacity-50 disabled:cursor-not-allowed
  "
      >
        {/* <Icon icon="solar:add-circle-bold-duotone" width={20} height={20} /> */}
        <span className="truncate">NOVA CAIXA</span>
      </Button>

      <Button
        onClick={onFinish}
        disabled={!locked}
        className="
    flex-1 min-h-[44px] sm:min-h-10
    bg-gradient-to-r from-[#D82B14] to-[#c02511]
    hover:from-[#b82410] hover:to-[#a3200f]
    active:from-[#9c1f0d] active:to-[#8a1b0c]
    text-white font-semibold 
    py-3 px-4 text-sm rounded-lg 
    flex items-center justify-center gap-2 w-full
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-[#D82B14] focus:ring-offset-1
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:bg-gray-400 disabled:from-gray-400 disabled:to-gray-400
  "
      >
        {/* <Icon icon="solar:check-circle-bold-duotone" width={20} height={20} /> */}
        <span className="truncate">FINALIZAR</span>
      </Button>
    </div>
  );
}
