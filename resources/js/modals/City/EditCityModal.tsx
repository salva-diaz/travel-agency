import { updateCity } from "~/api/cities";
import type { ModalProps } from "~/shared.types";
import { Button, Modal } from "~/ui";

interface CityModalProps extends ModalProps {
  city: {
    id: number;
    name: string;
  };
}

export const EditCityModal = ({ show, onClose, city }: CityModalProps) => {
  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      let res = await updateCity(city.id, { name: e.target.name.value });
      console.log(res);
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
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
