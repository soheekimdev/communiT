import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';

const MyProfile = () => {
  const [profileImage, setProfileImage] = useState('');
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
            <p className="text-xl text-muted-foreground text-center">
              userEmail@example.com
            </p>

            <p className="text-xl text-muted-foreground text-center mt-6">
              Categories You Like
            </p>
            <div className="flex flex-row gap-2 items-center mt-2">
              <Badge variant="soccer">Soccer</Badge>
              <Badge variant="tennis">Tennis</Badge>
              <Badge variant="baseball">Baseball</Badge>
              <Badge variant="basketball">Basketball</Badge>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Modify Your Information</Button>
      </CardFooter>
    </Card>
  );
};

export default MyProfile;
