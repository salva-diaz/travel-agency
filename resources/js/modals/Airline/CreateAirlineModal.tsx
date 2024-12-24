import { FormEvent } from "react";

import { createAirline } from "~/api/airlines";
import type { ModalProps } from "~/shared.types";
import { Button, Modal } from "~/ui";

export const CreateAirlineModal = ({ show, onClose }: ModalProps) => {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name")?.toString();
      const description = formData.get("description")?.toString() ?? null;
      if (!name) throw new Error("airline name is required");

      await createAirline({ name: name, description: description });
      alert("airline created successfully");
      onClose();
    } catch (error: any) {
      let errors = "";
      if (error.error && error.error.fields) {
        for (const field in error.error.fields) {
          if (error.error.fields.hasOwnProperty(field)) {
            errors += `\n${error.error.fields[field]}`;
          }
        }
        alert("error creating airline: " + errors);
      } else {
        alert("error creating airline");
      }
    }
  }
  return (
    <Modal
      show={show}
      title="Create Airline"
      description="Please fill in the details for the new airline."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          name="name"
          placeholder="Airline Name"
          className="text-black"
          required
        ></input>
        <input
          name="description"
          placeholder="Airline Description"
          className="text-black"
        ></input>
        <Button type="submit">Create</Button>
      </form>
    </Modal>
  );
};
