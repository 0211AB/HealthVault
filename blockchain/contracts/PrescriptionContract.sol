// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

contract PrescriptionContract {
    struct Prescription {
        string patientName;
        string doctorName;
        string patientHealthID;
        string doctorID;
        string medicines;
        string tests;
        uint256 sugarLevel;
        string dietPlan;
        uint256 bloodPressure;
        string description;
    }

    Prescription[] public prescriptions;

    function createPrescription(
        string memory _patientName,
        string memory _doctorName,
        string memory _patientHealthID,
        string memory _doctorID,
        string memory _medicines,
        string memory _tests,
        uint256 _sugarLevel,
        string memory _dietPlan,
        uint256 _bloodPressure,
        string memory _description
    ) public {
        require(bytes(_description).length > 0, "Description is required");
        require(bytes(_patientName).length > 0, "Patient name is required");
        require(bytes(_doctorName).length > 0, "Doctor name is required");

        prescriptions.push(
            Prescription(
                _patientName,
                _doctorName,
                _patientHealthID,
                _doctorID,
                _medicines,
                _tests,
                _sugarLevel,
                _dietPlan,
                _bloodPressure,
                _description
            )
        );
    }

    function getPrescriptionsForPatient(
        string memory _patientHealthID
    ) public view returns (Prescription[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < prescriptions.length; i++) {
            if (
                keccak256(abi.encodePacked(prescriptions[i].patientHealthID)) ==
                keccak256(abi.encodePacked(_patientHealthID))
            ) {
                count++;
            }
        }
        Prescription[] memory result = new Prescription[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < prescriptions.length; i++) {
            if (
                keccak256(abi.encodePacked(prescriptions[i].patientHealthID)) ==
                keccak256(abi.encodePacked(_patientHealthID))
            ) {
                result[index] = prescriptions[i];
                index++;
            }
        }
        return result;
    }
}
