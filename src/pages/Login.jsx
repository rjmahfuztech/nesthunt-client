import { useForm } from "react-hook-form";
import LoginForm from "../components/Authentication/LoginForm";
import useAuthContext from "../hooks/useAuthContext";
import { Xmark } from "iconoir-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Dialog, IconButton } from "@material-tailwind/react";

const Login = () => {
  const { loginUser, errorMessage, setErrorMessage } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  // Handle Close Modal
  const handleClose = () => {
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
    <Dialog open={open} handler={handleClose} size="sm">
      <Dialog.Overlay className="bg-neutral-400">
        <Dialog.Content className="p-0">
          <Dialog.DismissTrigger
            as={IconButton}
            onClick={handleClose}
            size="sm"
            variant="ghost"
            color="secondary"
            className="absolute right-1 top-1"
            isCircular
          >
            <Xmark className="h-6 w-6" />
          </Dialog.DismissTrigger>
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
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
};

export default Login;
