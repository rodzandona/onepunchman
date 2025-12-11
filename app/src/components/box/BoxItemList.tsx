import { Icon } from "@iconify/react";
import { BoxItem } from "@/types/boxItem.type"

interface BoxItemListProps {
  items: BoxItem[];
  removeItem: (code: string) => void;
}

export default function BoxItemList({ items, removeItem }: BoxItemListProps) {
  return (
    <div className="grid grid-rows-3 gap-2 overflow-hidden h-full">
      {items.slice(-3).map((item, index) => (
        <div
          key={item.code}
          className={`
            w-full min-h-10 md:min-h-16 flex items-center justify-between
            bg-white border rounded-lg shadow-sm px-3 py-2
            ${item.flash ? "animate-flash" : ""}
            ${item.removing ? "animate-remove" : ""}
          `}
        >
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700 text-base">
              {item.code}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-sm">
              #{items.length - (items.slice(-3).length - index -1)}
            </span>


            <button onClick={() => removeItem(item.code)}>
              <Icon
                icon="solar:trash-bin-trash-bold-duotone"
                className="text-red-500 hover:text-red-700"
                width={20}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
