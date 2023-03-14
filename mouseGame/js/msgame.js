/**
 * 打地鼠游戏
 */
let time = 59; //时间,默认为1分钟，即59秒
let timeBox = document.querySelector("#time"); //显示时间的盒子
let score = 0; //得分
let scoreBox = document.querySelector("#score"); //显示得分的盒子
let level = 1000; //难度，即生成地鼠的时间频率，默认为1秒，也就是1000毫秒
let laughBox = document.querySelector("#mshow"); //笑的音效盒子
let cryBox = document.querySelector("#mcry"); //哭的音效盒子
let controlBtn = document.querySelector("#begin"); //控制按钮
let maps = document.querySelectorAll(".table>div>div"); //地图，为生成地鼠的单元格(选择了16个格子)
let timerForT = null; //时间计时器
let timeForM = null; //地鼠生成计时器
/**
 * 时间显示函数
 */
function showTime() {
	//显示当前时间，时间减一，判断时间是否为0，为0则清楚两个计时器（地鼠生成计时器和时间计时器），游戏结束
    timeBox.innerHTML = time<10 ? "0"+time : time;
    time--;
    if(time<0){
        clearInterval(timerForT);
        clearInterval(timeForM);
    }
}
/**
 *随机生成地鼠
 */
function showMouse() {
    // let pos = Math.round(Math.random()*100)%maps.length;
	let pos = Math.floor(Math.random()*maps.length); //随机生成一个0-15的数字
    for (let i = 0; i < maps.length; i++) {
       if(i== pos){
           //利用随机数和地图数组下对应关系，设置地鼠出现
           maps[i].innerHTML = "<img src='images/init.png' />";
           //做地鼠出现的标记
           maps[i].setAttribute("v",1);
           laughBox.play();//播放笑的音效
       }
       else{
              //地鼠未出现的地方，清除地鼠出现的标记
              maps[i].innerHTML = "";
              maps[i].removeAttribute("v",0);//设置地鼠未出现的标记
       }
   }
}

/**
 * 打地鼠
 */
function breakMouse() {
    if(event.target.parentNode.getAttribute("v")==1){
        //判断点击的地方是否有地鼠，有则得分加一，播放哭的音效
        score++;
        event.target.src="images/break.png";
        cryBox.play();
        //刷新成绩
        scoreBox.innerHTML = score.toString();
        //立即修改该单元的v属性为0，防止连击，重复得分
        event.target.setAttribute("v",0);
    }
	
	
}

/**
 * 开始游戏
 */
function gameStart() {
    //初始化时间和得分，设置控制按钮的状态，开始计时，随机生成地鼠
    time=59;
    score=0;
    scoreBox.innerHTML = score.toString();
    controlBtn.innerHTML = "结束游戏";
    controlBtn.setAttribute("s",1);
    //随机生成地鼠
    timeForM = setInterval(showMouse,level);
    //开始计时
    timerForT = setInterval(showTime,1000);

	
}
/**
 * 结束游戏
 */
function gameFinish() {
    controlBtn.innerHTML = "开始游戏";
    controlBtn.setAttribute("s",0);
    clearInterval(timerForT);
    clearInterval(timeForM);
	
}

/**
 * 游戏初始化
 * 功能：关联按钮的事件
 */
function gameInit() {
    controlBtn.innerHTML = "开始游戏";
    controlBtn.setAttribute("s",0);
    //安装单元格的监听器
    for (let i = 0; i < maps.length; i++) {
        maps[i].addEventListener("click",breakMouse,false);
    }
    //安装控制按钮的监听器
    controlBtn.addEventListener("click",function () {
        if(event.target.getAttribute("s")==0){
            gameStart();
        }
        else{
            gameFinish();
        }
    });
}
