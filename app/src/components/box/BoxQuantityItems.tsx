import { BoxItem } from "@/types/boxItem.type";
import { Badge } from "../ui/badge";

interface BoxQuantityItemsProps {
    items: BoxItem[]
}

export default function BoxQuantityItems ({ items }:BoxQuantityItemsProps) {
    return(
        <div className="flex items-center justify-between">
            <h2 className="text-gray-700 text-lg font-semibold tracking-wide"> Quantidade de Itens</h2>
            <Badge className="bg-gray-300 text-gray-900 font-bold px-3 py-1"> {items.length} </Badge>
          </div>
    )
}