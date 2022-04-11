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

  const dataCollectionRef = collection(fireDb, "pdf-records");
  const defaultCollectionRef = collection(fireDb, "defaults");

  const handleFormChange = (field, value) => {
    setFromData((prevState) => ({ ...prevState, [field]: value }));
  };

  const getData = async () => {
    const docRef = doc(fireDb, "pdf-records", idToEdit);
    const res = await getDoc(docRef);
    setFromData(res.data());
  };

  const handleSubmit = () => {
    if (type === "add") {
      addDoc(dataCollectionRef, formData)
        .then((res) => {
          toast("Added document successfully!", { type: "success" });
          onClose();
        })
        .catch((e) => {
          toast("Something went wrong!", { type: "error" });
        });
    } else if (type === "edit") {
      const docRef = doc(fireDb, "pdf-records", idToEdit);
      updateDoc(docRef, formData)
        .then((res) => {
          toast("Document Updated successfully!", { type: "success" });
          onClose();
        })
        .catch((e) => {
          toast("Something went wrong!", { type: "error" });
        });
    } else if (type === "defaults") {
      if (defaultId) {
        const defaultDocRef = doc(fireDb, "defaults", defaultId);
        updateDoc(defaultDocRef, formData)
          .then((res) => {
            toast("Successfully updated default setting", { type: "success" });
            onClose();
          })
          .catch((e) => {
            toast("Something went wrong", { type: "warning" });
          });
      } else {
        addDoc(defaultCollectionRef, formData)
          .then((res) => {
            toast("Successfully updated default setting", { type: "success" });
            onClose();
          })
          .catch((e) => {
            toast("Something went wrong", { type: "warning" });
          });
      }
    }
  };

  const getDefaults = () => {
    getDocs(defaultCollectionRef)
      .then((res) => {
        const data = res.docs;
        if (data.length > 0) {
          setFromData(data[0].data());
          setDefaultId(data[0].id);
        }
      })
      .catch((e) => {
        console.log(e);
        toast("Unable to load defaults", { type: "error" });
      });
  };

  useState(() => {
    if (type === "edit") {
      getData();
    } else {
      getDefaults();
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
        <Input
          label="eMMll"
          value={formData.emmll}
          onChange={(e) => handleFormChange("emmll", e.target.value)}
        />
        <Input
          label="eMMll Generated On"
          value={formData.emmll_generation_date}
          onChange={(e) =>
            handleFormChange("emmll_generation_date", e.target.value)
          }
        />
        <Input
          label="eMMll Valid Upto"
          value={formData.emmll_valid_upto}
          onChange={(e) => handleFormChange("emmll_valid_upto", e.target.value)}
        />
        <hr />
        <Input
          label="Name of Lessee/ Permit Holder"
          value={formData.name_of_lessee}
          onChange={(e) => handleFormChange("name_of_lessee", e.target.value)}
        />
        <Input
          label="Mobile Number Of Lessee"
          value={formData.lessee_mob_no}
          onChange={(e) => handleFormChange("lessee_mob_no", e.target.value)}
        />
        <Input
          label="Lessee Id"
          value={formData.lessee_id}
          onChange={(e) => handleFormChange("lessee_id", e.target.value)}
        />

        <hr />
        <Input
          label="Tehsil Of Lease"
          value={formData.tehsil_of_lease}
          onChange={(e) => handleFormChange("tehsil_of_lease", e.target.value)}
        />
        <Input
          label="District Of Lease"
          value={formData.district_of_lease}
          onChange={(e) =>
            handleFormChange("district_of_lease", e.target.value)
          }
        />

        <Input
          label="Lease Details[Address,Village,(Gata/Khand),Area]"
          value={formData.lessee_details}
          onChange={(e) => handleFormChange("lessee_details", e.target.value)}
          textarea
        />
        <Input
          label="Tin Number"
          value={formData.tin_no}
          onChange={(e) => handleFormChange("tin_no", e.target.value)}
        />
        <hr />

        <Input
          label="Name Of Mineral"
          value={formData.mineral_name}
          onChange={(e) => handleFormChange("mineral_name", e.target.value)}
        />
        <Input
          label="Loading From"
          value={formData.loading_from}
          onChange={(e) => handleFormChange("loading_from", e.target.value)}
        />

        <Input
          label="Destination (Delivery Address)"
          value={formData.destination}
          onChange={(e) => handleFormChange("destination", e.target.value)}
        />
        <Input
          label="Destination District"
          value={formData.destination_district}
          onChange={(e) =>
            handleFormChange("destination_district", e.target.value)
          }
        />

        <Input
          label="Distance(Approx in K.M.)"
          value={formData.distance}
          onChange={(e) => handleFormChange("distance", e.target.value)}
        />
        <Input
          label="Traveling Duration"
          value={formData.travelling_duration}
          onChange={(e) =>
            handleFormChange("travelling_duration", e.target.value)
          }
        />

        <Input
          label="QTY Transported in (Cubic Meter/Ton for Silica sand)"
          value={formData.qyt_transported}
          onChange={(e) => handleFormChange("qyt_transported", e.target.value)}
        />

        <Input
          label="Pits Mouth Value(Rs/m3&Rs/Ton for Silica sand)"
          value={formData.pit_mouth_value}
          onChange={(e) => handleFormChange("pit_mouth_value", e.target.value)}
        />

        <hr />
        <Input
          label="Registration Number"
          value={formData.registartion_no}
          onChange={(e) => handleFormChange("registartion_no", e.target.value)}
        />
        <Input
          label="Type Of Vehicle"
          value={formData.vehicle_type}
          onChange={(e) => handleFormChange("vehicle_type", e.target.value)}
        />
        <Input
          label="Driver Name"
          value={formData.driver_name}
          onChange={(e) => handleFormChange("driver_name", e.target.value)}
        />
        <Input
          label="Driver Mob. No."
          value={formData.driver_mobile_no}
          onChange={(e) => handleFormChange("driver_mobile_no", e.target.value)}
        />
        <Input
          label="DL No."
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
