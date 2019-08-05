
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data)=> {
//        console.log(data);
//     })
// })  


const formSelector = document.querySelector('form');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
formSelector.addEventListener('submit', (e)=> {
    e.preventDefault();
    const inputValue = e.currentTarget.children[0].value;
    const url = './weather?address=' + inputValue;

    messageOne.textContent = 'Loading....';
    messageTwo.textContent = '';

    fetch(url).then((response)=> {
        response.json().then((data)=>{
           if(data.error) {
            messageOne.textContent = data.error;
            messageTwo.textContent = '';
           } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.summary;
           }
        })
    })
})

