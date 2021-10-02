img = "";
status = "";
output = [];

function preload()
{
    
}

function setup()
{
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500, 500);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status1").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, result)
{
    if (error) {
        console.log(error);
    }
        console.log(result);
        output = result;
}

function draw()
{
    image(video, 0, 0, 650, 420);
     if (status != ""){

        r = random(255);//ramdom number from 0 to 255
        g = random(100, 255);//ramdom number from 100  to 255
        b = random(255);

        objectDetector.detect(video, gotResult);

         for (i=0; i<output.length; i++){
             document.getElementById("status1").innerHTML = "Status: Objects Detected";
             document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected: " + output.length;
             fill(r, g, b);
             confidence = floor(output[i].confidence * 100);
             text(output[i].label+" "+confidence+"%", output[i].x + 20, output[i].y + 20);
             //noFill();
             //stroke(r, g, b);
             //rect(output[i].x, output[i].y, output[i].width, output[i].height);

           if(output[i].label == "person"){
               document.getElementById("number_of_objects").innerHTML = "Baby Found";
           }
               else{
                   document.getElementById("number_of_objects").innerHTML = "Baby Not Detected"
               
           }
         }
     }
}