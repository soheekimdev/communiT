import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createChallenge } from '@/api/challenges';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import { startOfToday } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import axios from 'axios';

const CreateChallenge = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<DateRange>();
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date?.from || !date?.to) return;

    setIsLoading(true);
    setError(null);
    setAttempt(1);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        type: 'self-check' as const,
        startDate: date.from.toISOString(),
        endDate: date.to.toISOString(),
        isDeleted: false,
        isPublished: false,
        isFinished: false,
      };

      await createChallenge(data);
      navigate('/challenges');
    } catch (err) {
      console.error('상세 에러:', err);

      if (axios.isAxiosError(err)) {
        if (err.code === 'ECONNABORTED' || err.response?.status === 504) {
          setError('서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.');
        } else {
          setError(err.response?.data?.message || '챌린지 생성에 실패했습니다.');
        }
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
      setAttempt(0);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">새로운 챌린지 만들기</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>
      )}

      {isLoading && attempt > 0 && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded">
          챌린지를 생성하고 있습니다... (시도 {attempt}/3)
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            챌린지 제목
          </label>
          <Input id="title" name="title" placeholder="예) 30일 플랭크 챌린지" required />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            챌린지 설명
          </label>
          <Textarea
            id="description"
            name="description"
            placeholder="챌린지에 대해 자세히 설명해주세요"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">챌린지 기간</label>
          <DatePickerWithRange date={date} onSelect={setDate} minDate={startOfToday()} />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate(-1)} disabled={isLoading}>
            취소
          </Button>
          <Button type="submit" disabled={isLoading || !date?.from || !date?.to}>
            {isLoading ? '생성 중...' : '챌린지 만들기'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateChallenge;
