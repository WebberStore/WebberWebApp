import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { KeyIcon, MailIcon, UserIcon, PhoneIcon } from '@heroicons/react/solid';
import { Input, Button, Lottie, Dropdown } from '../../components/common';
import { Layout } from '../../components/layout';
import { register } from '../../services';
import { setFormData } from '../../store/ui/register';
import toast from '../../libs/toastify';
import LoginAnimation from '../../../public/assets/animations/login.json';

const Register = () => {
  const navigateTo = useNavigate();

  const { formData, allowedRoles } = useSelector((state) => state.ui.register);

  const dispatch = useDispatch();

  const loginBtn = useRef();

  useEffect(() => {
    if (loginBtn.current) {
      loginBtn.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [formData.role]);

  const handleInputChange = ({ target: { id, value } }) => {
    dispatch(
      setFormData({
        ...formData,
        [id]: value?.trim(),
      }),
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await register({...formData, confirmPassword: formData.password, address: {
      city: "-",
      state: "-",
      country: "-",
      postalCode: "-",
      street: "-"
    }}).then((data) => {
      if (data) {
        navigateTo('/login');
        dispatch(setFormData({}));
        setTimeout(() => {
          toast.success(data.message);
        }, 300);
      }
    });
  };

  return (
    <Layout title="Register" hideHeader hideFooter>
      <div class="w-full py-12 px-7 md:px-12 rounded-2xl">
        <div class="flex justify-center items-center">
          <div class="w-11/12 sm:w-7/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 mb-10">
            <Lottie animationData={LoginAnimation} />
          </div>
        </div>
        <form class="flex flex-col " onSubmit={onSubmit}>
          <div class="flex flex-col lg:flex-row justify-between items-center gap-x-3">
            <Input type="text" id="firstName" placeholder="First Name" required value={formData.firstName} onChange={handleInputChange} prefixIcon={<UserIcon />} wrapperclasses="w-full" />
            <Input type="text" id="lastName" placeholder="Last Name" required value={formData.lastName} onChange={handleInputChange} prefixIcon={<UserIcon />} wrapperclasses="w-full" />
            <Input type="text" id="username" placeholder="Username" required value={formData.username} onChange={handleInputChange} prefixIcon={<UserIcon />} wrapperclasses="w-full" />
            <Input type="text" id="email" placeholder="Email" required value={formData.email} onChange={handleInputChange} prefixIcon={<MailIcon />} wrapperclasses="w-full" />
          </div>
          <div class="flex flex-col lg:flex-row justify-between items-center gap-x-3">
            <Input type="text" id="phoneNumber" placeholder="Mobile" required value={formData.phoneNumber} onChange={handleInputChange} prefixIcon={<PhoneIcon />} wrapperclasses="w-full" />
          </div>
          <div class="flex flex-col lg:flex-row justify-between items-center gap-x-3">
            <Input id="password" type="password" placeholder="Password" required value={formData.password} onChange={handleInputChange} prefixIcon={<KeyIcon />} wrapperclasses="w-full" />
            <Dropdown id="role" filterkey="role" options={allowedRoles} className="h-12 sm:h-14" wrapperclasses="my-2 sm:my-0" onChange={handleInputChange} />
          </div>
          <Button className="px-12 py-3.5 mt-5">Register</Button>
          <div class="group flex justify-end items-center mt-6">
            <div ref={loginBtn} class="flex justify-center items-center">
              <p class="text-sm mr-2 font-semibold">{`Already have an account -->`}</p>
              <Link class="cursor-pointer text-sm text-primary-base hover:text-primary-hover group-hover:mr-2 transition-all duration-300" to="/login">
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
