import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import WhiteButton from "../../components/Buttons/WhiteButton";
import AuthInput from "../../components/Inputs/AuthInput";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import BoxModel from "../../components/BoxModel";
import authAPI from "../../apis/authAPI";

const Login = () => {
  const [authParams] = useSearchParams();
  const navigate = useNavigate();
  const from = authParams.get("from");
  const message = authParams.get("message");
  const temp_password = authParams.get("temp_password");
  const errorMess = authParams.get("error");
  
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [forgetEmail, setForgetEmail] = useState("");
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<any>({
    email: "",
    password: "",
  });
  const onFormStateChange = (e: any) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value.trim(),
    });
    setErrors({})
  };

  const handleClickForget: any = (e: any) => {
    e.preventDefault();
    setIsOpenModel(true);
  };

  const handleForgetPassword = async (e: any) => {
    e.preventDefault();
    const response = await authAPI.forgotPassword({email: forgetEmail});
    if (response?.message === "Sent email successfully") {
      setIsOpenModel(false);
      navigate("/login?message=send_email_success");
    }
    else {
      toast.error("Email không tồn tại!");
    }
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const errEmail = RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$").test(formState.email.trim())
    const errPassword = RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*()_+])[A-Za-z\\d!@#$%^&*()_+]{8,}$").test(formState.password.trim())
    if(!errEmail){
			setErrors({
				...errors,
				email: "Email không đúng định dạng!",
			});
		}
    if(!errPassword){
			setErrors({
				...errors,
				password: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái, số và ký tự đặc biệt",
			});
		}
    if(!formState.email || !formState.password){
      setErrors({
        ...errors,
        email: formState.email ? "" : "Email không được để trống",
        password: formState.password ? "" : "Mật khẩu không được để trống",
      });
      return;
    }
    if (errEmail && errPassword && Object.keys(errors).length === 0) {
      const data = {
        email: formState.email.trim(),
        password: formState.password.trim(),
      }
      const response = await authAPI.login(data);
      if (response?.message === "Login successfully") window.location.href = "/";
      else {
        setIsOpenModel(false);
        const notify = () => toast.error(response.message);
        notify();
      }
    }
  };

  const handleLoginSocial = (social: string) => {
	window.open(`http://localhost:8080/api/v1/auth/${social}`, '_self')
	};
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        {/* log in section */}
        <div className="w-1/2 flex flex-col items-center mx-auto">
          {from === "signup" && (
            <div
              className="w-full text-center p-4 mb-4 text-base text-green-600 rounded-lg bg-green-50"
              role="alert"
            >
              <span className="font-medium">Đăng ký thành công!</span> Vui lòng
              kiểm tra email để kích hoạt tài khoản
            </div>
          )}
          {message === "active_success" && (
            <div
              className="w-full text-center p-4 mb-4 text-base text-green-600 rounded-lg bg-green-50"
              role="alert"
            >
              <span className="font-medium">
                Kích hoạt tài khoản thành công!
              </span>
            </div>
          )}
          {message === "send_email_success" && (
            <div
              className="w-full text-center p-4 mb-4 text-base text-green-600 rounded-lg bg-green-50"
              role="alert"
            >
              <span className="font-medium">
                Vui lòng kiểm tra email của bạn!
              </span>
            </div>
          )}
          {temp_password && (
            <div
              className="w-full text-center p-4 mb-4 text-base text-green-600 rounded-lg bg-green-50"
              role="alert"
            >
              <span className="font-medium">
                Mật khẩu tạm thời của bạn là: {temp_password}
              </span>
            </div>
          )}
          {errorMess && (<div
              className="w-full text-center p-4 mb-4 text-base text-red-600 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">
                Vui lòng kiểm tra lại thông tin đăng nhập!
              </span>
            </div>)}
          <h1 className="text-3xl font-bold">Đăng nhập</h1>
          {/* log in form */}
          <form className="w-full" action="" onSubmit={handleLogin}>
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
            <WhiteButton rounded="full" type="submit" text="Đăng nhập" />
          </form>
          {/* log in with socials */}
          <div className="border-t w-full my-6">
            <p className="text-gray-400 text-center">
              Đăng nhập với mạng xã hội
            </p>
            {/* log in with google */}
            <div
              onClick={() => handleLoginSocial("google")}
              className="flex items-center justify-between w-full "
            >
              <button
              
                type="button"
                className="flex justify-between items-center h-12 w-full mt-6 border border-solid border-gray-300 rounded-full 
								bg-blue-500 text-white hover:opacity-50  transition duration-300 ease-in-out shadow-lg"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png?20230822192911"
                  alt="google logo"
                  className="mr-4 -ml-2 w-[60px] h-[60px] bg-white  rounded-full  object-cover"
                />
                <p className="select-none font-semibold">
                  Đăng nhập với Google
                </p>
                <div className="w-6"></div>
              </button>
            </div>
            <div
              onClick={() => handleLoginSocial("facebook")}
              className="flex items-center justify-between w-full "
            >
              <button
                type="button"
                className="flex justify-between items-center h-12 w-full mt-6 border border-solid border-gray-300 rounded-full 
								bgwhite text-white hover:opacity-50  transition duration-300 ease-in-out shadow-lg"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/480px-Facebook_Logo_%282019%29.png"
                  alt="google logo"
                  className="-ml-2 mr-4 w-[60px] h-[60px] rounded-full object-cover"
                />
                <p className="select-none font-semibold text-black">
                  Đăng nhập với Facebook
                </p>
                <div className="w-6"></div>
              </button>
            </div>
          </div>
          <div className="flex justify-between items w-full">
            <Link to="/signup">
              <p className="text-blue-500 cursor-pointer select-none">
                Đăng ký tài khoản ..
              </p>
            </Link>
            <p
              onClick={handleClickForget}
              className="text-blue-500 cursor-pointer select-none"
            >
              Quên mật khẩu
            </p>
          </div>
        </div>
      </div>
      <BoxModel {...{ isOpenModel, setIsOpenModel }}>
        <div className="bg-white rounded-xl shadow-lg w-1/3 h-[200px] flex flex-col p-4">
          <h1 className="font-bold text-xl text-center mb-4">
            Nhập email bạn đã đăng ký tài khoản
          </h1>
          <AuthInput
            type="email"
            onChange={(e)=>setForgetEmail(e.target.value)}
            name="email"
            placeholder="Email..."
            // required
          />
          <button onClick={handleForgetPassword} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Xác nhận
          </button>
        </div>
      </BoxModel>
      <ToastContainer theme="light" autoClose={3000} />
    </>
  );
};

export default Login;