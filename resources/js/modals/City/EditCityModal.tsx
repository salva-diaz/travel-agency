import { FormEvent } from "react";

import type { City } from "~/api/api.types";
import { updateCity } from "~/api/cities";
import type { ModalProps } from "~/shared.types";
import { Button, Modal } from "~/ui";

interface CityModalProps extends ModalProps {
  city: City;
}

export const EditCityModal = ({ show, onClose, city }: CityModalProps) => {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);

      await updateCity(city.id, { name: formData.get("name") });
      alert("city updated successfully");
      onClose();
    } catch (error: any) {
      let errors = "";
      if (error.error && error.error.fields) {
        for (const field in error.error.fields) {
          if (error.error.fields.hasOwnProperty(field)) {
            errors += `\n${error.error.fields[field]}`;
          }
        }
        alert("error updating city: " + errors);
      } else {
        alert("error updating city");
      }
    }
  }
  return (
    <Modal
      show={show}
      title="Edit City"
      description="Please fill in the new details for the city."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          name="name"
          defaultValue={city?.name}
          className="text-black"
          required
        ></input>
        <Button type="submit">Save</Button>
      </form>
    </Modal>
  );
};
