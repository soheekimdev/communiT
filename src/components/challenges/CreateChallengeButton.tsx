import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

export const CreateChallengeButton = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate('/challenges/create')} className="flex items-center gap-2">
      <Plus size={18} />
      <span>새 챌린지 만들기</span>
    </Button>
  );
};
