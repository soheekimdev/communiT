import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/useToast';
import { useState } from 'react';
import CategorySelector from './CategorySelector';

const categoryOptions = ['축구', '농구', '야구', '테니스', '스쿠버 다이빙', '수상스키', '런닝'];

const UpdateCategory = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleCategory = (category: string) => {
    setCategories(prevCategories =>
      prevCategories.includes(category)
        ? prevCategories.filter(c => c !== category)
        : [...prevCategories, category],
    );
  };

  const handleCategorySubmit = async () => {
    if (categories.length === 0) {
      toast({
        title: '카테고리 선택',
        description: '최소 하나의 카테고리를 선택해 주세요.',
      });
      return;
    }

    setLoading(true);
    try {
      // 카테고리 업데이트 로직
      console.log('선택된 카테고리:', categories);
      toast({
        title: '카테고리 업데이트',
        description: '카테고리가 성공적으로 업데이트되었습니다.',
      });
    } catch (error) {
      toast({
        title: '카테고리 업데이트 실패',
        description: '카테고리 업데이트 중 오류가 발생했습니다.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle>카테고리 변경</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CategorySelector
          categories={categoryOptions}
          selectedCategories={categories}
          toggleCategory={toggleCategory}
        />
        <div className="flex justify-center">
          <Button onClick={handleCategorySubmit} disabled={loading}>
            {loading ? '업데이트 중...' : '카테고리 업데이트'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateCategory;
