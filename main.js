const table = document.querySelector('.interface');
const smile = document.querySelector('.button');


let game = [];
let mines = 40;
let mines_counter = 40;

for(let i=0; i<256; i++){
    let a = Math.random();
    if(a>0.8 && mines > 0){
        game[i] = 1;
        mines--;
    } else {
        game[i] = 0;
    }
}

let row = "<div class=\"row\">" + 
    "<div class=\"col\"></div>" +
    "<div class=\"col\"></div>" +
    "<div class=\"col\"></div>" +
    "<div class=\"col\"></div>" +
    "<div class=\"col\"></div>" +
    "<div class=\"col\"></div>" +
    "<div class=\"col\"></div>" +
    "<div class=\"col\"></div>" +
    "<div class=\"col\"></div>" +
    "<div class=\"col\"></div>" +
    "<div class=\"col\"></div>" +
    "<div class=\"col\"></div>" +
    "<div class=\"col\"></div>" +
    "<div class=\"col\"></div>" +
    "<div class=\"col\"></div>" +
    "<div class=\"col\"></div>" + 
    "</div>"

for(let i = 0; i<16; i++) table.innerHTML +=row;

const cells = document.querySelectorAll('.col');

for(let i=0; i<256; i++){
    if(game[i]) {
        cells[i].classList.add('bomb')
        cells[i].innerHTML = '<img src="./imgs/empty-bomb.png"></img>'
    } else{
        cells[i].innerHTML = '<img src="./imgs/standart.png"></img>'
    }
    cells[i].classList.add(`${i}`);
    
}

let isBomb = (item) => item.classList.contains('bomb')


let checkCoord = (item) => {
    for(let i=0; i<256; i++)
        if(item.classList.contains(`${i}`)) return i;
}

function checkItem (coord){
    for(let i =0; i<256; i++)
        if(cells[i].classList.contains(`${coord}`)) return cells[i];
}

let bombsNear = (coord) => {
    let c = [ coord - 17,
            coord - 16,
            coord - 15,
            coord + 1,
            coord + 17,
            coord + 16,
            coord + 15,
            coord - 1 
        ]
    
    //console.log(c);

    let minesNearCounter = 0;

        c.forEach(item => {
            if(item > 0){
                let cell = checkItem(item)
                if(cell.classList.contains('bomb')){
                    minesNearCounter++;
                }
            }
            
        })

    // if(minesNearCounter==0){
    //     c.forEach(item => {
    //         if(item>=0) clickCell(item)
    //     })
    // }
    //console.log(minesNearCounter);
    return minesNearCounter;
    
}

function clickCell(item){
    if(isBomb(item)){
        item.innerHTML = "<img src='./imgs/exploded-bomb.png'></img>"
    } else {
       let c = checkCoord(item);
       
       let bombs = bombsNear(c);


        if(bombs>0){
            item.innerHTML = `<img src='./imgs/${bombs}.png'></img>`;
        } else{
            item.innerHTML = "<img src='./imgs/empty.png'></img>";
            let nearCells = [];

            if(c==0) nearCells = [c+1,c+16,c+17]
            else if(c==15) nearCells = [c-1,c+15,c+16]
            else if(c==240) nearCells = [c-16, c-15,c+1]
            else if(c==255) nearCells = [c-16, c-17, c-1]
            else if(c %16==0 && c+16<256 && c-16>0) nearCells = [c-16,c-15,c+1,c+16,c+17]
            else if((c+1)%16==0 && c-16>0 && c+16<255) nearCells = [c-16,c-17,c-1,c+15,c+16]
            else if(c-16<0) nearCells = [c-1,c+15,c+16,c+17,c+1]
            else if(c+16>255) nearCells = [c-1,c-17,c-16,c-15,c+1]
            else nearCells = [c-17,c-16,c-15,c+1,c+17,c+16,c+15,c-1]

            for(let i=0; i<nearCells.length; i++){
                if(nearCells[i] >=0) clickCell(cells[nearCells[i]])
            }
        }

        
    }
}


cells.forEach((item) => {
    item.addEventListener('mousedown', (e)=>{
        if(e.button==2){
            e.preventDefault();
            if(!item.classList.contains('flag') && !item.classList.contains('question')){
                item.innerHTML = "<img src='./imgs/flag.png'></img>";
                item.classList.add('flag');
                mines_counter--;
                let decade = Math.floor(mines_counter / 10);
                let units = mines_counter %10;
                document.querySelector('.minecounter').innerHTML = "<img src=\"./imgs/0time.png\" alt=\"\">" + 
                    `<img src="./imgs/${decade}time.png" alt="">` + 
                    `<img src="./imgs/${units}time.png" alt="">`
            } else if(item.classList.contains('flag') && !item.classList.contains('question')){
                item.innerHTML = "<img src='./imgs/question.png'></img>";
                item.classList.remove('flag');
                item.classList.add('question');
                mines_counter++;
                let decade = Math.floor(mines_counter / 10);
                let units = mines_counter % 10;
                document.querySelector('.minecounter').innerHTML = "<img src=\"./imgs/0time.png\" alt=\"\">" + 
                    `<img src="./imgs/${decade}time.png" alt="">` + 
                    `<img src="./imgs/${units}time.png" alt="">`
            } else if(!item.classList.contains('flag') && item.classList.contains('question')){
                item.innerHTML = "<img src='./imgs/standart.png'></img>";
                item.classList.remove('question');

            }
            
        } else{
            document.querySelector('.button').innerHTML = '<img src="./imgs/o-smile.png" alt="">'
        }
    });
    item.addEventListener('mouseup', ()=>{
        document.querySelector('.button').innerHTML = '<img src="./imgs/smile.png" alt="">'
    });
    item.addEventListener('click', e => clickCell(item));

});

smile.addEventListener('mouseup', () => {
    location.reload();
})
smile.addEventListener('mousedown', ()=>{
    smile.innerHTML = ` <img src="./imgs/pressed-smile.png" alt="">`
})
