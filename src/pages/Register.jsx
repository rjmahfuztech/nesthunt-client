import RegisterForm from "../components/Authentication/RegisterForm";
import { useForm } from "react-hook-form";
import { Dialog, IconButton } from "@material-tailwind/react";
import { Xmark } from "iconoir-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";

const Register = () => {
  const [open, setOpen] = useState(true);
  const { registerUser, resendActivationEmail, errorMessage, setErrorMessage } =
    useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [resendEmail, setResendEmail] = useState("");
  const [sending, setSending] = useState(false);

  // Handle close modal
  const handleClose = () => {
    setOpen(!open);
    navigate("/");
  };

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSuccessMsg("");
    setLoading(true);
    // delete confirm_password
    delete data.confirm_password;
    try {
      const res = await registerUser(data);
      if (res.success) {
        setSuccessMsg(res.message);
        // store email to resend mail
        if (data.email) setResendEmail(data.email);
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

  // Resend account activation email
  const handleResendEmail = async () => {
    setSuccessMsg("");
    setSending(true);
    try {
      const res = await resendActivationEmail(resendEmail);
      if (res.success) {
        setSuccessMsg(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSending(false);
    }
  };

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
          <RegisterForm
            handleSubmit={handleSubmit}
            register={register}
            watch={watch}
            errors={errors}
            onSubmit={onSubmit}
            errorMessage={errorMessage}
            successMsg={successMsg}
            loading={loading}
            resendEmail={resendEmail}
            handleResendEmail={handleResendEmail}
            sending={sending}
          />
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
};

export default Register;
