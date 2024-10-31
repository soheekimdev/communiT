import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface CategorySelectorProps {
  categories: string[];
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategories,
  toggleCategory,
}) => {
  return (
    <div className="w-[24rem] m-auto grid grid-cols-3 gap-2">
      {categories.map((category, index) => (
        <label
          key={index}
          htmlFor={index.toString()}
          className="flex items-center hover:cursor-pointer"
        >
          <Badge variant="options" className="flex items-center justify-between w-full">
            <Checkbox
              id={index.toString()}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => toggleCategory(category)}
            />
            <span className="flex-1 text-center">{category}</span>
          </Badge>
        </label>
      ))}
    </div>
  );
};

export default CategorySelector;
