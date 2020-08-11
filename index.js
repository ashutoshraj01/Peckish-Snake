
        window.onload = function() {
         if(window.screen.width < 800){
           alert("This Game is not supported on Mobile device!");
         }
         else{
        var ctx = document.getElementById('ctx').getContext('2d');
        var WIDTH = 500;
        var HEIGHT = 500;
        var snakeList, foodList, direction, eaten, intervalVar, score=0,
         info='',
         isGameRunning=false;
        ctx.font = "30px Calibri";
        ctx.fillStyle = "#ff0000"; 
        ctx.fillText('🐍',230,150);
        ctx.fillText('Click here to start the game',90,250);
        ctx.save();
        ctx.font = "13px monospace";
        ctx.fillStyle = '#00ff00'; 
        ctx.fillText('Developed with 💖 By Ashutosh Raj',230,480);
        ctx.restore();  
        var snakeBody ={
           width:20,
           height:20,
           color:'green'
        }

        var food ={
            width:20,
           height:20,
           color:'red'
        }   
       
        var showInfo = function(){
            info = 'Click inside the game box to restart!';
            var infoBlock = document.querySelector('.extraInfo');
            infoBlock.innerHTML = info;
          }
          
          var hideInfo = function(){
              info = '';
              var infoBlock = document.querySelector('.extraInfo');
              infoBlock.innerHTML = info;
            }

            hideInfo();

      document.getElementById('ctx').onmousedown = function () {
          if(isGameRunning){
              clearInterval(intervalVar);
              isGameRunning = false;
            }
            startGame();
        }

       
        
      document.onkeydown = function(event){
          if(event.keyCode == 37 && direction !=2){
              direction = 0;
          }
         else if(event.keyCode == 38 && direction !=3){
              direction = 1;
          }
         else if(event.keyCode == 39 && direction !=0){
              direction = 2;
          }
         else if(event.keyCode == 40 && direction !=1){
              direction = 3;
          } 
      }
       
       testCollision = function(rect1, rect2){
           return(
               (rect1.x <= rect2.x + food.width) &&
               (rect2.x <= rect1.x + snakeBody.width) &&
               (rect1.y <= rect2.y + food.width) &&
               (rect2.y <= rect1.y + snakeBody.width)
           )
       }
   
      drawSnake = function(sb,i){
      ctx.save();
      if(i==0)
      ctx.fillStyle = 'red';
      else
      ctx.fillStyle = snakeBody.color;
      ctx.fillRect(sb.x,sb.y,snakeBody.width,snakeBody.height);
      ctx.restore();
      }

      drawFood = function(f,i){
          ctx.save();
          ctx.fillStyle = food.color;
          ctx.fillRect(f.x,f.y,food.width,food.height); 
          ctx.restore();
      }

      updateSnakeList = function(){
          for(var i=snakeList.length-1;i>=0;i--){
              if(direction == 0){
                 if(i==0){
                     snakeList[i].x = snakeList[i].x - 5;
                 }else{
                     snakeList[i].x = snakeList[i-1].x;
                     snakeList[i].y = snakeList[i-1].y;
                 }
              }
              else if(direction == 1){
                if(i==0){
                     snakeList[i].y = snakeList[i].y - 5;
                 }else{
                     snakeList[i].x = snakeList[i-1].x;
                     snakeList[i].y = snakeList[i-1].y;
                 }
              }
              else if(direction == 2){
                if(i==0){
                     snakeList[i].x = snakeList[i].x + 5;
                 }else{
                     snakeList[i].x = snakeList[i-1].x;
                     snakeList[i].y = snakeList[i-1].y;
                 }
                }
                else if(direction == 3){
                    if(i==0){
                     snakeList[i].y = snakeList[i].y + 5;
                 }else{
                     snakeList[i].x = snakeList[i-1].x;
                     snakeList[i].y = snakeList[i-1].y;
                 }
                }
          }
      }
        checkSnakePosition = function(){
            if(snakeList[0].x > 500){
                snakeList[0].x = 0;
            }
            if(snakeList[0].x < 0){
                snakeList[0].x = 500;
            }
            if(snakeList[0].y > 500){
                snakeList[0].y = 0;
            }
            if(snakeList[0].y < 0){
                snakeList[0].y = 500;
            }              
        }

        testCollisionSnake = function(snake1,snake2){
            return((Math.abs(snake1.x-snake2.x)<5)
                    &&
                    (Math.abs(snake1.y-snake2.y)<5)
                    );
        }

        isGameOver = function(){
            for(i in snakeList){
                if(i == 0)
                  continue;
                if(testCollisionSnake(snakeList[0],snakeList[i])){
                    clearInterval(intervalVar);
                    score=0;
                    hideInfo();
                    ctx.fillText('Game Over! Click to restart',90,250);
                    return;
                } 
                
            }
        }

        updateSnakePosition = function(){
            showInfo();
            ctx.clearRect(0,0,WIDTH,HEIGHT);
            while(eaten){
                var pos_x = Math.random()*430+10;
                var pos_y = Math.random()*430+10;
                foodList[0]={x:pos_x,y:pos_y};
                eaten = false;
            }
            foodList.forEach(drawFood);
            snakeList.forEach(drawSnake);
             
            if(testCollision(snakeList[0], foodList[0])){
              foodList = [];
              eaten = true;
              score++;
              var new_X,new_Y;
              if(direction == 0){
                  new_X = snakeList[0].x - 10;
                  new_Y = snakeList[0].y;
              }else if(direction == 1){
                  new_X = snakeList[0].x;
                  new_Y = snakeList[0].y - 10;
              }else if(direction == 2){
                  new_X = snakeList[0].x + 10;
                  new_Y = snakeList[0].y;
              }else if(direction == 3){
                  new_X = snakeList[0].x;
                  new_Y = snakeList[0].y + 10;
              }
              snakeList.unshift({x:new_X,y:new_Y});
            }
            ctx.fillText('score: '+score,380,30);
             isGameOver();
            checkSnakePosition();
            updateSnakeList();
        }

        startGame = function(){
            snakeList = [
                {x:230,y:200},
                {x:220,y:200},
                {x:210,y:200},
                {x:200,y:200}
            ];

            foodList =[];
            direction = 99;
            eaten = true;
            isGameRunning=true;
            selectMode();
          //  intervalVar = setInterval(updateSnakePosition,20); // this 20 here, sets the fps as canvas get called 50 times for each seconds
        }

       var selectMode = function(){
        ctx.clearRect(0,0,WIDTH,HEIGHT);
        ctx.fillText('Select the Mode for playing',90,150);
        ctx.fillText('1. Noob',90,190);
        ctx.fillText('2. Intermediate',90,220);
        ctx.fillText('3. Pro',90,250);   
        ctx.save();
        ctx.font = "16px monospace";
        ctx.fillText('select option 3 carefully ! 😀 ',200,470);
        ctx.restore(); 
        var selectedMode;
        setTimeout(()=>{
          selectedMode = prompt("Enter Your Selected Mode","Enter the Number here");
          if(isNaN(selectedMode)){
            alert('Select your input wisely and try again !!');
            selectMode();
        }else if(selectedMode == null){
            location.reload();
        }else{
            if(selectedMode == 1){
                intervalVar = setInterval(updateSnakePosition,20);
            }else if(selectedMode == 2){
                intervalVar = setInterval(updateSnakePosition,10);
            }else if(selectedMode == 3){
                intervalVar = setInterval(updateSnakePosition,05);
            }else{
                alert('Select your input wisely and try again !!');
                selectMode();
            }
        }
        },1000);
         
       }


var factAboutGame = [
    "It was programmed by Taneli Armanto, a design engineer in Nokia.",
    "The concept originated from the 1976 arcade game 'Blockade', developed and published by Gremlin.",
    "In 2005, Taneli Armanto, received a special award from the Mobile Entertainment Forum (MEF) for his contribution to the growth of the mobile entertainment industry."
];

//
var i=0;
var facts = document.querySelector('.factsPoint');
facts.innerHTML = factAboutGame[0];

factss = function(){
if(i<factAboutGame.length) {
facts.innerHTML = factAboutGame[i];
i++;
}else
   i=0;  
      
  setTimeout(factss,5000);
}
factss();
        }
};
