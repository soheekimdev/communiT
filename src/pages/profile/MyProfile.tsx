import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, User } from 'lucide-react';
import { useAppDispatch } from '@/RTK/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/RTK/store';
import { fetchCurrentUser } from '@/RTK/authSlice';

const MyProfile = () => {
  const { toast } = useToast();
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('accessToken');

      if (token) {
        try {
          const result = await dispatch(fetchCurrentUser()).unwrap();
          return result;
        } catch (error) {
          console.error('Fetch error:', error);
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    checkUser();
  }, [dispatch, navigate]);

  const handleSwitchChange = () => {
    setIsSwitchOn(prev => !prev);
    toast({
      title: isSwitchOn ? '계정 공개' : '계정 비공개',
      description: isSwitchOn ? '계정이 공개로 설정되었습니다.' : '계정이 비공개로 설정되었습니다.',
      duration: 3000,
    });
  };

  return (
    <div className="overflow-hidden h-full mx-auto">
      <div className="relative p-8 space-y-2">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">{user?.username}님의 정보</h1>
          <div className="flex items-center">
            <Label className="mr-4">계정 비공개</Label>
            <Switch checked={isSwitchOn} onCheckedChange={handleSwitchChange} />
          </div>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative mt-4">
            <Avatar size="lg">
              <AvatarImage src={user?.profileImageUrl || ''} alt="Profile Picture" />
              <AvatarFallback>사용자</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mt-2">
              <User className=" h-6 w-6" />
              <h2 className="text-2xl font-semibold">{user?.username}</h2>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Mail className="h-5 w-5" />
              <p className="text-lg">{user?.email}</p>
            </div>
          </div>
          {user?.bio && user?.bio}
        </div>
        <div className="w-[20rem] m-auto space-y-4">
          <p className="text-xl font-medium text-center">관심 카테고리</p>
          <div className="grid grid-cols-3 gap-2">
            <Badge variant="soccer">축구</Badge>
            <Badge variant="tennis">테니스</Badge>
            <Badge variant="baseball">야구</Badge>
            <Badge variant="basketball">농구</Badge>
            <Badge variant="scubadiving">스쿠버 다이빙</Badge>
            <Badge variant="waterski">수상스키</Badge>
            <Badge variant="running">런닝</Badge>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <Link to="/edit-profile">
          <Button className="w-[20rem]" variant="profile">
            정보 수정
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MyProfile;
