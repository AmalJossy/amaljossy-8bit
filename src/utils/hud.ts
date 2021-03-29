const messageBox = document.getElementById("message-box");
const messageArea = document.getElementById("message-area");

export const writeMessage=(message:string)=>{
    if(messageArea.textContent!==message){
        console.log(message);
        messageArea.textContent=message;
        messageArea.classList.remove('typewriter');
        void messageArea.offsetWidth;
        messageArea.classList.add('typewriter');
        if(message===''){
            messageBox.style.visibility = 'hidden';
        }
        else {
            messageBox.style.visibility = 'visible';
        }
    }
}