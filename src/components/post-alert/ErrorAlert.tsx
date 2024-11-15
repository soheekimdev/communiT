import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const ErrorAlert = ({ message }: { message: string }) => (
  <Alert variant="destructive" className="mb-4">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>오류</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

export default ErrorAlert;
