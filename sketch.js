let stories = [
    {
        text: "O Microsoft Windows 95 Foi lançado em 1995 para substituir o Microsoft Windows 3.1. Trazendo consigo inovações que perduram até os dias atuais. Sendo elas nostalgicas ou não, serviram como base para a construção do que conhecemos hoje como Personal Computer.",
        madeBy: "ETEC - Itaquera",
        lastChange: "Última atualização: 25/04/23",
        imgPath: "imgs/img-1.gif",
    },
    {
        text: "Com sua logo histórica e marcante, o Windows 95 foi o primeiro sistema operacional a usar arquitetura 32 bits. Aprimorando também seu sistema de arquivos, agora era suportado uma maior liberdade na nomeação de arquivos e diretórios. ",
        madeBy: "ETEC - Itaquera",
        lastChange: "Última atualização: 25/04/23",
        imgPath: "imgs/img-2.gif",
    },
    {
        text: "A instalação do Windows 95 era muito prática na época, a instalação que se tornou padrão para a maioria dos sistemas se popularizou nessa era e era usado o CD-ROM que possuia o programa necessário para a instalação do SO. Era necessário também diversos requisitos periféricos, o mais inovador e marcante deles foi a introdução do Mouse para a utilização da interface gráfica.",
        madeBy: "ETEC - Itaquera",
        lastChange: "Última atualização: 25/04/23",
        imgPath: "imgs/img-3.gif",
    },
    {
        text: "Com a introdução de um conceito inovador. A chamada ''MultiTasking'' foi implementada e agora era possível um acesso simultâneo a diversos programas ao mesmo tempo, possibilitando uma maior produtividade no uso profissional e também no uso pessoal. Com certeza uma das mais marcantes atualizações desse antigo sistema operacional.",
        madeBy: "ETEC - Itaquera",
        lastChange: "Última atualização: 25/04/23",
        imgPath: "imgs/img-4.gif",
    },
    {
        text: "Windows 95 com Internet Explorer: Uma atualização adicionaria um dos símbolos mais ilustre ao Windows. A criação do navegador WEB Windows Explorer estreou no Windows 95 e se popularizou, sendo o navegador mais usado durante décadas, 26 anos depois ele receberia uma nova versão que se tornaria padrão. Com uma estratégia ousada e ao mesmo tempo perigosa, a Microsoft tornou o Internet Explorer um case de sucesso absoluto, dominando o mercado por muitos anos.",
        madeBy: "ETEC - Itaquera",
        lastChange: "Última atualização: 25/04/23",
        imgPath: "imgs/img-5.gif",
    },
];

// Core
function Timer(fn, countdown) {
    var ident, complete = false;

    function _time_diff(date1, date2) {
        return date2 ? date2 - date1 : new Date().getTime() - date1;
    }

    function cancel() {
        clearTimeout(this.ident);
    }

    function pause() {
        clearTimeout(this.ident);
        total_time_run = _time_diff(start_time);
        complete = total_time_run >= countdown;
    }

    function resume() {
        ident = complete ? -1 : setTimeout(fn, countdown - total_time_run);
    }

    var start_time = new Date().getTime();
    ident = setTimeout(fn, countdown);

    return { cancel: cancel, pause: pause, resume: resume, ident: ident };
}

let timerCount = null;

makePages();
const storyPages = document.querySelectorAll(".page");
const storyPagesLoading = document.querySelectorAll(".loading");
storyPages[0].classList.add("page-active");
storyPagesLoading[0].classList.add("loading-active");
let curPage = 0;
reloadPage();
var paused = false;

