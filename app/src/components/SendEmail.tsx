import { useState } from 'react';
import { Icon } from '@iconify/react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from "sonner";

import { Box } from '@/types/box.type';
import { sendExcel } from "@/services/export.service";

interface SendEmailProps {
  boxes: Box[];
  isOpen: boolean;
  onClose: () => void;
}

export default function SendEmail({ boxes, isOpen, onClose }: SendEmailProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!email.trim()) {
      toast.warning("Digite um e-mail válido.");
      return;
    }

    setLoading(true);

    try {
      await sendExcel({ email, boxes });

      toast.success("Conferência enviada com sucesso!");
      localStorage.deleteItem("boxes");
      onClose(); // fecha o modal
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar conferência.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-md w-[90%]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Icon icon="solar:mailbox-linear" width={22} height={22} className="text-[#D82B14]" />
            Enviar Conferência
          </DialogTitle>
          <DialogDescription>
            Informe o e-mail que receberá o arquivo Excel.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
              Destinatário
            </label>
            <div className="relative group">
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="exemplo@empresa.com"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:border-gray-700 focus:ring-4 focus:ring-gray-900/10 bg-white transition-all"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Icon icon="solar:letter-linear" width={20} height={20} className="text-gray-300" />
              </div>
            </div>
          </div>

          <button
            className="w-full bg-[#D82B14] hover:bg-[#b82410] text-white font-semibold py-3.5 rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group"
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processando...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                Enviar Agora
                <Icon
                  icon="solar:arrow-right-linear"
                  width={18}
                  height={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            )}
          </button>
        </div>

        <div className="px-6 py-4 bg-gray-100/75 -mx-6 -mb-6 mt-6 border-t border-gray-100 rounded-b-2xl">
          <p className="text-xs text-gray-500 text-center">
            A conferência será enviada em formato Excel para o e-mail informado.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
