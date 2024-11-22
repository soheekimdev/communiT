import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type MarkdownCheckboxProps = {
  isMarkdown: boolean;
  setIsMarkdown: (value: boolean) => void;
};

const MarkdownCheckbox = ({ isMarkdown, setIsMarkdown }: MarkdownCheckboxProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="markdown-checkbox"
        checked={isMarkdown}
        onCheckedChange={checked => setIsMarkdown(!!checked)}
      />
      <Label htmlFor="markdown-checkbox">Markdown 사용하기</Label>
    </div>
  );
};

export default MarkdownCheckbox;
