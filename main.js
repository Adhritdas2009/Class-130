song='';
leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
score1=0;
score2=0;
function preload(){
   song= loadSound('music.mp3')
}

function setup(){
    canvas=createCanvas(500, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}

function draw(){
    image(video, 0, 0, 500, 500);
    if(score1>0.2){
    fill('red');
    stroke('red');
    circle(leftWristx, leftWristy, 20);
    inNumbery=Number(leftWristy);
    console.log(inNumbery)
    lxy=floor(inNumbery);
    console.log(lxy);
    vol=lxy/500;
    console.log(vol);
    document.getElementById('volume').innerHTML='Volume: ' + vol;
    song.setVolume(vol);
    }



    if(score2>0.2){
        fill('red');
        stroke('red');
        circle(rightWristx, rightWristy, 20);
    
        if(rightWristy>0 && rightWristy<=100){
            document.getElementById('speed').innerHTML='Speed: 0.5x';
            song.rate(0.5);
        }
    
        else if(rightWristy>100 && rightWristy<=200){
            document.getElementById('speed').innerHTML='Speed: 1x';
            song.rate(1);
        }
    
        else if(rightWristy>200 && rightWristy<=300){
            document.getElementById('speed').innerHTML='Speed: 1.5x';
            song.rate(1.5);
        }
    
        else if(rightWristy>300 && rightWristy<=400){
            document.getElementById('speed').innerHTML='Speed: 2x';
            song.rate(2);
        }
    
        else if(rightWristy>400 && rightWristy<=500){
            document.getElementById('speed').innerHTML='Speed: 2.5x';
            song.rate(2.5);
        }
    

    }
   
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log('The model has been loaded')
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log('The x position of the left wrist is ' + leftWristx + ' and the y position is ' + leftWristy + '.')
        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log('The x position of the right wrist is ' + rightWristx + ' and the y position is ' + rightWristy + '.')
        score1=results[0].pose.keypoints[9].score;
        console.log('The score is ' + score1);
        score2=results[0].pose.keypoints[10].score;
    }
}