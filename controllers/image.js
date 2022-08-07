
exports.getImage = async (req, res) => {
    try {
        gfs.find({ filename: req.params.id }).toArray((err, files) => {
            if (!files[0] || files.length == 0)
                return res.status(400).json({ Error: "No files found" })

            gfs.openDownloadStreamByName(req.params.id).pipe(res)
        })
    } catch (e) {
        // console.log(e);
        return res.status(404).json(e)
    }
};

// const fid = req.params.id
//         const data = await ImageFile.findOne({ filename: fid })
//         // console.log(data)
//         const chunks = await ChunkFile.find({ files_id: data._id }).sort({ n: 1 })
//         // console.log(chunks[0].data)

//         // console.log(typeof chunks);
//         var fileData = [];
//         chunks.forEach((chunk) => {
//             var base64EncodedStr = btoa(unescape(encodeURIComponent(chunk.data)));
//             console.log(base64EncodedStr)
//             // fileData.push(chunk.data.toString('base64'))
//         })

//         console.log(fileData)

//         // let finalFile = 'data:' + data.contentType + ';base64,'
//         //     + fileData.join('');
//         // console.log(finalFile)
//         res.status(200).json(chunks);
