import { createCity } from "~/api/cities";
import type { ModalProps } from "~/shared.types";
import { Button, Modal } from "~/ui";

export const CreateCityModal = ({ show, onClose }: ModalProps) => {
  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      let res = await createCity({ name: e.target.name.value });
      console.log(res);
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
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
