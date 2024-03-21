import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import WhiteButton from "../../components/Buttons/WhiteButton";
import AuthInput from "../../components/Inputs/AuthInput";
import authAPI from "../../apis/authAPI";

const Signup = () => {
	const navigate = useNavigate();
  const [formState, setFormState] = useState<any>({
    fullname: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({
    fullname: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const onFormStateChange = (e: any) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: ''
    })
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    const errName = !formState.fullname ? 'Họ và tên không được để trống' 
      : !/^[a-zA-Z ]+$/.test(formState.fullname.trim()) ? 'Họ và tên không đúng định dạng!' : ''
    const errPhone = !formState.phoneNumber ? 'Số điện thoại không được để trống'
      : !/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(formState.phoneNumber.trim()) ? 'Số điện thoại không đúng định dạng!' : ''
    const errEmail = !formState.email ? 'Email không được để trống'
      : !RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$").test(formState.email.trim()) ? 'Email không đúng định dạng!' : ''
    const errPassword = !formState.password ? 'Mật khẩu không được để trống'
      : !RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*()_+])[A-Za-z\\d!@#$%^&*()_+]{8,}$").test(formState.password.trim()) ? 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái, số và ký tự đặc biệt' : ''
    if (errName || errPhone || errEmail || errPassword) {
      setErrors({
        fullname: errName,
        phoneNumber: errPhone,
        email: errEmail,
        password: errPassword,
      })
    }
    if (errName === '' && errPhone === '' && errEmail === '' && errPassword === '') {
      const data = {
        fullname: formState.fullname.trim(),
        phoneNumber: formState.phoneNumber.trim(),
        email: formState.email.trim(),
        password: formState.password.trim(),
      }
      const response = await authAPI.register(data);
      if (response?.message === "Register successfully") {
          navigate("/login?from=signup");
      } else {
        toast.error(response.message);
      }
    }
  };
  
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        {/* log in section */}
        <div className="w-1/2 flex flex-col items-center mx-auto">
          <h1 className="text-3xl font-bold">Đăng ký</h1>
          {/* login form */}
          <form className="w-full" action="" onSubmit={handleSignup}>
            <AuthInput
              onChange={onFormStateChange}
              name="fullname"
              placeholder="Họ và tên..."
              // required
            />
            {errors.fullname && (
              <label htmlFor="name" className="text-red-500 ml-4">
                {errors.fullname}
              </label>
            )}
            <AuthInput
              onChange={onFormStateChange}
              name="phoneNumber"
              placeholder="Số điện thoại..."
              type="tel"
              // required
            />
            {errors.phoneNumber && (
              <label htmlFor="phoneNum" className="text-red-500 ml-4">
                {errors.phoneNumber}
              </label>
            )}
            <AuthInput
              type="email"
              onChange={onFormStateChange}
              name="email"
              placeholder="Email..."
              // required
            />
            {errors.email && (
              <label htmlFor="email" className="text-red-500 ml-4">
                {errors.email}
              </label>
            )}
            <AuthInput
              onChange={onFormStateChange}
              name="password"
              placeholder="Password..."
              type="password"
              // required
            />
            {errors.password && (
              <label htmlFor="password" className="text-red-500 ml-4">
                {errors.password}
              </label>
            )}
            <WhiteButton rounded="full" type="submit" text="Đăng ký" />
          </form>
          <div className="flex justify-between items w-full">
            <Link to="/login">
              <p className="text-blue-500 cursor-pointer select-none">
                Đăng nhập
              </p>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer theme="light" autoClose={3000} />
    </>
  );
};

export default Signup;
