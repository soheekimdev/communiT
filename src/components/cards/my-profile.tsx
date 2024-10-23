import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';
import { Mail } from 'lucide-react';

const MyProfile = () => {
  const [profileImage, _] = useState('');
  const defaultImage = 'https://example.com/my-default-image.png';

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">My Profile</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              className="h-full w-full"
              src={profileImage || defaultImage}
              alt="Profile Picture"
            />
            <AvatarFallback>사용자</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-2xl font-medium text-center">userName</h2>
            <div className="flex flex-row gap-2 justify-center">
              <Mail className="text-gray-400 h-5 w-5 translate-y-1/4" />
              <p className="text-xl text-muted-foreground text-center">userEmail@example.com</p>
            </div>
            <p className="text-xl text-muted-foreground text-center mt-6">관심 카테고리</p>
            <div className="flex flex-row gap-2 mt-2">
              <Badge variant="soccer">축구</Badge>
              <Badge variant="tennis">테니스</Badge>
              <Badge variant="baseball">야구</Badge>
              <Badge variant="basketball">농구</Badge>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="profile">
          정보 수정
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MyProfile;
