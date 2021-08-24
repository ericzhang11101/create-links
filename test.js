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
            let eee = true


            console.log(line)
            for (let j = 0; j < ignore.length; j++){
                console.log(line + " " + line.indexOf(ignore[j]))
                if (line.indexOf(ignore[j]) > 0){
                    eee = false;
                }
            }
            
            if (eee){
                let tempStr = line.substring(start)
                let end = tempStr.indexOf('<')
                let url
                if (end > 0 ) {
                    url = tempStr.substring(0, end)
                }
                else {
                    url = tempStr
                } 

                if (url.indexOf("&nbsp;") != -1){
                    url = url.substring(0, url.indexOf("&nbsp;"))
                }
                console.log(url)
                let aTag = `<a href="${url}">${url}</a>`
                let newLine = line.substring(0, start) + aTag + tempStr.substring(end)
                console.log('a: ' + aTag)
                console.log('line: ' + newLine)
                console.log(' ')
                console.log(' ')
                arr[i] = newLine
            }
        }
    }

    textInput.value = arr.join('\n')
    showCopied.style.display = 'block'
    textInput.focus()
    textInput.select()
    try {
        let success = document.execCommand('copy')
        console.log('copy ' +  success)
    } catch{
        console.error('copy failed')
    }
}