function reloadPage() {
    const textLength = stories[curPage].text.length;

    if (textLength > 200 && textLength < 300) document.querySelector("h1").style.fontSize = "1.5rem";
    if (textLength > 300 && textLength < 400) document.querySelector("h1").style.fontSize = "1.3rem";
    if (textLength > 400)                     document.querySelector("h1").style.fontSize = "1rem";

    document.querySelector(".main-text h1 mark").innerHTML = stories[curPage].text;
    document.querySelector(".desc p strong").innerHTML = stories[curPage].madeBy;
    document.querySelector(".desc span em").innerHTML = stories[curPage].lastChange;
    document.querySelector(".story .bg").src = stories[curPage].imgPath;

    const story = document.querySelector(".story");
    setTimeout(() => {
        story.classList.add("story-active");
    }, 400);
    story.classList.remove("story-active");

    console.log("Timer count: " + timerCount);
    clearTimeout(timerCount);
    let timer = new Timer(() => {
        let test = curPage;
        nextPage(curPage);
    }, 10000);
    timerCount = timer.ident;
    console.log("Timer ony: " + timer.ident);

    document.addEventListener("click", (event) => {
        console.log("Click: " + paused);
        if (paused == false) {
            paused = true;
            timer.pause();
            document.querySelector(".loading").style.animationPlayState = "paused";
        } else {
            timer.resume();
            paused = true;
            document.querySelector(".loading").style.animationPlayState = "running";
        }
    })
}

function makePages() {
    for (let i = 0; i < stories.length; i++) {
        const newPage = document.createElement("div");
        const newPageLoading = document.createElement("div");
        const newPageInput = document.createElement("input");

        newPage.classList.add("page-wrap");
        newPageLoading.classList.add("loading");
        newPageInput.type = "button";
        newPageInput.classList.add("page");
        newPage.appendChild(newPageInput);
        newPage.appendChild(newPageLoading);

        document.querySelector(".stories .pages").appendChild(newPage);
    }
}

function nextPage(pageIndex) {
    const storyPages = document.querySelectorAll(".page");
    const storyPagesLoading = document.querySelectorAll(".loading");

    storyPages[pageIndex].classList.remove("page-active");
    storyPagesLoading[pageIndex].classList.remove("loading-active");

    if (pageIndex == storyPages.length-1)
        pageIndex = 0;
    else 
        pageIndex++;

    curPage = pageIndex;
    storyPages[pageIndex].classList.add("page-active");
    storyPagesLoading[pageIndex].classList.add("loading-active");

    clearTimeout();
    clearInterval();

    reloadPage();
}

function previousPage(pageIndex) {
    const storyPages = document.querySelectorAll(".page");
    const storyPagesLoading = document.querySelectorAll(".loading");

    storyPages[pageIndex].classList.remove("page-active");
    storyPagesLoading[pageIndex].classList.remove("loading-active");

    if (pageIndex == 0) 
        pageIndex = storyPages.length - 1;
    else
        pageIndex--;

    curPage = pageIndex;
    storyPages[pageIndex].classList.add("page-active");
    storyPagesLoading[pageIndex].classList.add("loading-active");

    reloadPage();
}



// Events
const nextStoryBtn = document.querySelector(".next");
const previousStoryBtn = document.querySelector(".previous");
const nextStoryMobileBtn = document.querySelector(".nextMobile");
const previousStoryMobileBtn = document.querySelector(".previousMobile");

storyPages.forEach((page, index) => {
    page.addEventListener("click", () => {
        storyPages[curPage].classList.remove("page-active");
        page.classList.add("page-active");

        curPage = index;
        reloadPage();
    });
});

nextStoryBtn.addEventListener("click", () => {
    clearTimeout();
    nextPage(curPage);
});

previousStoryBtn.addEventListener("click", () => {
    clearTimeout();
    previousPage(curPage);
});

// nextStoryMobileBtn.addEventListener("click", () => {
//     nextPage(curPage);
// });

// previousStoryMobileBtn.addEventListener("click", () => {
//     previousPage(curPage);
// });

document.addEventListener("keyup", (event) => {
    if (event.key == "ArrowRight")
        nextPage(curPage);
    if (event.key == "ArrowLeft")
        previousPage(curPage);
}, false);


