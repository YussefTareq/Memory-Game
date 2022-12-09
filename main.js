let btn = document.querySelector(" .control-buttons span");
btn.onclick =function(){
    let yourName=prompt("Whats Your Name?")

    if (yourName == null || yourName ==""){
        document.querySelector(".name span").innerHTML = 'Unknown';
    }else{
        document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();
}

let duration = 1000;
let blocksContainer = document.querySelector(' .memory-game-blocks');
let blocks = Array.from(blocksContainer.children);
// let orderRange =[...Array(blocks.length).keys()];
let orderRange =Array.from(Array(blocks.length).keys());
shuffle(orderRange);
blocks.forEach((block,index)=>{

    block.style.order =orderRange[index];

    block.addEventListener("click",()=>{
        flipBlock(block);

        
    })
});

function flipBlock(selBlock){

    selBlock.classList.add('is-flipped');

    let allFlip = blocks.filter(flipBlock => flipBlock.classList.contains('is-flipped'));
    if(allFlip.length === 2){

        stopClicking();

        matchBlock(allFlip[0],allFlip[1]);
    }

}
function matchBlock(first,second){
    let tries= document.querySelector('.tries span');
    
    if(first.dataset.technology === second.dataset.technology){
        first.classList.remove('is-flipped');
        second.classList.remove('is-flipped');

        first.classList.add('has-matched');
        second.classList.add('has-matched');

        document.getElementById('win').play();
    }
    else{
        tries.innerHTML=parseInt(tries.innerHTML) +1;
        setTimeout(()=>{
        first.classList.remove('is-flipped');
        second.classList.remove('is-flipped');
        
        },duration)
    document.getElementById('lose').play();
    }
}
function stopClicking(){

    blocksContainer.classList.add('no-clicking');
    setTimeout(()=>{
        blocksContainer.classList.remove('no-clicking');
    },duration);
}

function shuffle(arr){

    let current =arr.length,
    temp,
    random;
    while (current>0) {
        random = Math.floor(Math.random()*current);
        current--;
        temp=arr[current];
        arr[current]=arr[random];
        arr[random]=temp;
    } 
    return arr;
}

console.log(shuffle(orderRange))