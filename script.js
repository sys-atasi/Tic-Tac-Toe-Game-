let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset");
let newGameBtn=document.querySelector("#new-btn");
let msgwin=document.querySelector(".msg-winner");
let msg=document.querySelector("#msg");
let turn0=true;//player0 or playerX
let count=0;
const winpatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
const draw=()=>
{
    let count=0;
    for(let box of boxes)
    {
        if(box.innerText!=="")
        {
            count++;
        }
    }
    if(count===9)
    {
        msg.innerText="It's a draw ! Restart the Game!";
        msgwin.classList.remove("hide");
        disableBoxes();
    }
}
const resetGame=()=>
{
    turn0=true;
    enableBoxes();
    msgwin.classList.add("hide");
    click_count=0;
}
boxes.forEach((box)=>
{
    box.addEventListener("click",()=>{
        // console.log("box is clicked");
        if(turn0)
        {
            box.innerText="O";
            box.style.color="green";
            turn0=false;
        }
        else
        {
            box.innerText="X";
            box.style.color="red";
            turn0=true;
        }
        // box.disabled=true;
        draw();
        checkWinner();

    });
});
const disableBoxes=()=>
{
    for(let box of boxes)
    {
        box.disabled=true;
    }
}
const enableBoxes=()=>
{
    for(let box of boxes)
    {
        box.disabled=false;
        box.innerText="";
    }
}
const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgwin.classList.remove("hide");
    disableBoxes();
}
const checkWinner=()=>
{
    for(let pattern of winpatterns)
    {
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;

        if(pos1val!=""&&pos2val!=""&&pos3val!="")
        {
            if(pos1val===pos2val&&pos2val===pos3val)
            {
                // console.log("winner",pos1val);
                showWinner(pos1val);
                // disableBoxes();
            }
            // else if(click_count==9)
            // {
            //     msg.innerText="Match is Draw";
            //     msg.classList.remove("hide");
            // }
        }
    }
}

newGameBtn.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);