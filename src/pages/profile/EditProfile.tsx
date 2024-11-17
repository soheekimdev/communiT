import { useSelector } from 'react-redux';
import { RootState } from '@/RTK/store';
import UpdateNickname from '@/components/profile/UpdateNickname';
import UpdateProfileImage from '@/components/profile/UpdateProfileImage';
import UpdateBio from '@/components/profile/UpdateBio';
import UpdatePassword from '@/components/profile/UpdatePassword';
import UpdateCategory from '@/components/profile/UpdateCategory';

const EditProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;
  const token = localStorage.getItem('accessToken');
  const currentNickname = user?.username || '';
  const currentBio = user?.bio || '';

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">정보 수정</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UpdateProfileImage
          userId={userId || ''}
          token={token || ''}
          profileImageUrl={user?.profileImageUrl || ''}
        />
        <UpdateNickname
          userId={userId || ''}
          token={token || ''}
          currentNickname={currentNickname}
        />
        <UpdateBio userId={userId || ''} token={token || ''} currentBio={currentBio} />
        {/* Password, Category 백엔드 API 연동 X */}
        <UpdatePassword userId={userId || ''} token={token || ''} />
        <UpdateCategory />
      </div>
    </div>
  );
};

export default EditProfile;
