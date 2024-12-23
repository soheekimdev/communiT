import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/useToast';
import { Mail, User, FileText } from 'lucide-react';
import { useAppDispatch } from '@/RTK/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/RTK/store';
import { fetchCurrentUser } from '@/RTK/authSlice';
import { updatePrivate } from '@/api/profile';

const ProfileInfo = ({ icon, text }: { icon: React.ReactNode; text: string | undefined }) => (
  <div className="flex items-center gap-2 mt-2">
    {icon}
    <p className="text-lg">{text}</p>
  </div>
);

const MyProfile = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(user?.isPrivate ?? false);

  useEffect(() => {
    const checkUser = async () => {
      if (token) {
        try {
          const result = await dispatch(fetchCurrentUser()).unwrap();
          setIsSwitchOn(result?.isPrivate ?? false);
        } catch (error) {
          console.error('Fetch error:', error);
          navigate('/sign-in');
        }
      } else {
        navigate('/sign-in');
      }
    };
    checkUser();
  }, [dispatch, navigate]);

  const handleSwitchChange = async () => {
    if (!token) {
      toast({
        title: '오류',
        description: '인증 토큰이 유효하지 않습니다. 다시 로그인하세요.',
      });
      return;
    }
    const newStatus = !isSwitchOn;
    setIsSwitchOn(newStatus);
    try {
      await updatePrivate(user?.id ?? '', newStatus, token);
      toast({
        title: newStatus ? '계정 비공개' : '계정 공개',
        description: `${user?.username}님의 계정이 ${
          newStatus ? '비공개로' : '공개로'
        } 설정되었습니다.`,
      });
    } catch (error) {
      console.error('Private update error:', error);
      setIsSwitchOn(!newStatus);
      toast({
        title: '오류',
        description: '설정을 변경하는 동안 문제가 발생했습니다.',
      });
    }
  };

  return (
    <div className="overflow-hidden h-full mx-auto">
      <div className="relative p-8 space-y-2">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">{user?.username}님의 정보</h1>
          <div className="flex items-center">
            <Label className="mr-4">계정 비공개</Label>
            <Switch checked={!!isSwitchOn} onCheckedChange={handleSwitchChange} />
          </div>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative mt-4">
            <Avatar size="lg">
              <AvatarImage
                src={user?.profileImageUrl || '/default/profile.png'}
                alt="Profile Picture"
              />
              <AvatarFallback>사용자</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center">
            <ProfileInfo icon={<User className="h-6 w-6" />} text={user?.username} />
            <ProfileInfo icon={<Mail className="h-5 w-5" />} text={user?.email} />
            <ProfileInfo
              icon={<FileText className="h-5 w-5" />}
              text={user?.bio || '소개가 없습니다.'}
            />
          </div>
        </div>
        {/* 카테고리 백엔드 api 연동 x */}
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
          <Button className="w-[20rem]">정보 수정</Button>
        </Link>
      </div>
    </div>
  );
};

export default MyProfile;
