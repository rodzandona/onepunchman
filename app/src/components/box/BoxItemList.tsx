import { Icon } from "@iconify/react";

interface BoxItem {
  code: string;
  flash?: boolean;
  removing?: boolean;
}

interface BoxItemListProps {
  items: BoxItem[];
  removeItem: (code: string) => void;
}


export default function BoxItemList({ items, removeItem }: BoxItemListProps) {
  return (
    <div className="flex flex-col gap-3 overflow-y-auto overscroll-contain overflow-x-hidden">
      {items.map((item, index) => (
        <div
          key={item.code}
          className={`
            w-full min-h-12 md:min-h-20 flex items-center justify-between
            bg-white border rounded-lg shadow-sm px-4 py-3
            ${item.flash ? "animate-flash" : ""}
            ${item.removing ? "animate-remove" : ""}
          `}
        >
          <div className="flex items-center gap-3">
            <Icon icon="solar:box-bold-duotone" className="text-amber-600" width={26} />
            <span className="font-medium text-gray-700">{item.code}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm">#{index + 1}</span>

            <button onClick={() => removeItem(item.code)}>
              <Icon
                icon="solar:trash-bin-trash-bold-duotone"
                className="text-red-500 hover:text-red-700"
                width={22}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
