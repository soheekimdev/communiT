import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const SuccessAlert = ({ message }: { message: string }) => (
  <Alert variant="default" className="mb-4">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>성공</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

export default SuccessAlert;
