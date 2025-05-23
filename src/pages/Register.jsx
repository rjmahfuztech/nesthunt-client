import RegisterForm from "../components/Authentication/RegisterForm";
import { useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { Xmark } from "iconoir-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import FadeIn from "../components/Animation/FadeIn";
import bgImage from "../assets/images/heroHouse.jpeg";

const Register = () => {
  const [open, setOpen] = useState(true);
  const { registerUser, resendActivationEmail, errorMessage, setErrorMessage } =
    useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [resendEmail, setResendEmail] = useState("");
  const [sending, setSending] = useState(false);

  // Handle Open and Close Modal
  const handleToggleModal = () => {
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
                <div>
                  {/* Registration Form  */}
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
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
