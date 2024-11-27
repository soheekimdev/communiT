import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

type ActionFeedbackProps = {
  error?: string | null;
  success?: boolean;
  successTitle?: string;
  successMessage?: string;
  errorTitle?: string;
};

const ActionFeedback = ({
  error,
  success,
  successTitle = '성공',
  successMessage = '작업이 성공적으로 완료되었습니다.',
  errorTitle = '오류',
}: ActionFeedbackProps) => {
  if (!error && !success) return null;

  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{errorTitle}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert variant="default" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{successTitle}</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default ActionFeedback;
