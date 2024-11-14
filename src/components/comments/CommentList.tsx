// CommentList.tsx
import CommentCard from './CommentCard';

interface Comment {
  id: string;
  postId: string;
  accountId: string;
  content: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  dislikeCount: number;
  pureLikeCount: number;
  accountUsername: string;
}

const comments: Comment[] = [
  {
    id: '1',
    postId: '1',
    accountId: 'user1',
    content: '정말 좋은 운동이군요',
    isDeleted: false,
    createdAt: '2024-11-13T12:00:00Z',
    updatedAt: '2024-11-13T12:00:00Z',
    likeCount: 5,
    dislikeCount: 1,
    pureLikeCount: 4,
    accountUsername: '권여진이',
  },
  {
    id: '2',
    postId: '1',
    accountId: 'user2',
    content: '대답. 대답. 대답. 대답. 대답. 대답. 대답. 대답.',
    isDeleted: false,
    createdAt: '2024-11-14T13:30:00Z',
    updatedAt: '2024-11-14T13:30:00Z',
    likeCount: 3,
    dislikeCount: 0,
    pureLikeCount: 3,
    accountUsername: '어리둥절범고래',
  },
  {
    id: '3',
    postId: '1',
    accountId: 'user2',
    content: '저희 홍삼이랑 함께 하고 싶은 운동이네요',
    isDeleted: false,
    createdAt: '2024-11-14T19:30:00Z',
    updatedAt: '2024-11-14T21:20:00Z',
    likeCount: 8,
    dislikeCount: 0,
    pureLikeCount: 3,
    accountUsername: '홍삼이첫째언니',
  },
];

const CommentList = () => {
  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
