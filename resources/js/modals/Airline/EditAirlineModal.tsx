import { FormEvent } from "react";

import { updateAirline } from "~/api/airlines";
import type { Airline } from "~/api/api.types";
import type { ModalProps } from "~/shared.types";
import { Button, Modal } from "~/ui";

interface AirlineModalProps extends ModalProps {
  airline: Airline;
}

export const EditAirlineModal = ({
  show,
  onClose,
  airline,
}: AirlineModalProps) => {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const newName = formData.get("name")?.toString();
      const newDescription = formData.get("description")?.toString();

      await updateAirline(airline.id, {
        name: newName,
        description: newDescription,
      });
      alert("airline updated successfully");
      onClose();
    } catch (error: any) {
      let errors = "";
      if (error.error && error.error.fields) {
        for (const field in error.error.fields) {
          if (error.error.fields.hasOwnProperty(field)) {
            errors += `\n${error.error.fields[field]}`;
          }
        }
        alert("error updating airline: " + errors);
      } else {
        alert("error updating airline");
      }
    }
  }
  return (
    <Modal
      show={show}
      title="Edit Airline"
      description="Please fill in the new details for the airline."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          name="name"
          defaultValue={airline?.name}
          className="text-black"
          required
        ></input>
        <input
          name="description"
          defaultValue={airline?.description}
          className="text-black"
        ></input>
        <Button type="submit">Save</Button>
      </form>
    </Modal>
  );
};
