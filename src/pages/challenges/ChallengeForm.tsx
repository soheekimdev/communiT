import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createChallenge, getChallenge, updateChallenge } from '@/api/challenges';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import { ChallengeFormProps, ChallengeFormState } from '@/types/challenge';
import { startOfToday } from 'date-fns';
import axios from 'axios';
import { challengeFormSchema, ChallengeFormValues } from '@/schemas/challenges';
import { getChangedFields } from '@/lib/form-utils';

const ChallengeForm = ({ isEditing = false }: ChallengeFormProps) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [initialValues, setInitialValues] = useState<ChallengeFormValues | null>(null);
  const [formState, setFormState] = useState<ChallengeFormState>({
    date: undefined,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const fetchChallenge = async () => {
      if (!isEditing || !id) return;

      try {
        setFormState(prev => ({ ...prev, isLoading: true }));
        const challenge = await getChallenge(id);

        const validatedChallenge = challengeFormSchema.parse(challenge);
        setInitialValues(validatedChallenge);

        setFormState(prev => ({
          ...prev,
          date: {
            from: new Date(challenge.startDate),
            to: new Date(challenge.endDate),
          },
        }));
      } catch (err) {
        handleError(err);
      } finally {
        setFormState(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchChallenge();
  }, [id, isEditing]);

  const handleError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      if (err.code === 'ECONNABORTED' || err.response?.status === 504) {
        setFormState(prev => ({
          ...prev,
          error: '서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.',
        }));
      } else {
        setFormState(prev => ({
          ...prev,
          error: err.response?.data?.message || '챌린지 생성에 실패했습니다.',
        }));
      }
    } else {
      setFormState(prev => ({
        ...prev,
        error: '알 수 없는 오류가 발생했습니다.',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.date?.from || !formState.date?.to) return;

    setFormState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const formData = new FormData(e.currentTarget);
      const rawFormValues = {
        title: formData.get('title'),
        description: formData.get('description'),
        type: 'self-check' as const,
        startDate: formState.date.from.toISOString(),
        endDate: formState.date.to.toISOString(),
        isDeleted: false,
        isPublished: false,
        isFinished: false,
      };

      const parseResult = challengeFormSchema.safeParse(rawFormValues);

      if (!parseResult.success) {
        const errorMessages = parseResult.error.errors.map(err => err.message).join(', ');
        setFormState(prev => ({ ...prev, error: errorMessages }));
        return;
      }

      const validatedValues = parseResult.data;

      if (isEditing && id && initialValues) {
        const changedFields = getChangedFields(initialValues, validatedValues);

        if (Object.keys(changedFields).length > 0) {
          await updateChallenge(id, changedFields);
        }
      } else {
        await createChallenge(validatedValues);
      }

      navigate('/challenges');
    } catch (err) {
      handleError(err);
    } finally {
      setFormState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? '챌린지 수정' : '새로운 챌린지 만들기'}
      </h1>

      {formState.error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
          {formState.error}
        </div>
      )}

      {formState.isLoading && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded">
          {isEditing ? '챌린지를 수정하고 있습니다...' : '챌린지를 생성하고 있습니다...'}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            챌린지 제목
          </label>
          <Input
            id="title"
            name="title"
            placeholder="예) 30일 플랭크 챌린지"
            maxLength={60}
            required
            defaultValue={initialValues?.title}
          />
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
            className="h-40"
            defaultValue={initialValues?.description}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">챌린지 기간</label>
          <DatePickerWithRange
            date={formState.date}
            onSelect={newDate => setFormState(prev => ({ ...prev, date: newDate }))}
            minDate={startOfToday()}
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            disabled={formState.isLoading}
          >
            취소
          </Button>
          <Button
            type="submit"
            disabled={formState.isLoading || !formState.date?.from || !formState.date?.to}
          >
            {formState.isLoading
              ? isEditing
                ? '수정 중...'
                : '생성 중...'
              : isEditing
              ? '챌린지 수정'
              : '챌린지 만들기'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChallengeForm;
