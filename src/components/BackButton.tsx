import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  };

  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="flex items-center space-x-2 transition-all duration-300 hover:bg-secondary"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>목록으로</span>
    </Button>
  );
};

export default BackButton;
