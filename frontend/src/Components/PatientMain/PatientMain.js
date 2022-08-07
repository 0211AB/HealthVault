import React from 'react'
import PatientSideBar from './PatientSideBar'
import { useLocation } from 'react-router-dom';
import PatientInfo from './PatientInfo';
import PatientUpdate from './PatientUpdate';
import PatientHistory from './PatientHistory';
import PatientAppointment from './PatientAppointment'

const PatientMain = (props) => {
  const { state } = useLocation();
  return (
    <>
      <PatientSideBar />
      {props.val == 0 ? <PatientInfo /> : <></>}
      {props.val == 1 ? <PatientUpdate /> : <></>}
      {props.val == 2 ? <PatientHistory /> : <></>}
      {props.val == 3 ? <PatientAppointment /> : <></>}
    </>
  )
}

export default PatientMain