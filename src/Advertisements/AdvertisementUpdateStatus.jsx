import { Select } from "@material-tailwind/react";
import React, { useState } from "react";
import authApiClient from "../services/authApiClient";
import { handleApiError, Toast } from "../components/Messages/Alert";

const AdvertisementUpdateStatus = ({ id, status, setAdvertisements }) => {
  const [value, setValue] = useState();

  // update status
  const updateStatus = async (id, stat) => {
    try {
      const res = await authApiClient.patch(`/advertisements/${id}/`, {
        status: stat,
      });
      if (res.status == 200) {
        setValue(stat);
        // success alert
        await Toast.fire({
          icon: "success",
          html: `status <span class="text-black font-bold">${stat}</span> successfully updated`,
        });
        // update local state status
        setAdvertisements((prevAdvertisements) =>
          prevAdvertisements.map((advertise) =>
            advertise.id === id ? { ...advertise, status: stat } : advertise
          )
        );
      }
    } catch (error) {
      handleApiError(error);
    }
  };
  return (
    <Select
      value={value}
      onValueChange={(val) => updateStatus(id, val)}
      size="sm"
    >
      <Select.Trigger
        placeholder={status}
        className={`${
          status == "Pending"
            ? "bg-warning hover:border-warning"
            : status == "Approved"
            ? "bg-success hover:border-success"
            : "bg-error hover:border-error"
        } w-28 text-white`}
      />
      <Select.List>
        <Select.Option value="Pending">Pending</Select.Option>
        <Select.Option value="Approved">Approved</Select.Option>
        <Select.Option value="Rejected">Rejected</Select.Option>
      </Select.List>
    </Select>
  );
};

export default AdvertisementUpdateStatus;
