import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface BioInputProps {
  id: string;
  label: string;
  placeholderValue: string;
  register: UseFormRegisterReturn;
  error?: FieldError | null;
}

export default function BioInput({ id, label, placeholderValue, register, error }: BioInputProps) {
  return (
    <div className="relative w-full">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative mt-1">
        <Textarea
          id={id}
          placeholder={placeholderValue}
          {...register}
          className={`pl-10 pr-4 min-h-[100px] ${error ? 'border-red-500' : ''}`}
        />
        <FileText className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}
