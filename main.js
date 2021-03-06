status = "";
object = [];

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(480, 380);
}

function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
    object_name=document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status !="")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i< objects.length; i++ ){
            document.getElementById("status").innerHTML = "Status : Objects Detectd";
            fill("#FF0000");
            percent = floor(objects[i].confidence* 100);
            text(objects[i].label+""+percent+"%",objects[i].x+ 15,objects[i].y+15);
            nofill();
            stroke("#FF0000");
            rect(objects[i].x, object[i].y,object[i].width,objects[i].height);

             if(objects[i].label == object_name)
              {
                video.stop(); 
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = object_name + " Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "Found"); 
                synth.speak(utterThis);
                } else 
                { 
                 document.getElementById("object_status").innerHTML = object_name + " Not Found"; 
                } 
        }
    }
}


function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    vedio.speed(1);
    video.volume(0);
}

function gotResult(error, results){
    if (error){
      console.log(error);
    }
    console.log(results);
    objects = results;
}
