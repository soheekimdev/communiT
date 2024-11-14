import CommentInput from './CommentInput';
import CommentList from './CommentList';

const CommentForm = () => {
  return (
    <div className="flex flex-col gap-4">
      <CommentList />
      <CommentInput />
    </div>
  );
};

export default CommentForm;
