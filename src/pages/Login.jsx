import { useForm } from "react-hook-form";
import LoginForm from "../components/Authentication/LoginForm";
import useAuthContext from "../hooks/useAuthContext";
import { Xmark } from "iconoir-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@material-tailwind/react";
import FadeIn from "../components/Animation/FadeIn";
import bgImage from "../assets/images/heroHouse.jpeg";

const Login = () => {
  const { loginUser, errorMessage, setErrorMessage } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [showTestLoginModal, setShowTestLoginModal] = useState(true); // default to show

  const navigate = useNavigate();

  // Handle Open and Close Modal
  const handleToggleModal = () => {
    setOpen(!open);
    navigate("/");
  };

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await loginUser(data);
      if (res.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // reset error message
  if (errorMessage) {
    setTimeout(() => {
      setErrorMessage("");
    }, 8000);
  }

  // Quick Login Credentials
  const handleQuickLogin = (role) => {
    const testCredentials = {
      admin: { email: "admin@mahfuz.com", pass: "1234" },
      user: { email: "test@gmail.com", pass: "testUser12" },
    };

    const credential = testCredentials[role];
    setValue("email", credential.email);
    setValue("password", credential.pass);
  };

  return (
    <>
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt="background image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50 md:opacity-80"></div>
      </div>
      {/* Modal Overlay + Content */}
      {open && (
        <div
          className="fixed px-4 inset-0 z-50 flex items-center justify-center"
          onClick={handleToggleModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl relative"
          >
            <FadeIn y={-50} duration={0.3} delay={0.1}>
              <div className="bg-white rounded-lg shadow-lg p-3 md:p-6">
                {/* Close Button */}
                <Button
                  variant="ghost"
                  onClick={handleToggleModal}
                  className="absolute top-3 right-3 border-none hover:bg-none"
                >
                  <Xmark className="h-6 w-6" />
                </Button>

                {/* Modal Content */}
                <div className="relative">
                  {/* Admin and User Credentials modal */}
                  {showTestLoginModal && (
                    <div className="absolute -translate-y-[70%] lg:-translate-y-0 left-0 lg:-translate-x-[115%] z-40 bg-white/90 shadow-xl rounded-lg p-4 w-52">
                      {/* Close Button */}
                      <button
                        variant="ghost"
                        onClick={() => setShowTestLoginModal(false)}
                        className="absolute top-2 right-2 text-black hover:text-black"
                      >
                        <Xmark className="h-6 w-6" />
                      </button>

                      {/* Content */}
                      <h4 className="text-sm font-bold mb-3 text-black">
                        Quick Test Login:
                      </h4>
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => handleQuickLogin("admin")}
                          variant="outline"
                          size="sm"
                          color="primary"
                        >
                          Login as Admin
                        </Button>
                        <Button
                          onClick={() => handleQuickLogin("user")}
                          size="sm"
                          color="info"
                        >
                          Login as User
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Login Form  */}
                  <LoginForm
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    register={register}
                    errors={errors}
                    errorMessage={errorMessage}
                    loading={loading}
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
