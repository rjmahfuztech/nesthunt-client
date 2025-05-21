import { useForm } from "react-hook-form";
import LoginForm from "../components/Authentication/LoginForm";
import useAuthContext from "../hooks/useAuthContext";
import { Xmark } from "iconoir-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@material-tailwind/react";
import FadeIn from "../components/Animation/FadeIn";

const Login = () => {
  const { loginUser, errorMessage, setErrorMessage } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  // Handle Open and Close Modal
  const handleToggleModal = () => {
    setOpen(!open);
    navigate("/");
  };

  const {
    handleSubmit,
    register,
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

  return (
    <div>
      {/* Modal Overlay + Content */}
      {open && (
        <div
          className="fixed px-4 inset-0 z-50 flex items-center justify-center bg-black/50"
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
                <div>
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
    </div>
  );
};

export default Login;
