import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type ErrorStateProps = {
  error: string | null;
  onBack: () => void;
};

const ErrorState = ({ error, onBack }: ErrorStateProps) => (
  <div className="container mx-auto p-4">
    <div className="text-red-500">{error || '챌린지를 찾을 수 없습니다.'}</div>
    <Button variant="outline" onClick={onBack} className="mt-4">
      <ArrowLeft className="mr-2 h-4 w-4" />
      돌아가기
    </Button>
  </div>
);

export default ErrorState;
