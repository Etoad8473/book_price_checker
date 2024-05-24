// window.addEventListener("load", async ()=>{
//     //get html elements
//     const image = document.getElementById("select");
//     const textArea = document.getElementById("result");

//     //create image to text processor
//     const scribe = await Tesseract.createWorker();
//     await scribe.loadLanguage("eng");
//     await scribe.initialize("eng");

//     //convert image to text
//     image.onchange = async () => {
//         const text = await scribe.recognize(image.files[0]);
//         textArea.value = text.data.text;
//     };

// });


let webcam = {
    
    scribe : null, //tesseract worker
    vidArea : null, captureBtn: null, textArea: null, snapshot: null, cleanText: null, //html elements

    init :  () => {
        //get html elements
        webcam.vidArea = document.getElementById("vidArea");
        webcam.captureBtn = document.getElementById("capture");
        webcam.textArea = document.getElementById("result");
        webcam.snapshot = document.getElementById("snapshot");
        webcam.cleanText = document.getElementById("cleanText");

        //get permission to access webcam
        navigator.mediaDevices.getUserMedia({video:true})
        .then(async (stream) =>{
            //create tesseract worker
            webcam.scribe = await Tesseract.createWorker('eng');

            //feed webcam into video area
            webcam.vidArea.srcObject = stream;
            webcam.captureBtn.onclick = webcam.snap;
            // console.log("clicked");
        })
        .catch(error => {
                console.log("couldn't access webcam", error);
            })
    },


    //send video frame to scribe
    snap : async()=>{
        console.log("capturing");

        //create canvas to get snapshot
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let vWidth = webcam.vidArea.videoWidth;
        let vHeight = webcam.vidArea.videoHeight;

        //capture current frame
        canvas.width = vWidth;
        canvas.height = vHeight;
        ctx.drawImage(webcam.vidArea,0,0,vWidth,vHeight);
        // const image = canvas.toDataURL("image/png");
        let snapCtx = snapshot.getContext("2d");
        snapshot.width = vWidth;
        snapshot.height = vHeight;
        let img = new Image();
        img.onload = () => {
            snapCtx.drawImage(img,0,0,vWidth,vHeight);
            // console.log(vWidth,vHeight);
        }
        img.src = canvas.toDataURL("image/png");
        

        //image to text
        const result = await webcam.scribe.recognize(canvas.toDataURL("image/png"));
        webcam.textArea.value = result.data.text;
        console.log(result.data.text);
        let cleanT = result.data.text.replace(/\W/g," ");
        console.log(cleanT);
        cleanT = cleanT.replace(/\s+/g," ");
        console.log(cleanT);
        webcam.cleanText.textContent = cleanT;
        getBookInfo(cleanT);
    }


};


async function getBookInfo(text){

    console.log(encodeURIComponent(text));
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(text)}`;

    try {
        
        const response = await fetch(url);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`An error has occurred: ${response.status}`);
        }

        const bookData = await response.json();

        console.log(bookData);

    } catch (error) {
        console.log(error);
    }

}


window.addEventListener("load", webcam.init);
