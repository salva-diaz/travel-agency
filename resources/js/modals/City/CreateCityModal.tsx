import { FormEvent } from "react";

import { createCity } from "~/api/cities";
import type { ModalProps } from "~/shared.types";
import { Button, Modal } from "~/ui";

export const CreateCityModal = ({ show, onClose }: ModalProps) => {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      await createCity({ name: formData.get("name") });

      alert("city created successfully");
      onClose();
    } catch (error: any) {
      let errors = "";
      if (error.error && error.error.fields) {
        for (const field in error.error.fields) {
          if (error.error.fields.hasOwnProperty(field)) {
            errors += `\n${error.error.fields[field]}`;
          }
        }
        alert("error creating city: " + errors);
      } else {
        alert("error creating city");
      }
    }
  }
  return (
    <Modal
      show={show}
      title="Create City"
      description="Please fill in the details for the new city."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          name="name"
          placeholder="City Name"
          className="text-black"
          required
        ></input>
        <Button type="submit">Create</Button>
      </form>
    </Modal>
  );
};
