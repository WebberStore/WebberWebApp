import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { pick } from 'lodash';
import { Input, Button, Lottie } from '../components/common';
import { Layout } from '../components/layout';
import { refreshToken, updateUser } from '../services';
import toast from '../libs/toastify';
import ProfileAnimation from '../../public/assets/animations/profile.json';

const Profile = () => {
  const user = useSelector((store) => store.data.user.authUser);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(pick(user, ['username', 'phoneNumber']));
  }, [user]);

  const handleInputChange = ({ target: { id, value } }) => {
    setFormData({
      ...formData,
      [id]: value?.trim(),
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateUser(user.id, { ...formData }).then((data) => {
      if (data) {
        toast.success(data.message);
        refreshToken();
      }
    });
  };

  return (
    <Layout title="Profile">
      <div class="flex flex-col justify-center items-start px-6 md:px-[4.3rem] py-4 md:py-8">
        <div class="font-semibold text-3xl">Edit Profile</div>

        <form class={`w-full min-h-[70vh] flex flex-col justify-center items-center ${user?.role === 'Seller' ? 'mt-12' : 'mt-3'}`} onSubmit={onSubmit}>
          <div class="flex justify-center items-center">
            <div class={`w-9/12 sm:w-7/12 ${user?.role === 'Seller' ? '2xl:w-6/12' : '2xl:w-full'} mb-10`}>
              <Lottie animationData={ProfileAnimation} />
            </div>
          </div>
          <div class="w-full flex flex-col lg:flex-row justify-between items-center gap-x-3">
            <Input type="text" id="username" placeholder="Username" required value={formData.username} label onChange={handleInputChange} wrapperclasses="w-full" />
          </div>
          <div class="w-full flex flex-col lg:flex-row justify-between items-center gap-x-3">
            <Input type="text" id="phoneNumber" placeholder="Mobile" required value={formData.phoneNumber} label onChange={handleInputChange} wrapperclasses="w-full" />
            <Input id="password" type="password" placeholder="Password" value={formData.password} label onChange={handleInputChange} wrapperclasses="w-full" />
          </div>
          <Button className="w-full px-12 py-3.5 mt-5">Update</Button>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
