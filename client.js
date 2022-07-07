const socket = io('http://localhost:8000',{ transports : ['websocket'] })

const form = document.getElementById('sendid')

const msgInput = document.getElementById('messageinp')

const messageContainer = document.querySelector('#containerid')
audio = new Audio('notification.mp3')
const append=(message,position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    if(position=='msgl'){
        audio.play()
    }
}



form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = msgInput.value
    append(`you: ${message}`,'msgr')
    socket.emit('send',message)
    msgInput.value=''
})

const name = prompt("enter your name")
socket.emit('new-user-joined',name) 

socket.on('user-joined',name=>{
    append(`${name} joined the chat`, 'msgr')
})

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'msgl')
})

socket.on('left',name=>{
    append(`${name} left the chat`,'msgl')
})