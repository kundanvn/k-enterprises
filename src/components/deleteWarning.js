import { Modal, ModalBody } from "./modal";
import { trashBinIcon } from "../assets";

export const DeleteWarning = ({
  onConfirm = () => {},
  onCancel = () => {},
}) => {
  return (
    <Modal size="md" centered show>
      <ModalBody>
        <div className="">
          <div className="d-flex justify-content-around align-items-center">
            <strong className="text-primary">
              Do you really want to delete the record ?
            </strong>

            <img src={trashBinIcon} height="100px" width="100px" />
          </div>

          <div className="d-flex w-100 align-items-center justify-content-center p-2">
            <button className="btn btn-secondary me-2 w-50" onClick={onCancel}>
              Cancel
            </button>
            <button
              className="btn btn-md btn-primary w-50 btn-danger"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
