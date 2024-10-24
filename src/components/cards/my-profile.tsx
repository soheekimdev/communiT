import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const MyProfile = () => {
  const [profileImage, _] = useState<any>('');
  const defaultImage = 'https://example.com/my-default-image.png';

  return (
    <div className="bg-[#fafafa] overflow-hidden h-full mx-auto">
      <div className="relative p-8 space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">나의 정보</h1>
        <div className="grid gap-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-gray shadow-lg">
                <AvatarImage
                  className="h-full w-full object-cover"
                  src={profileImage || defaultImage}
                  alt="Profile Picture"
                />
                <AvatarFallback>사용자</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-gray-800">userName</h2>
              <div className="flex items-center gap-2 mt-2">
                <Mail className="text-gray-500 h-5 w-5" />
                <p className="text-lg text-gray-600">userEmail@example.com</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-xl font-medium text-center text-gray-700">관심 카테고리</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="soccer" className="px-4 py-2 text-sm font-medium">
                축구
              </Badge>
              <Badge variant="tennis" className="px-4 py-2 text-sm font-medium">
                테니스
              </Badge>
              <Badge variant="baseball" className="px-4 py-2 text-sm font-medium">
                야구
              </Badge>
              <Badge variant="basketball" className="px-4 py-2 text-sm font-medium">
                농구
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
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
