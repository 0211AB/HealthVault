import React, { useRef, useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Spinner
} from '@chakra-ui/react'

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { createDoc } from '../../../utils/pdfDoc'
//eslint-ignore-next-line
import Web3 from 'web3'

const Details = (props) => {
    const inputRef = useRef(null)
    const [data, setData] = useState(null)
    const [temp, setTemp] = useState(null)
    const [prescriptions, setPrescriptions] = useState(null)
    const [connection, setConnection] = useState(null)
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState(null)
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)
    const pwdRef = useRef(null)
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

    useEffect(() => {
        if (password === null) return;
        const verify = async () => {

            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}user/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Password: password,
                    Email: props.email
                })
            });

            const res_data = await res.json()

            if (res.status !== 200) {

                toast({
                    title: 'Error Verifying Doctor.',
                    description: res_data.Message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
                setLoading(false)
            }
            else {
                toast({
                    title: 'Verified Sucessfuly.',
                    description: `${res_data.Message}`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                setData(temp)
            }

            setPassword(null)
        };

        verify();
        // eslint-disable-next-line
    }, [password])

    const searchHandler = (e) => {
        e.preventDefault()
        setPrescriptions(null)
        if (inputRef.current.value.length !== 10) {
            toast({
                title: 'Enter Appropriate HealthID',
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
            return;
        }
        setTemp(inputRef.current.value)
        onOpen()
    }

    useEffect(() => {
        if (data === null) return;
        const getData = async () => {
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

            try {
                var res = await contract.methods.getPrescriptionsForPatient(data).call()
                setLoading(false)
                setTemp(null)
                setData(null)
                setPrescriptions(res)
            }
            catch (e) {
                toast({
                    title: 'Could Not Fetch Data From Blockchain',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
                setLoading(false)
            }
        };

        getData();
        // eslint-disable-next-line
    }, [data])

    return (
        <section id="subscribe">
            <h3>Patient Health Data</h3>
            {loading ? <div className="loading-wrap input-wrap">
                <Spinner
                    thickness='5px'
                    speed='1s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </div> : <form className='subscribe-box p-data-box'>
                <input
                    type="search"
                    placeholder="Enter Patient Unique Health ID"
                    id="search-box"
                    ref={inputRef}
                />
                <button onClick={searchHandler}>Search</button>
            </form>}
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Authenticate Yourself</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Please Enter Your Password To Get Patient Data
                    </ModalBody>

                    <form className='authenticate-form'>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            ref={pwdRef}
                        />
                    </form>

                    <ModalFooter>
                        <Button colorScheme='blackAlpha' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='blue'
                            onClick={(e) => { onClose(); setLoading(true); setPassword(pwdRef.current.value) }}>Authenticate</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {prescriptions !== null && prescriptions.length === 0 && <><h3>No Medical Data Found</h3></>}

            {prescriptions !== null && prescriptions.length !== 0 && <div className='pdf-box'>{prescriptions.map((data, idx) => {
                return <button key={idx} className='pdf-button' onClick={() => {
                    var doc = createDoc(data)
                    pdfMake.createPdf(doc).open();
                }}><ion-icon name="medkit" style={{display: "inline-block", verticalAlign: "middle"}}></ion-icon> Prescription #{idx+1}</button>
            })}
            </div>}

        </section>
    )
}

export default Details