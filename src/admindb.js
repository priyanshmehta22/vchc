import React from "react";
import appointmentData from "./database/appointment.json";
import "react-data-grid/lib/styles.css";
import { useState } from "react";
import DataGrid from "react-data-grid";
import { Form } from "react-bootstrap";

const AdminDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const { patients: patientsData } = appointmentData;

  const patientSchema = patientsData[0];

  const columns = Object.keys(patientSchema).map((key) => {
    return { key: key, name: key };
  });

  function rowKeyGetter(row) {
    return row.index;
  }

  const handleChange = (event) => {
    const query = event.target.value;

    const filteredPatients = patientsData
      .filter((patient) => {
        const patientName = patient.pname?.toLowerCase();
        console.log(patientName);
        if (patientName === query.toLowerCase()) {
          return true;
        }
        return false;
      })
      .map((patient, index) => {
        return { index: index, ...patient };
      });
    setPatients(filteredPatients);
  };
  return (
    <div>
      <Form onChange={handleChange}>
        <Form.Group size="lg" id="em" controlId="email">
          <Form.Label>
            <b>SEARCH </b>
          </Form.Label>

          <Form.Control
            autoFocus
            required
            className="inputsignup"
            type="text"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
          <DataGrid
            columns={columns}
            rows={patients}
            rowKeyGetter={rowKeyGetter}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default AdminDashboard;
