"use client";


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";


interface SettingsProps {
  onGoHome: () => void
  onLogout: () => void
}

export default function Settings({ onGoHome, onLogout }: SettingsProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="font-thin p-[6px]">

      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <button

            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Icon icon="solar:arrow-left-linear" className="w-6 h-6 text-gray-700" />
          </button>

          <div className="flex items-center gap-2">
            <Icon icon="solar:settings-bold-duotone" className="w-6 h-6 text-[#D82B14]" />
            <h1 className="text-lg font-semibold text-gray-800">Configurações</h1>
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
              <Button
                className="bg-red-700 hover:bg-red-900 shadow-lg"
                onClick={() => setOpen(true)}
              >
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

      {/*Modal aviso*/}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deseja sair da aplicação?</DialogTitle>
            <DialogDescription>
              Você precisará fazer login novamente.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2">
            {/* VOLTAR */}
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false)
                onGoHome()
              }}
            >
              Voltar
            </Button>
            <Button
              className="bg-red-700 hover:bg-red-900"
              onClick={() => {
                setOpen(false)
                onLogout()
              }}
            >
              Sim, quero sair
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );

}


