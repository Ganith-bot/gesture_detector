Webcam.set({
    width:350,
    height:350,
    image_format:"png",
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function capture1(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="result123"src="'+data_uri+'" >';
    });

}

console.log("ml5 version = ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Ii5Ts1aOQ/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function speak(){
    var synth = window.speechSynthesis;
    speak1 = "The 1st prediction is " + prediction1;
    var UtterThis = new SpeechSynthesisUtterance (speak1);
    synth.speak(UtterThis);
}

function detect_img(){
    img = document.getElementById('result123');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
   if(error){
       console.error(error)
   }
   else{
       console.log(results);
       document.getElementById("result_emotion_name").innerHTML = results[0].label;
       prediction1 = results[0].label;
       speak();
       if(results[0].label == "victory"){
           document.getElementById("update_emoji").innerHTML = "&#9996;";
       }
       if(results[0].label == "amazing"){
        document.getElementById("update_emoji").innerHTML = "&#128076;";
    }
    if(results[0].label == "thumbs up"){
        document.getElementById("update_emoji").innerHTML = "&#128077;";
    }
   
   }
}