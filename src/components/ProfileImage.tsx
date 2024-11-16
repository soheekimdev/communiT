import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { UserIcon } from 'lucide-react';

interface ProfileImageProps {
  profileImageUrl?: string;
  className?: string;
}

const ProfileImage = ({ profileImageUrl, className = '' }: ProfileImageProps) => {
  return profileImageUrl ? (
    <Avatar className={`h-8 w-8 mr-2 ${className}`}>
      <AvatarImage src={profileImageUrl} />
    </Avatar>
  ) : (
    <UserIcon className={`mr-2 h-4 w-4 ${className}`} />
  );
};

export default ProfileImage;
