import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/useToast';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const dummyUserListData = [
  {
    id: 1,
    nickname: '인삼이',
    profileImg: 'https://example.com/my-default-image.png',
  },
  {
    id: 2,
    nickname: '용산손질장인',
    profileImg: 'https://example.com/my-default-image.png',
  },
  {
    id: 3,
    nickname: '길동무가있는홍길동',
    profileImg: 'https://example.com/my-default-image.png',
  },
];

interface User {
  id: number;
  nickname: string;
  profileImg: string;
}

interface UserListProps {
  onBack: () => void;
  onUnblock: (userId: number) => void;
}

const UserList = ({ onBack, onUnblock }: UserListProps) => {
  const [users, setUsers] = useState<User[]>(dummyUserListData);

  const handleUnblock = (userId: number) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    onUnblock(userId);
  };

  return (
    <div className="max-w-[600px] space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack} aria-label="뒤로 가기">
          <ChevronLeft />
        </Button>
        <h3 className="text-lg font-medium">차단된 사용자 목록</h3>
      </div>

      <p className="text-[0.8rem] text-muted-foreground">
        차단한 사용자의 모든 커뮤니티 활동(게시물, 댓글 등)이 숨겨지며, 해당 사용자도 내 활동을
        확인할 수 없습니다.
      </p>

      {users.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">차단된 사용자가 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {users.map(user => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <Avatar size="sm">
                  <AvatarImage src={user.profileImg} alt={`${user.nickname} 프로필`} />
                  <AvatarFallback>{user.nickname}</AvatarFallback>
                </Avatar>
                <div>
                  <p>{user.nickname}</p>
                </div>
              </div>
              <Button variant="secondary" onClick={() => handleUnblock(user.id)}>
                차단 해제
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CommunitySetting = () => {
  const { toast } = useToast();
  const [showBlockedUser, setShowBlockedUser] = useState(false);

  const handleUnblock = async (userId: number) => {
    try {
      // API 호출 로직
      toast({
        title: '차단 해제',
        description: '선택한 사용자의 차단이 해제되었습니다.',
        duration: 3000,
      });
      console.log(`다음 유저의 차단이 해제됨: ${userId}`);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '오류',
        description: '차단 해제에 실패했습니다. 다시 시도해주세요.',
      });
      console.log('유저 차단 해제에 실패했습니다:', error);
    }
  };

  if (showBlockedUser) {
    return <UserList onBack={() => setShowBlockedUser(false)} onUnblock={handleUnblock} />;
  }

  return (
    <div className="max-w-[600px]">
      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base">
            차단 목록 관리
          </label>
          <p className="text-[0.8rem] text-muted-foreground">
            차단한 사용자 목록을 조회하고 수정할 수 있습니다.
          </p>
        </div>
        <button></button>
        <Button variant="ghost" size="icon" onClick={() => setShowBlockedUser(true)}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default CommunitySetting;
