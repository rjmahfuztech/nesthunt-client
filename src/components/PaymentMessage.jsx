import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

const PaymentMessage = () => {
  const { status } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard/orders");
    }, [4000]);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="px-2 my-8 max-w-xl mx-auto">
      <div
        className={`shadow ${
          status == "success"
            ? "bg-success"
            : `${status == "fail" ? "bg-error" : "bg-warning"}`
        } text-white p-6 rounded-lg`}
      >
        <h1 className="text-xl text-center md:text-2xl font-semibold">
          {status == "success"
            ? "Your payment successfully paid."
            : status == "fail"
            ? "Opps!! Your payment Fail. Try again!"
            : "Your payment has been canceled."}
        </h1>
        <div className="flex items-end justify-center">
          <span className="text-lg md:text-xl">
            You are redirecting to order page{" "}
          </span>
          <span className="">...</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMessage;
