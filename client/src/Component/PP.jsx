import React, { useState } from 'react';

const Profile = () => {
  const [coverPhoto, setCoverPhoto] = useState(
    "https://images.unsplash.com/photo-1503264116251-35a269479413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
  );
  const [avatar, setAvatar] = useState(
    "https://cdn-icons-png.flaticon.com/256/3135/3135789.png"
  );

  const handleCoverPhotoChange = (e) => {
    const newCoverPhoto = URL.createObjectURL(e.target.files[0]);
    setCoverPhoto(newCoverPhoto);
  };

  const handleAvatarChange = (e) => {
    const newAvatar = URL.createObjectURL(e.target.files[0]);
    setAvatar(newAvatar);
  };

// ...

return (
  <div>
    <div className="w-full relative mt-4 shadow-2xl rounded my-24 overflow-hidden">
      <div className="top h-64 w-full bg-blue-600 overflow-hidden relative">
        <img
          src={coverPhoto}
          alt=""
          className="bg w-full h-full object-cover object-center absolute z-0"
        />
        <div className="flex flex-col justify-center items-center relative h-full bg-black bg-opacity-50 text-white">
          <img
            src={avatar}
            className="h-24 w-24 object-cover rounded-full"
          />
          <h1 className="text-2xl font-semibold">Antonia Howell</h1>
          <h4 className="text-sm font-semibold">Joined Since '19</h4>
          {/* Change Avatar button */}
          <label
            htmlFor="avatarInput"
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-1 px-3 rounded cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out"
            style={{ zIndex: 10 }}
          >
            Change Photo
          </label>
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
        {/* Change Cover Photo button */}
        <label
          htmlFor="coverPhotoInput"
          className="absolute bottom-4 right-4 bg-white text-blue-600 py-2 px-4 rounded cursor-pointer"
        >
          Change Cover Photo
        </label>
        <input
          id="coverPhotoInput"
          type="file"
          accept="image/*"
          onChange={handleCoverPhotoChange}
          className="hidden"
        />
      </div>

    </div>
  </div>
);

}
export default Profile
