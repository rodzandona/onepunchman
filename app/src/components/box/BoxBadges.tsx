import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import type { Box } from "@/types/box.type";

interface BoxBadgesProps {
  boxes: Box[];
  selected: number | null;
  onSelect: (index: number) => void;
  onDelete: (index: number) => void;
}



export default function BoxBadges({ boxes, selected, onSelect, onDelete }: BoxBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {boxes.map((b, idx) => (
        <Badge
          key={idx}
          onClick={() => onSelect(idx)}
          variant="none"
          className={`
            flex items-center gap-1 cursor-pointer px-2 py-0.5 text-xs rounded-md
            ${selected === idx ? "bg-amber-300 text-amber-600" : "bg-gray-200 text-gray-600"}
          `}
        >
          <Icon icon="solar:box-bold-duotone" width={14} />
          <span>{b.BoxCode}</span>

          <Button
            className="p-0 ml-1 h-auto bg-transparent hover:bg-transparent"
            variant="none"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(idx);
            }}
          >
            <Icon icon="solar:close-circle-bold-duotone" width={14} />
          </Button>
        </Badge>
      ))}
    </div>
  );
}
