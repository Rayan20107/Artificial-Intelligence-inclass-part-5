rightwristx=0;

rightwristy=0;

leftwristx=0;

leftwristy=0;

leftwristscore=0;

rightwristscore=0;

song="";

function preload()
{
    song=loadSound("music.mp3");
}

function setup()
{
    canvas=createCanvas(500, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    pose=ml5.poseNet(video, modelLoaded);
    pose.on('pose', gotResults);
}

function draw()
{
    image(video, 0, 0, 500, 500);
    fill("red");
    stroke("red");
    if (leftwristscore > 0.2) {
    circle(leftwristx, leftwristy, 20);
    numleftwristy=Number(leftwristy);
    removedec=floor(numleftwristy);
    volume=removedec/500;
    document.getElementById("div-volume").innerHTML=volume;
    song.setVolume(volume);
}
    
    if (rightwristscore>0.2) 
{
    circle(rightwristx, rightwristy, 20);
    if (rightwristy>0 && rightwristy<=100) 
    {
        song.rate(0.5);
        document.getElementById(speed).innerHTML="Speed: 0.5";
    }

    else if(rightwristy>100 && rightwristy<=200) 
    {
        song.rate(1.0);
        document.getElementById(speed).innerHTML="Speed: 1.0";
    }

    else if(rightwristy>200 && rightwristy<=300)
    {
        song.rate(1.5);
        document.getElementById(speed).innerHTML="Speed: 1.5";
    }

    else if(rightwristy>300 && rightwristy<=400)
    {
        song.rate(2.0);
        document.getElementById(speed).innerHTML="Speed: 2.0";
    }

    else if(rightwristy>400 && rightwristy<=500)
    {
        song.rate(2.5);
        document.getElementById(speed).innerHTML="Speed: 2.5";
    }
}

}

function play()
{
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function modelLoaded()
{
    console.log("Model has been initialized");
}

function gotResults(pose)
{
    console.log(pose);
    rightwristx=pose[0].pose.rightWrist.x;
    rightwristy=pose[0].pose.rightWrist.y;
    leftwristx=pose[0].pose.leftWrist.x;
    leftwristy=pose[0].pose.leftWrist.y;
    leftwristscore=pose[0].pose.keypoints[9].score;
    rightwristscore=pose[0].pose.keypoints[10].score;
    console.log(rightwristscore);
    console.log(leftwristscore);
    console.log(rightwristx);
    console.log(rightwristy);
    console.log(leftwristx);
    console.log(leftwristy);
}