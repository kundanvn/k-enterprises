import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fireDb } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import "./viewPage.css";

export const ViewPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const getData = () => {
    const docRef = doc(fireDb, "pdf-records", id);
    getDoc(docRef)
      .then((res) => {
        if (res && res.data()) {
          setData(res.data());
        }
      })
      .catch((e) => {});
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {data && (
        <div className="">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="">
                <strong>Geology & Mining Department </strong>
              </h3>
              <h3 className="">
                <strong> Directorate Of Geology & Mining Uttar Pradesh </strong>
              </h3>
              <h3 className="">
                <strong>
                  Minor Mineral Concession Rules 2021 e-Transit Pass For
                  Transportation of Minor Mineral See Rule 72(1)
                </strong>
              </h3>

              <h4 className=""> Form MM11 </h4>
            </div>
            <div className="panel-body">
              <div className="">
                <div className="">
                  This eMM11 is valid up to :
                  <span id="lbl_formValidUpTo">{data.emmll_valid_upto}</span>
                </div>

                <div className="">
                  Current Date&Time<span id="lbl_CurrentDateTime"></span>
                </div>

                <div className=""></div>
                <div className="col-md-12  text-left">
                  <h3> Lease Details & Mineral QTY to be Transported:-</h3>
                </div>
                <div className=""></div>
                <div className="">
                  <label>1.eMM11:-:</label>
                </div>
                <div className="">
                  <span id="lbl_etpNo">{data.emmll}</span>
                </div>

                <div className="">
                  <label>2.NAME OF LESSEE / PERMIT HOLDER </label>
                </div>

                <div className="">
                  <span id="lbl_name_of_lease">{data.name_of_lessee}</span>
                </div>
              </div>

              <div className="">
                <div className="">
                  <label>3. Mobile Number: </label>
                </div>

                <div className="">
                  <span id="lbl_mobile_no">{data.lessee_mob_no}</span>
                </div>

                <div className="">
                  <label>4. Tin Number:-</label>
                </div>
                <div className="">
                  <span id="lbl_tin_number">{data.tin_no}</span>
                </div>
              </div>

              <div className="">
                <div className="">
                  <label>5. Lessee Id: </label>
                </div>
                <div className="">
                  <span id="lbl_LeaseId">{data.lessee_id}</span>
                </div>

                <div className="">
                  <label>
                    6.LEASE DETAILS [ADDRESS,VILLAGE,(GATA/KHAND),AREA]:
                  </label>
                </div>
                <div className="">
                  <span id="lbl_leaseDetails">
                    {data.lessee_details}
                    DHURIYA CHUNAR MIRZAPUR , DHURIYAN , (428 B DU) , 5 acre
                  </span>
                </div>
              </div>

              <div className="">
                <div className="">
                  <label>7.Tehsil OF LEASE </label>
                </div>
                <div className="">
                  <span id="lbl_tehsil">{data.tehsil_of_lease}</span>
                </div>

                <div className="">
                  <label>8.DISTRICT OF LEASE</label>
                </div>
                <div className="">
                  <span id="lbl_district">{data.district_of_lease}</span>
                </div>
              </div>

              <div className="">
                <div className="">
                  <label>9.Lease Address: </label>
                </div>
                <div className="">
                  <span id="lbl_lease_address">{data.lessee_details}</span>
                </div>
                <div className="">
                  <label>
                    10.QTY Transported in (Cubic Meter/Ton for Silica sand) :
                  </label>
                </div>
                <div className="">
                  <span id="lbl_qty_to_Transport">{data.qyt_transported}</span>
                </div>
              </div>
              <div className="">
                <div className="">
                  <label>11.Name Of Mineral:</label>
                </div>
                <div className="">
                  <span id="lbl_type_of_mining_mineral">
                    {data.mineral_name}
                  </span>
                </div>
                <div className="">
                  <label>Destination District </label>
                </div>
                <div className="">
                  <span id="lbl_destination_district">
                    {data.destination_district}
                  </span>
                </div>
              </div>

              <div className="">
                <div className="">
                  <label>12.Loading From: </label>
                </div>
                <div className="">
                  <span id="lbl_loadingfrom">{data.loading_from}</span>
                </div>

                <div className="">
                  <label>13.Destination (Delivery Address): </label>
                </div>
                <div className="">
                  <span id="lbl_destination_address">{data.destination}</span>
                </div>
              </div>

              <div className="">
                <div className="">
                  <label>14.Distance(Approx): </label>
                </div>
                <div className="">
                  <span id="lbl_distrance">{data.distance}</span> K.M.
                </div>
                <div className="">
                  <label>15.eMM11 Generated On: </label>
                </div>
                <div className="">
                  <span id="txt_etp_generated_on">
                    {data.emmll_generation_date}
                  </span>
                </div>
              </div>

              <div className="">
                <div className="">
                  <label>16.eMM11 Valid Upto: </label>
                </div>
                <div className="">
                  <span id="txt_etp_valid_upto">{data.emmll_valid_upto}</span>
                </div>

                <div className="">
                  <label>17.Traveling Duration (Approx):</label>
                </div>
                <div className="">
                  <span id="lbl_travel_duration">
                    {data.travelling_duration}
                  </span>
                </div>
                <div className="">
                  <label>
                    18.18.Pits Mouth Value(Rs/m3 &amp;Rs/Ton for Silica sand):
                  </label>
                </div>
                <div className="">
                  <span id="pit">{data.pit_mouth_value}</span>
                </div>
              </div>

              <div className=""></div>
              <div className="col-md-12  text-left">
                <h3>Details Of Registered Vehicle:-</h3>
              </div>
              <div className=""></div>
              <div className="">
                <div className="">
                  <label>1. Registration Number Of Vehicle:</label>
                </div>
                <div className="">
                  <span id="lbl_registraton_number_of_vehicle">
                    {data.registartion_no}
                  </span>
                </div>
                <div className="">
                  <label>2. Name Of Driver : </label>
                </div>
                <div className="">
                  <span id="lbl_name_of_driver">{data.driver_name}</span>
                </div>
              </div>

              <div className="">
                <div className="">
                  <label>3. Mobile Number Of Driver:</label>{" "}
                </div>
                <div className="">
                  <span id="lbl_mobile_number_of_driver">
                    {data.driver_mobile_no}
                  </span>
                </div>
                <div className="">
                  <label>4. Type Of Vehicle: </label>
                </div>
                <div className="">
                  <span id="lbl_vehicleType">{data.vehicle_type}</span>
                </div>
              </div>

              <div className="">
                <div className="">
                  <label>5. DL Number: </label>
                </div>
                <div className="">
                  <span id="lbl_dl_number">{data.dl_no_of_driver}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
