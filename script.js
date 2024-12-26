let btn = document.querySelector("#btn")
let content = document.querySelector("#cont")
let voice = document.querySelector("#voice")

function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 1
    // text_speak.lang = "hi-GB"  // female voice
    window.speechSynthesis.speak(text_speak)
}

function greet(){
    let day = new Date()
    let hours = day.getHours()
    if(hours >= 0 && hours < 12){
        speak("Good Morning Ma'am")
    }else if(hours >= 12 && hours < 4){
        speak("Good Afternoon Ma'am")
    }else{
        speak("Good Evening Ma'am")
    }
}
window.addEventListener('load', ()=>{
    // greet()
})

let speech_Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speech_Recognition()
recognition.onresult=(event)=>{
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>{
    recognition.start()
    btn.style.display = "none"
    voice.style.display  = "inline"
})

function takeCommand(message){
    btn.style.display = "inline"
    voice.style.display  = "none"
    if(message.includes("hello") || message.includes("hey") || message.includes("hi")){
        speak("hello ma'am, what can i help you?")
        // speak("i am virtual assistant, created by beauty ma'am")
    }else if(message.includes("who are you")){
        speak("i am virtual assistant, created by beauty ma'am")
    }else if(message.includes("open youtube")){
        speak("opening youtube")
        window.open("https://www.youtube.com")
    }else if(message.includes("open google")){
        speak("opening google")
        window.open("https://www.google.co.in")
    }else if(message.includes("open whatsapp")){
        speak("opening whatsapp")
        window.open("whatsapp://")
    }else if(message.includes("time")){
        let time = new Date().toLocaleString(undefined,{hours:"numeric",minute:"numeric"})
        speak(time) 
    }else if(message.includes("date")){
        let date = new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
        speak(date)
    }else{
        let finalText = "this is what i found on internet regarding" + message.replace("nova", "")
        speak(finalText)
        window.open(`https://www.google.com/search?q= ${message.replace("nova", "")}`,"_blank")
    }
        
}