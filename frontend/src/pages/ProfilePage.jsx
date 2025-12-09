import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js';
import { Camera, User } from 'lucide-react';

const ProfilePage = () => {
  const {authUser, isUpdatingProfile, updateProfile} = useAuthStore();
  const [selectedImg, setSelectedImg] = React.useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePicture: base64Image });
    };
  }

  return (
    <div className='h-screen pt-20'>
      <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md'>
        <div className='text-center'>
          <h1 className='text-2xl font-semibold'>Profile</h1>
          <p className='mt-2 text-gray-600'>Manage your profile information and settings.</p>
          </div>
          {/*avatar upload section*/  }
        <div className='mt-6 flex flex-col items-center'>
          <div className='relative'>
            <img 
              src={ selectedImg || authUser?.profilePicture || '/default-avatar.png'} 
              alt='Profile Avatar' 
              className='w-32 h-32 rounded-full object-cover border-4 border-primary'
            />
            <label htmlFor='avatarUpload' className='absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary-dark'>
              <Camera className="h-5 w-5 text-base-500" />
        
              <input
                type="file"
                id="avatarUpload"
                className="hidden"
                accept='image/*'
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className='text-sm text-zinc-400'>
            {isUpdatingProfile ? 'Uploading...' : 'Click the camera icon to change your avatar.'}
          </p>
          </div>
          <div className='space-y-6 mt-5'>
            {/* Additional profile fields can go here */}
            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <User className="h-5 w-5" />
                Full Name
                </div>
                <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.fullName}</p>
              
            </div>
            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <User className="h-5 w-5" />
                Email Address
                </div>
                <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.email}</p>
              
            </div>
          </div>
          <div className='mt-6 bg-base-300 rounded-xl p-6'>
            <h2 className='text-lg font-medium mb-4'>Account Information</h2>
            <div className='space-y-4 text-sm'>
              {/* Settings options can go here */}
              <div className='flex items-center justify-between py-2 border-b border-zinc-400'>
                <span>Member Since:</span>
                <span>{authUser.createdAt?.split('T')[0] || 'N/A'}</span>
              </div>
              <div className='flex items-center justify-between py-2 border-b border-zinc-400'>
                <span>Account Status</span>
                <span>Active</span>
              </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default ProfilePage