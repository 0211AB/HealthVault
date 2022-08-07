import React from 'react'
import { useLocation } from 'react-router-dom';
import DoctorSideBar from './DoctorSideBar';
import DoctorInfo from './DoctorInfo'
import DoctorAppointment from './DoctorAppointment'
import DoctorUpdate from './DoctorUpdate'
import DoctorPatientHistory from './DoctorPatientHistory'
import DoctorCreatePrescription from './DoctorCreatePrescription';

const PatientMain = (props) => {
  const { state } = useLocation();
  return (
    <>
      <DoctorSideBar />
      {props.val == 0 ? <DoctorInfo /> : <></>}
      {props.val == 1 ? <DoctorUpdate /> : <></>}
      {props.val == 2 ? <DoctorPatientHistory /> : <></>}
      {props.val == 3 ? <DoctorAppointment /> : <></>}
      {props.val == 4 ? <DoctorCreatePrescription /> : <></>}
    </>
  )
}

export default PatientMain