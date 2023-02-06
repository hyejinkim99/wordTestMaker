import { words } from './words.js'

const WordListParser = (words) => {

    // new line 단위로 텍스트 분리
    let splitText = words.split("\n");
    let wordList = [];

    let chapterNumber = 0;
    let list = [];
    for (let i=0; i<splitText.length; i++){
        let t = splitText[i];
        // #로 시작하는 경우
        if (t[0] == "#"){
            chapterNumber = parseInt(t.slice(1), 10);
        } // #로 끝나는 경우
        else if (t.slice(-1) == "#") {
            wordList.push(list);
            chapterNumber += 1;
            list = [];
        } else if (t != "") {
            list.push(t);
        }
    }
    return wordList;
}

const ChapterParser = (text) => {
    let chapterList = [];
    let splitText = text.split(" ");
    for (let i=0; i<splitText.length; i++) {
        let t = splitText[i];
        if (t != ""){
            chapterList.push(parseInt(t, 10));
        }
    }
    return chapterList;
}

const MakeRandomWordsList = (wordList, numOfWords) => {
    let wordListLength = wordList.length;
    if (wordListLength < numOfWords) {
        return wordList;
    } else {
        let list = [];
        for (let i=0; i<numOfWords; i++) {
            while (true) {
                let num = Math.floor(Math.random() * wordListLength);
                let word = wordList[num];
                if (!list.includes(word)) {
                    list.push(word)
                    break;
                }
            }
        }
        return list;
    }
}


let wordList = WordListParser(words);

const chapterInput = document.getElementById("chapter_input");
const numberInput = document.getElementById("number_input");

let texts = ["", "", "", ""];

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const button4 = document.getElementById("button4");
button1.onclick = () => {
    window.navigator.clipboard.writeText(texts[0]);
}
button2.onclick = () => {
    window.navigator.clipboard.writeText(texts[1]);
}
button3.onclick = () => {
    window.navigator.clipboard.writeText(texts[2]);
}
button4.onclick = () => {
    window.navigator.clipboard.writeText(texts[3]);
}


// 시험지 생성
const button = document.getElementById("button");
button.onclick = () => {

    for (let i=0; i<4; i++) {
        texts[i] = "";
    }

    // 챕터 리스트 받아와서 단어 모음
    let chapters = [];

    let chapterList = ChapterParser(chapterInput.value);
    for (let i=0; i<chapterList.length; i++) {
        let number = chapterList[i];
        if (number <= wordList.length) {
            chapters.push(wordList[number-1]);
        }
    }

    // 각 챕터별로 단어 몇 개 할 건지 결정
    let wordNumberList = [];

    let numberOfWords = parseInt(numberInput.value, 10);
    let numberOfChapters = chapters.length;
    let wordsInChapter = parseInt(numberOfWords / numberOfChapters, 10);
    let leftWords = numberOfWords % numberOfChapters;
    for (let i=0; i<numberOfChapters; i++){
        if (i >= numberOfChapters - leftWords) {
            wordNumberList.push(wordsInChapter + 1);
        } else {
            wordNumberList.push(wordsInChapter);
        }
    }


    // wordList 갖고 오기
    let count = 0;
    for (let i=0; i<numberOfChapters; i++) {
        let chapter = chapters[i];
        let numOfWord = wordNumberList[i];
        let list = MakeRandomWordsList(chapter, numOfWord);
        for (let i=0; i<list.length; i++) {
            let index = Math.floor(count / 10);
            texts[index] += (list[i] + "\n");
            count += 1;
        }
    }
};