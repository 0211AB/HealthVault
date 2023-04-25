import React, { Component } from "react";

class CloudinaryUploadWidget extends Component {
    componentDidMount() {
        const cloudName = "dwngj1n6n"; // replace with your own cloud name
        const uploadPreset = "rstsm9cs"; // replace with your own upload preset

        // Remove the comments from the code below to add
        // additional functionality.
        // Note that these are only a few examples, to see
        // the full list of possible parameters that you
        // can add see:
        //   https://cloudinary.com/documentation/upload_widget_reference

        var myWidget = window.cloudinary.createUploadWidget(
            {
                cloudName: cloudName,
                uploadPreset: uploadPreset
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log("Done! Here is the image info: ", result.info);
                    document
                        .getElementById("uploadedimage")
                        .setAttribute("src", result.info.secure_url);

                    var imgW = document
                        .getElementById("img-wrapper")
                    imgW.style.display = "flex";
                }
            }
        );
        document.getElementById("upload_widget").addEventListener(
            "click",
            function () {
                myWidget.open();
            },
            false
        );
    }

    render() {
        return (
            <>
                <div className="input-wrap" id="img-wrapper">
                    <img id="uploadedimage" alt="Uploaded"></img>
                </div>
                <button id="upload_widget" className="cloudinary-button">
                    Upload Image
                </button>
            </>
        );
    }
}

export default CloudinaryUploadWidget;
