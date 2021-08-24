const textInput = document.getElementById('textInput')
const textOutput = document.getElementById('textOutput')
const showCopied = document.getElementById('showCopied')

const ignore = [
    'vimeo'
]

textInput.addEventListener('input', () =>{
    showCopied.style.display = 'none'
}) 

function convertText(){
    let str = textInput.value
    let arr = str.split('\n')

    for (let i = 0; i < arr.length; i++){
        let line = arr[i]

        let start = line.indexOf('http')
        if (start > 0){
            let cont = true
            // check if ignore 
            for (let j = 0; j < ignore.length; j++){
                console.log(line + " " + line.indexOf(ignore[j]))
                if (line.indexOf(ignore[j]) > 0){
                    cont = false;
                }
            }
            
            if (cont){
                let tempStr = line.substring(start)
                let end = tempStr.indexOf('<')
                let url
                if (end > 0 ) {
                    url = tempStr.substring(0, end)
                }
                else {
                    url = tempStr
                } 
                
                // checks location of spaces
                if (url.indexOf("&nbsp;") != -1){
                    url = url.substring(0, url.indexOf("&nbsp;"))
                }

                let aTag = `<a href="${url}">${url}</a>`
                let newLine = line.substring(0, start) + aTag + tempStr.substring(end)
                arr[i] = newLine
            }
        }
    }

    textInput.value = arr.join('\n')
    showCopied.style.display = 'block'

    // copies text to clipboard
    textInput.focus()
    textInput.select()
    try {
        let success = document.execCommand('copy')
        console.log('copy ' +  success)
    } catch{
        console.error('copy failed')
    }
}