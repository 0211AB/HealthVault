import React, { useState, useContext, useEffect } from 'react'
import './Prescription.css'
import { useToast } from '@chakra-ui/react'
import { formToJSON } from 'axios'
import AuthContext from '../../../store/AuthContext'
//eslint-ignore-next-line
import Web3 from 'web3'


const Prescriptions = (props) => {
    const [data, setData] = useState(null)
    const [connection, setConnection] = useState(null)
    const [loading, setLoading] = useState(false)
    const authCtx = useContext(AuthContext)
    const toast = useToast()

    useEffect(() => {
        if (connection !== null) return;
        async function connectToMetaMask() {
            // First, check if MetaMask is installed
            const web3 = new Web3(new Web3.providers.HttpProvider(`${process.env.REACT_APP_WEB3_URL}`));
            const provider = web3.currentProvider;
            // Get the signer
            const signer = web3.eth.accounts.privateKeyToAccount(process.env.REACT_APP_WEB3_PRIVATE_KEY);
            web3.eth.accounts.wallet.add(signer);
            return { web3, provider, signer }
        }

        connectToMetaMask().then((obj) => {
            setConnection(obj)
        })

        //eslint-disable-next-line
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        setData({ ...formToJSON(new FormData(document.getElementById('prescription-doctor-form'))), DoctorID: authCtx.id, DoctorName: props.name })
        setLoading(true)
    }

    useEffect(() => {
        if (data === null) return;
        const updateData = async () => {
            const contract = new connection.web3.eth.Contract([
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_patientName",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_doctorName",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_patientHealthID",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_doctorID",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_medicines",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_tests",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_sugarLevel",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "_dietPlan",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_bloodPressure",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "_description",
                            "type": "string"
                        }
                    ],
                    "name": "createPrescription",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_patientHealthID",
                            "type": "string"
                        }
                    ],
                    "name": "getPrescriptionsForPatient",
                    "outputs": [
                        {
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "patientName",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "doctorName",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "patientHealthID",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "doctorID",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "medicines",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "tests",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "sugarLevel",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "dietPlan",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "bloodPressure",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "description",
                                    "type": "string"
                                }
                            ],
                            "internalType": "struct PrescriptionContract.Prescription[]",
                            "name": "",
                            "type": "tuple[]"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "prescriptions",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "patientName",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "doctorName",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "patientHealthID",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "doctorID",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "medicines",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "tests",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "sugarLevel",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "dietPlan",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "bloodPressure",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "description",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ], process.env.REACT_APP_WEB3_CONTRACT_ADDRESS);

                contract.methods.createPrescription(data.PatientName,
                    data.DoctorName,
                    data.PatientID,
                    data.DoctorID,
                    data.Medicines,
                    data.Tests,
                    data.SugarLevel === "" ? 0 : data.SugarLevel,
                    data.Diet,
                    data.BP === "" ? 0 : data.BP,
                    data.Description).send({
                        from: connection.signer.address,
                        gas: 500000
                    })
                    .on('transactionHash', (hash) => {
                        console.log(`Transaction hash: ${hash}`);
                        toast({
                            title: 'Transaction Hash Generated',
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                        })
                    })
                    .on('receipt', (receipt) => {
                        console.log(`Transaction receipt: ${receipt}`);
                        toast({
                            title: 'Transaction Receipt Generated',
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                        })
                    })
                    .on('error', (error) => {
                        toast({
                            title: 'Error Creating Prescription',
                            description: error,
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                        })
                    }).then(() => {
                        toast({
                            title: 'Prescription Generated Sucessfully',
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                        })
                        setData(null)
                        setLoading(false)
                    }).finally(() => {
                        setData(null)
                        setLoading(false)
                    });
        };

        updateData();
        // eslint-disable-next-line
    }, [data])


    return (
        <form id="prescription-doctor-form" onSubmit={submitHandler} autoComplete="off" className="sign-up-form update-form">

            <div className="heading">
                <h2>CREATE A PRESCRIPTION</h2>
            </div>
            <br></br>
            {loading === true ? <div className="loading-wrap input-wrap">
                <svg className="loader-svg" version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 59">
                    <path d="M55.42 25.14C55.64 26.48 55.75 27.85 55.75 29.25C55.75 43.27 44.46 54.61 30.5 54.61C16.54 54.61 5.25 43.27 5.25 29.25C5.25 15.23 16.54 3.89 30.5 3.89 C34.8 3.89 38.84 4.97 42.38 6.86" />
                    <path d="M44.28 33.78C44.04 32.45 43.9 31.08 43.88 29.68C43.64 15.66 54.73 4.13 68.69 3.9C82.65 3.66 94.13 14.8 94.37 28.82C94.61 42.84 83.52 54.36 69.56 54.6C65.26 54.68 61.19 53.67 57.62 51.84" />
                </svg>
                <h3>Storing Details Securely On BlockChain ... </h3>
            </div> : <div className="actual-form">
                <div className="input-wrap">
                    <input
                        type="text"
                        className="input-field"
                        autoComplete="off"
                        required
                        name="PatientID"
                    />
                    <label className='label'>Patient Unique Health ID</label>
                </div>

                <div className="input-wrap">
                    <input
                        type="text"
                        className="input-field"
                        autoComplete="off"
                        required
                        name="PatientName"
                    />
                    <label className='label'>Patient Name</label>
                </div>

                <div className="input-wrap">
                    <input
                        type="text"
                        className="input-field"
                        autoComplete="off"
                        name="Medicines"
                    />
                    <label className='label'>Medicines Prescribed</label>
                </div>

                <div className="input-wrap">
                    <input
                        type="text"
                        className="input-field"
                        autoComplete="off"
                        name="Tests"
                    />
                    <label className='label'>Test Prescribed</label>
                </div>

                <div className="input-wrap">
                    <input
                        type="number"
                        className="input-field"
                        autoComplete="off"
                        name="SugarLevel"
                    />
                    <label className='label'>Sugar Level</label>
                </div>

                <div className="input-wrap">
                    <input
                        type="text"
                        className="input-field"
                        autoComplete="off"
                        name="Diet"
                    />
                    <label className='label'>Diet Plan</label>
                </div>

                <div className="input-wrap">
                    <input
                        type="number"
                        className="input-field"
                        autoComplete="off"
                        name="BP"
                    />
                    <label className='label'>Blood Pressure</label>
                </div>

                <div className="input-wrap" id="desc-wrapper">
                    <textarea
                        name="Description"
                        placeholder="Description"
                        required
                    ></textarea>
                </div>

                <input type="submit" value="CREATE PRESCRIPTION" className="sign-btn" />
            </div>}
            <br></br>
        </form>
    )
}

export default Prescriptions