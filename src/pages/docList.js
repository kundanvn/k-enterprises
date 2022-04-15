import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { fireDb } from "../services/firebase";
import { downloadIcon, editIcon, deleteIcon } from "../assets";
import { Form } from "./form";
import { DeleteWarning, Header } from "../components";
import { PdfView } from "./pdf";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

export const DocList = () => {
  const [formState, setFormState] = useState({
    mode: "",
    show: false,
    idToEdit: "",
  });

  const [data, setData] = useState({});

  const [idToDelete, setIdToDelete] = useState("");
  const [showRecords, setShowRecords] = useState(false);

  const [pdfId, setPDFId] = useState("");
  const dataCollectionRef = collection(fireDb, "pdf-records");

  const onDelete = (id) => {
    setIdToDelete(id);
  };

  const deleteRecord = () => {
    const docRef = doc(fireDb, "pdf-records", idToDelete);
    deleteDoc(docRef)
      .then((res) => {
        setIdToDelete("");
        toast("Document deleted successfully!", { type: "success" });
        getData();
      })
      .catch((e) => {
        toast("Something went wrong!", { type: "error" });
      });
  };

  const getData = async () => {
    const res = await getDocs(
      query(dataCollectionRef, orderBy("emmll", "desc"))
    );
    setData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    if (showRecords) {
      getData();
    }
  }, [showRecords]);

  const Action = ({ data }) => {
    return (
      <>
        <div>
          <span
            onClick={
              pdfId
                ? () =>
                    toast(
                      "Download in progress. Please try after few seconds",
                      { type: "info" }
                    )
                : () => setPDFId(data.id)
            }
          >
            <img src={downloadIcon} height="30px" />
          </span>
          <span
            className="m-2"
            onClick={() =>
              setFormState({
                mode: "edit",
                idToEdit: data.id,
                show: "true",
              })
            }
          >
            <img src={editIcon} height="30px" />
          </span>
          <span className="m-2" onClick={() => onDelete(data.id)}>
            <img src={deleteIcon} height="30px" />
          </span>
        </div>
      </>
    );
  };

  const headers = [
    {
      label: "eM11",
      key: "emmll",
      className: "w-25",
    },
    {
      label: "Vehicle No.",
      key: "registartion_no",
      className: "w-10",
    },
    {
      label: "Lessee Name",
      key: "name_of_lessee",
      className: "w-10",
    },
    {
      label: "Expires on.",
      key: "emmll_valid_upto",
      className: "w-10",
    },
    {
      label: "Actions",
      type: "component",
      getComponent: (data) => <Action data={data} />,
    },
  ];

  return (
    <>
      <Header
        handleSetting={() =>
          setFormState({ mode: "defaults", show: true, idToEdit: "" })
        }
      />
      <div>
        <div className=" card  ">
          <div className="card-body d-flex justify-content-between p-2">
            <h3>Documents</h3>
            <button
              className="btn btn-success"
              onClick={() => {
                setFormState({ mode: "add", show: true, idToEdit: "" });
              }}
            >
              Create New +
            </button>
          </div>
          <div>
            <div className="alert alert-warning">
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowRecords((prevState) => !prevState)}
                >
                  {showRecords ? "Hide records" : "Show Records"}
                </button>
              </div>

              <small className="text text-danger">
                Only enable if you want to print/verify the records.
              </small>
            </div>

            {showRecords && (
              <table className="table table-striped table-hover table-bordered border-primary">
                <thead>
                  <tr className="table-dark">
                    <th>Sl. No.</th>
                    {headers.map((header, index) => (
                      <th scope="col" key={index} className={header.className}>
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(data).map((dataKey, index1) => (
                    <tr key={index1}>
                      <th>{index1 + 1}.</th>
                      {headers.map((header, index2) => (
                        <th key={index2} className={header.className}>
                          {header.type === "component"
                            ? header.getComponent({
                                id: dataKey,
                                ...data[dataKey],
                              })
                            : data[dataKey][header.key]}
                        </th>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <ToastContainer />
        {formState.show && (
          <Form
            type={formState.mode}
            show={formState.show}
            idToEdit={formState.idToEdit}
            onClose={() =>
              setFormState({ name: "", idToEdit: "", show: false })
            }
          />
        )}
        {idToDelete && (
          <DeleteWarning
            onCancel={() => setIdToDelete("")}
            onConfirm={deleteRecord}
          />
        )}
      </div>
      {pdfId && <PdfView id={pdfId} afterDownload={() => setPDFId("")} />}
    </>
  );
};
