"use client";



import { Card } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";


export default function Settings() {


  return (
    <div className="font-thin p-[6px]">

      <div className="bg-gray-100 w-full p-5 shadow ">
        <div className="flex justify-start gap-10">
          <Icon icon="solar:arrow-left-linear" className=" mt-1 h-8 w-8 text-center hover:bg-gray-300 hover:rounded-full" />
          <div className="flex gap-2">
            <Icon icon="solar:settings-line-duotone" className="h-7 w-7 text-gray-500 mt-1" />
            <h1 className="text-2xl  font-bold text-gray-800">Configurações</h1>
          </div>
        </div>
      </div>

      <div className="p-[6px]">
        <div className="flex justify-center text-center">
          <img
            src="johnson-johnson-logo-png_seeklogo-500414-removebg-preview.png"
            alt="imagem j&j centro"
            className="w-40 mx-auto"
          />
        </div>

        <Card className="rounded-lg p-[8px] shadow-lg mb-6">
          <div className="flex justify-start gap-3 p-[2px] ">
            <Icon icon="solar:user-circle-bold-duotone" className="w-8 h-8 text-red-500" />
            <div className="flex items-center justify-between w-full">
              <h1 className="text-lg font-normal">Admin_jsj_098</h1>
              <Button className="bg-red-700 hover:bg-red-900 shadow-lg">
                Sair
              </Button>
            </div>
          </div>
        </Card>
        <div className="w-full h-px bg-gray-500 mb-4"></div>

        <Card className="w-full rounded-lg shadow-lg">
          <div className="p-2 font-semibold">
            {/* Versão do App */}
            <div className="bg-gray-200 rounded-lg p-2 flex justify-between items-center">
              <span>Versão do App</span>
              <span>1.0.0</span>
            </div>
            {/* Versão de Compilação */}
            <div className="p-2 flex justify-between items-center">
              <span>Versão de Compilação</span>
              <span>1.0.0</span>
            </div>
          </div>

        </Card>

      </div>
    </div>
  );
}