import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/useToast';
import { useState, useEffect } from 'react';
import { fetchTag } from '@/api/tag';
import CategorySelector from './CategorySelector';

interface Tag {
  id: string;
  name: string;
  hslColor: string;
}

const UpdateCategory = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const response = await fetchTag();
        const fetchedCategories = response.data.map((tag: Tag) => ({
          id: tag.id,
          name: tag.name,
          hslColor: tag.hslColor,
        }));
        setAvailableCategories(fetchedCategories);
      } catch (error) {
        toast({
          title: '카테고리 불러오기 실패',
          description: '카테고리 데이터를 불러오는 중 오류가 발생했습니다.',
        });
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

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
        {loading ? (
          <p>카테고리를 불러오는 중...</p>
        ) : (
          <CategorySelector
            categories={availableCategories.map(tag => tag.name)}
            selectedCategories={categories}
            toggleCategory={toggleCategory}
          />
        )}
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
