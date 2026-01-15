"use cliente";

import { useState, useEffect } from "react";
import { getFinalizedBoxes } from "@/services/boxService";
import { FinalizedBox } from "@/types/boxFinalized.type";
import { Card } from "@/components/ui/card";
import { Icon } from "@iconify/react";

export default function Relatorios() {
    const [boxes, setBoxes] = useState<FinalizedBox[]>([]);
    const [loading, setLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        async function load () {
            try {
                const data = await getFinalizedBoxes();
                 console.log("Caixas recebidas da APIIIIIIIIIII:", data); 
                setBoxes(data);
            } catch (error) {
                
                console.error("Erro ao carregar boxes finalizadas:", error);
                setError("Erro ao carregar boxes finalizadas.");
            
            } finally{
                setLoading(false);}
        }
        load();
    }, []);
    if (loading) return <p>Carregando...</p>
    if (error) return <p className="text-red-500">{error}</p>;
      if (boxes.length === 0) return <p>Nenhuma caixa finalizada encontrada.</p>;

 return (
        <div className="p-5">
            <h1 className="text-lg font-poppins gap-4">Relatório - Caixas Finalizadas</h1>

            <div className="grid gap-4 mt-4">
                {boxes.map((box) => (
                    <Card key={box.box_id} className="p-4 flex justify-between">
                        <div>
                            <p className="font-semibold">Box #{box.box_id}</p>
                            <p className="text-sm text-gray-500">
                                {new Date(box.created_at).toLocaleDateString()}
                            </p>
                        </div>

                        <div>{box.total_products} produtos</div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
