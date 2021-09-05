let btnP1 = document.getElementById('btnP1');
let btnP2 = document.getElementById('btnP2');

let pages = document.getElementsByClassName('page');

let page1 = document.getElementById('page1');
let page2 = document.getElementById('page2');



btnP1.onclick = function () {
    Array.from(pages).forEach(page => {
        if (page.id != 'page1') {
            page.style.display = 'none';
            console.log(page);
        } else {
            page.style.display = 'block';
            console.log(page);
        };
    });
};

btnP2.onclick = function () {
    Array.from(pages).forEach(page => {
        if (page.id != 'page2') {
            page.style.display = 'none';
            console.log(page);
        } else {
            page.style.display = 'block';
            console.log(page);
        };
    });
};