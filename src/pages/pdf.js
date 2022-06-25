import { Fragment, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { PdfLogo } from "../components/pdfLogo";
import { fireDb } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import "./pdf.css";
import { toast } from "react-toastify";

export const PdfView = ({ id, afterDownload }) => {
  const group1Headers = [
    {
      label: "eMM11.",
      key: "emmll",
    },
    {
      label: "Name Of Lessee / Permit Holder:",
      key: "name_of_lessee",
    },
    {
      label: "Mobile Number Of Lessee:",
      key: "lessee_mob_no",
    },
    {
      label: "Tin Number:",
      key: "tin_no",
    },
    {
      label: "Lessee Id:",
      key: "lessee_id",
    },
    {
      label: "Lease Details [Address,Village,(Gata/Khand),Area]:",
      key: "lessee_details",
    },
    {
      label: "Tehsil Of Lease:",
      key: "tehsil_of_lease",
    },
    {
      label: "District Of Lease:",
      key: "district_of_lease",
    },
    {
      label: "QTY Transported in (Cubic Meter/Ton for Silica sand):",
      key: "qyt_transported",
    },
    {
      label: "Name Of Mineral:",
      key: "mineral_name",
    },
    {
      label: "Loading From:",
      key: "loading_from",
    },
    {
      label: "Destination (Delivery Address):",
      key: "destination",
    },
    {
      label: "Distance(Approx in K.M.):",
      key: "distance",
    },
    {
      label: "eMM11 Generated On:",
      key: "emmll_generation_date",
    },
    {
      label: "eMM11 Valid Upto:",
      key: "emmll_valid_upto",
    },
    {
      label: "Traveling Duration:",
      key: "travelling_duration",
    },
    {
      label: " Destination District:",
      key: "destination_district",
    },
    {
      label: "Pits Mouth Value(Rs/m3 &Rs/Ton for Silica sand)",
      key: "pit_mouth_value",
    },
  ];

  const group2Headers = [
    { label: "Registration Number:", key: "registartion_no" },
    { label: "Type Of Vehicle:", key: "vehicle_type" },
    { label: "Name Of Driver:", key: "driver_name" },
    { label: "Mobile Number Of Driver:", key: "driver_mobile_no" },
    { label: "DL Number Of Driver:", key: "dl_no_of_driver" },
  ];

  const [data, setData] = useState({});

  const getData = () => {
    const docRef = doc(fireDb, "pdf-records", id);
    getDoc(docRef)
      .then((res) => {
        if (res && res.data()) {
          setData(res.data());
          setTimeout(() => {
            const pdfContainer = document.getElementById("pdf-loader");

            html2canvas(pdfContainer).then((canvas) => {
              let imgData = canvas.toDataURL("image/jpeg");
              const pdf = new jsPDF("p", "pt", "a4");
              const imgProps = pdf.getImageProperties(imgData);
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
              pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
              pdf.save(`${res?.data()?.emmll || "UnknownEmll"}.pdf`);
              afterDownload();
            });
          }, 100);
        }
      })
      .catch((e) => {
        toast("Something went wrong can't download file", { type: "error" });
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      id="pdf-loader"
      style={{ width: "1000px", margin: "20px auto", paddingTop: "25px" }}
    >
      <div
        style={{
          border: "2px solid rgb(107, 0, 0)",
          borderRadiusTop: "4px",
          padding: "2px 10px",
          marginTop: "0px",
          marginBottom: "0",
        }}
      >
        <div
          id="main-section"
          className=""
          style={{ width: "960px", margin: "0 auto" }}
        >
          <PdfLogo />
          <div
            className="d-flex justify-content-between align-items-end"
            style={{ marginBottom: "20px" }}
          >
            <div>
              <div>
                <div style={{ marginLeft: "20px" }}>
                  <span className="generate-pdf-text">GENERATE</span>
                  <span> </span>
                  <span className="generate-pdf-text">PDF</span>
                </div>
                <a
                  href="#"
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    fontFamily: "Times New Roman, serif",
                    color: "rgb(0, 0, 183)",
                    marginLeft: "10px",
                  }}
                >
                  Back
                </a>
              </div>
              <div style={{ marginLeft: "20px" }}>
                <Barcode
                  width={2.3}
                  value={data.emmll}
                  textMargin={0}
                  height={90}
                  displayValue={false}
                />
                <div className="barcode-text">
                  <span style={{ marginTop: "3px" }}>*</span>
                  {`${data.emmll}`?.split("")?.map((key, index) => (
                    <span key={index}>{key}</span>
                  ))}
                  <span style={{ marginTop: "3px" }}>*</span>
                </div>
              </div>
            </div>

            <div id="qr-code-container" style={{ height: "150", width: "150" }}>
              <span id="qr-canvas">
                <QRCode
                  value={`http://upminesupsdcgov.co.in/#/print-registration-from-vehicle-checkvalid-or-not/${id}?eId=${data.emmll}`}
                  level="H"
                  size={150}
                />
              </span>
            </div>
          </div>

          <div
            className="horizontal-line"
            style={{ marginBottom: "20px" }}
          ></div>
          <h1
            style={{
              textAlign: "center",
              fontSize: "1.4rem",
              paddingBottom: "0px",
              marginBottom: "5px",
            }}
          >
            Directorate Of Geology &amp; Mining Uttar Pradesh
          </h1>
          <p
            style={{
              textIndent: "0pt",
              textAlign: "center",
              marginBottom: "10px",
              fontSize: "1.1rem",
            }}
          >
            Minor Mineral Concession Rules 1963 e-Transit Pass For
            Transportation &amp; Minor Mineral See Rule 70(1)
          </p>
          <h1
            style={{
              textIndent: "0pt",
              textAlign: "center",
              fontSize: "1.4rem",
            }}
          >
            Form MM11
          </h1>
          <p
            style={{ textIndent: "0pt", textAlign: "left", fontSize: "1.4rem" }}
          />
          <p
            className="s1 text-uppercase "
            style={{
              textIndent: "0pt",
              textAlign: "center",
              paddingLeft: "46pt",
              paddingTop: "6pt",
            }}
          >
            <span className="s1 first-letter">L</span>ease
            <span className="s1 first-letter">D</span>etails &amp;
            <span className="s1 ">M</span>
            ineral
            <span className="s1 first-letter"> QTY</span> to be
            <span className="s1 first-letter">T</span>
            ransported
          </p>
          <div className="d-flex flex-wrap mb-2">
            {group1Headers.map((header, index) => (
              <Fragment key={index}>
                <div
                  className=" ps-2  d-flex justify-content-start align-items-center"
                  style={{
                    fontSize: "0.9rem",
                    width: "235px",
                    border: "2px solid gray",
                    margin: "2px",
                  }}
                >
                  {index + 1}. {header.label}
                </div>
                <div
                  className="ps-2 d-flex justify-content-start align-items-center"
                  style={{
                    fontSize: "0.9rem",
                    width: "235px",
                    border: "2px solid gray",
                    margin: "2px",
                  }}
                >
                  {data[header.key]}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div
        id="vehicle-details"
        style={{
          width: "1000px",
          margin: "0 auto",
          border: "2px solid rgb(107, 0, 0)",
          borderTop: "none",
          borderRadiusTop: "4px",
          padding: "2px 10px",
        }}
      >
        <h2
          className="s1 text-uppercase"
          style={{
            textIndent: "0pt",
            textAlign: "center",
            paddingLeft: "46pt",
            paddingTop: "6pt",
          }}
        >
          <span className="s1 first-letter">D</span>etails
          <span className="s1 first-letter"> O</span>f
          <span className="s1 first-letter"> R</span>egistered
          <span className="s1 first-letter"> V</span>ehicle
        </h2>
        <div className="d-flex flex-wrap mb-2" style={{}}>
          {group2Headers.map((header, index) => (
            <Fragment key={index}>
              <div
                className=" ps-2  d-flex justify-content-start align-items-center"
                style={{
                  fontSize: "0.9rem",
                  width: "235px",
                  border: "2px solid gray",
                  margin: "2px",
                }}
              >
                {index + 1}. {header.label}
              </div>
              <div
                className="ps-2  d-flex justify-content-start align-items-center"
                style={{
                  fontSize: "0.9rem",
                  width: "235px",
                  border: "2px solid gray",
                  margin: "2px",
                }}
              >
                {data[header.key]}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <h1
        className="s4 text-center"
        style={{
          border: "2px solid rgb(107, 0, 0)",
          borderRadius: "4px",
          borderTop: "none",
          paddingTop: "20px",
        }}
      >
        This eMM11 is valid up to {data.emmll_valid_upto}
      </h1>
    </div>
  );
};
