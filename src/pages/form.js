import { useState } from "react";
import { fireDb } from "../services/firebase";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
} from "../components/";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const Form = ({ type = "add", idToEdit, onClose = () => {} }) => {
  const [formData, setFromData] = useState({
    emmll: "",
    name_of_lessee: "",
    lessee_mob_no: "",
    tin_no: "",
    lessee_id: "",
    lessee_details: "",
    tehsil_of_lease: "",
    district_of_lease: "",
    qyt_transported: "",
    mineral_name: "",
    loading_from: "",
    destination: "",
    distance: "",
    emmll_generation_date: "",
    emmll_valid_upto: "",
    travelling_duration: "",
    destination_district: "",
    pit_mouth_value: "",
    registartion_no: "",
    driver_name: "",
    vehicle_type: "",
    driver_mobile_no: "",
    dl_no_of_driver: "",
  });

  const [defaultId, setDefaultId] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [serialNoRecordId, setSerialNoRecordId] = useState("");

  const dataCollectionRef = collection(fireDb, "pdf-records");
  const defaultCollectionRef = collection(fireDb, "defaults");
  const serialNoRef = collection(fireDb, "serial-no");

  const handleFormChange = (field, value) => {
    setFromData((prevState) => ({ ...prevState, [field]: value }));
  };

  const getData = async () => {
    const docRef = doc(fireDb, "pdf-records", idToEdit);
    const res = await getDoc(docRef);
    setFromData(res.data());
  };

  const updateSerialNo = async () => {
    const serialNoDoc = doc(fireDb, "serial-no", serialNoRecordId);

    try {
      const res = await updateDoc(serialNoDoc, { currentValue: serialNo });
      toast("Added document successfully!", { type: "success" });
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    if (type === "add") {
      try {
        const res = await addDoc(dataCollectionRef, {
          ...formData,
          emmll: serialNo,
        });
        updateSerialNo();
      } catch {
        toast("Something went wrong!", { type: "error" });
      }
    } else if (type === "edit") {
      const docRef = doc(fireDb, "pdf-records", idToEdit);
      try {
        const res = await updateDoc(docRef, formData);
        toast("Document Updated successfully!", { type: "success" });
        onClose();
      } catch {
        toast("Something went wrong!", { type: "error" });
      }
    } else if (type === "defaults") {
      if (defaultId) {
        const defaultDocRef = doc(fireDb, "defaults", defaultId);

        try {
          const res = await updateDoc(defaultDocRef, formData);
          toast("Successfully updated default setting", { type: "success" });
          onClose();
        } catch (e) {
          console.log({ e });
          toast("Something went wrong", { type: "warning" });
        }
      } else {
        const res = addDoc(defaultCollectionRef, formData);
        try {
          toast("Successfully updated default setting", { type: "success" });
          onClose();
        } catch {
          toast("Something went wrong", { type: "warning" });
        }
      }
    }
  };

  const getDefaults = async () => {
    try {
      const res = await getDocs(defaultCollectionRef);
      const data = res.docs;

      if (data.length > 0) {
        setFromData(data[0].data());
        setDefaultId(data[0].id);
      }
    } catch (e) {
      console.log(e);
      toast("Unable to load defaults", { type: "error" });
    }
  };

  const getSerialNo = async () => {
    try {
      const res = await getDocs(serialNoRef);
      const data = res.docs;

      if (data.length > 0) {
        const dataObj = data[0].data();
        const serialNo = dataObj.currentValue + randomIntFromInterval(7, 40);
        setSerialNoRecordId(data[0].id);
        setSerialNo(serialNo);
      }
    } catch {
      toast("Unable to load serial number");
    }
  };

  useState(() => {
    if (type === "edit") {
      getData();
    } else {
      getDefaults();
      getSerialNo();
    }
  }, []);

  return (
    <Modal show onHide={onClose}>
      <ModalHeader onHide={onClose}>
        <strong className="text-uppercase">
          {type === "add" && "Add New Document"}
          {type === "edit" && "Edit"}
          {type === "defaults" && "Set defaults"}
        </strong>
      </ModalHeader>
      <ModalBody>
        {type === "edit" && (
          <Input
            label="1. eMM11."
            value={formData.emmll}
            onChange={(e) => handleFormChange("emmll", e.target.value)}
            readOnly
          />
        )}
        <Input
          label="2. Name Of Lessee / Permit Holder:"
          value={formData.name_of_lessee}
          onChange={(e) => handleFormChange("name_of_lessee", e.target.value)}
        />
        <Input
          label="3. Mobile Number Of Lessee:s"
          value={formData.lessee_mob_no}
          onChange={(e) => handleFormChange("lessee_mob_no", e.target.value)}
        />
        <Input
          label="4. Tin Number:"
          value={formData.tin_no}
          onChange={(e) => handleFormChange("tin_no", e.target.value)}
        />

        <Input
          label="5. Lessee Id: "
          value={formData.lessee_id}
          onChange={(e) => handleFormChange("lessee_id", e.target.value)}
        />
        <Input
          label="6. Lease Details [Address,Village,(Gata/Khand),Area]:"
          value={formData.lessee_details}
          onChange={(e) => handleFormChange("lessee_details", e.target.value)}
          textarea
        />
        <Input
          label="7. Tehsil Of Lease: "
          value={formData.tehsil_of_lease}
          onChange={(e) => handleFormChange("tehsil_of_lease", e.target.value)}
        />

        <Input
          label="8. District Of Lease: "
          value={formData.district_of_lease}
          onChange={(e) =>
            handleFormChange("district_of_lease", e.target.value)
          }
        />
        <Input
          label="9. QTY Transported in (Cubic Meter/Ton for Silica sand):"
          value={formData.qyt_transported}
          onChange={(e) => handleFormChange("qyt_transported", e.target.value)}
        />

        <Input
          label="10. Name Of Mineral: "
          value={formData.mineral_name}
          onChange={(e) => handleFormChange("mineral_name", e.target.value)}
        />

        <Input
          label="11. Loading From:"
          value={formData.loading_from}
          onChange={(e) => handleFormChange("loading_from", e.target.value)}
        />

        <Input
          label="12. Destination (Delivery Address):"
          value={formData.destination}
          onChange={(e) => handleFormChange("destination", e.target.value)}
        />

        <Input
          label="13. Distance(Approx in K.M.): "
          value={formData.distance}
          onChange={(e) => handleFormChange("distance", e.target.value)}
        />
        <Input
          label="14. eMM11 Generated On:"
          value={formData.emmll_generation_date}
          onChange={(e) =>
            handleFormChange("emmll_generation_date", e.target.value)
          }
        />

        <Input
          label="15. eMM11 Valid Upto:"
          value={formData.emmll_valid_upto}
          onChange={(e) => handleFormChange("emmll_valid_upto", e.target.value)}
        />
        <Input
          label="16. Traveling Duration : "
          value={formData.travelling_duration}
          onChange={(e) =>
            handleFormChange("travelling_duration", e.target.value)
          }
        />
        <Input
          label="17. Destination District : "
          value={formData.destination_district}
          onChange={(e) =>
            handleFormChange("destination_district", e.target.value)
          }
        />

        <Input
          label="18.Pits Mouth Value(Rs/m3 & Rs/Ton for Silica sand)"
          value={formData.pit_mouth_value}
          onChange={(e) => handleFormChange("pit_mouth_value", e.target.value)}
        />

        <hr />
        <Input
          label="1. Registration Number : "
          value={formData.registartion_no}
          onChange={(e) => handleFormChange("registartion_no", e.target.value)}
        />
        <Input
          label="2. Type Of Vehicle: "
          value={formData.vehicle_type}
          onChange={(e) => handleFormChange("vehicle_type", e.target.value)}
        />
        <Input
          label="3. Name Of Driver :"
          value={formData.driver_name}
          onChange={(e) => handleFormChange("driver_name", e.target.value)}
        />
        <Input
          label="4. Mobile Number Of Driver: "
          value={formData.driver_mobile_no}
          onChange={(e) => handleFormChange("driver_mobile_no", e.target.value)}
        />
        <Input
          label="5. DL Number Of Driver: "
          value={formData.dl_no_of_driver}
          onChange={(e) => handleFormChange("dl_no_of_driver", e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <div className="d-flex w-100 justify-content-center">
          <button className="btn btn-secondary me-2" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-lg btn-primary" onClick={handleSubmit}>
            {idToEdit ? "Update" : "Save"}
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
