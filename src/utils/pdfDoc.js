function createDoc(data) {
    var dd = {
        content: [
            {
                alignment: 'justify',
                columns: [
                    {
                        image: 'rx',
                        width: 100,
                        height: 100
                    },
                    {
                        text: 'HEALTHVAULT \n Access health information and resources securely',
                        style: 'header',
                        alignment: 'right'
                    }
                ]
            },
            {
                text: '_______________________________________________________________________________________________',
            },
            {
                columns: [
                    {
                        width: '50%',
                        text: [
                            { text: 'Patient Name: ', bold: true },
                            { text: `${data.patientName}\n\n` },
                            { text: 'Patient ID: ', bold: true },
                            { text: `${data.patientHealthID}\n\n` },
                        ]
                    },
                    {
                        width: '50%',
                        text: [
                            { text: 'Doctor Name: ', bold: true },
                            { text: `${data.doctorName}\n\n` },
                            { text: 'Doctor ID: ', bold: true },
                            { text: `${data.doctorID}\n\n` },
                        ],
                        alignment: 'right'
                    }
                ],
                margin: [0, 0, 0, 20]
            },
            {
                table: {
                    headerRows: 1,
                    widths: ['auto', 'auto', '*'],
                    body: [
                        [
                            { text: 'No.', bold: true },
                            { text: 'Field', bold: true },
                            { text: 'Data', bold: true },
                        ],
                        [
                            '1',
                            'Blood Pressure',
                            `${data.bloodPressure === "" ? "---" : data.bloodPressure}`,
                        ],
                        [
                            '2',
                            'Sugar Level',
                            `${data.sugarLevel === "" ? "---" : data.sugarLevel}`,
                        ],
                        [
                            '3',
                            'Diet Plan',
                            `${data.dietPlan === "" ? "---" : data.dietPlan}`,
                        ],
                        [
                            '4',
                            'Medicines',
                            `${data.medicines=== "" ? "---" : data.medicines}`,
                        ],
                        [
                            '5',
                            'Tests',
                            `${data.tests === "" ? "---" : data.tests}`,
                        ]
                    ]
                }
            },
            {
                text: 'Additional Notes:',
                bold: true,
                margin: [0, 20, 0, 10]
            },
            {
                ul: data.description.split("\n")
            }
        ],
        footer: {
            text: `Created by Dr. ${data.doctorName} , Copyright : HealthVault `,
            alignment: 'right',
            margin: [0, 0, 50, 0]
        },
        images: {
            rx: 'https://res.cloudinary.com/dwngj1n6n/image/upload/v1682427484/download-removebg-preview_ikrnk4.png',
        },
        styles: {
            header: {
                fontSize: 25,
                bold: true
            },
        }

    }

    return dd;
}

export { createDoc }