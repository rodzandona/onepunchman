import { Input } from "@/components/ui/input";

interface BoxInputProps {
  value: string;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}


export default function BoxInput({ value, disabled, onChange, onKeyDown }: BoxInputProps) {
  return (
    <Input
      value={value}
      disabled={disabled}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="AGUARDANDO CAIXA..."
      className="
        min-h-12 md:min-h-20 text-center uppercase font-semibold 
        text-gray-700 tracking-wide text-base md:text-lg
        placeholder:text-gray-400
      "
    />
  );
}
