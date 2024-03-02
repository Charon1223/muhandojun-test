
import { correctTexts } from './correct.js';
import { hintTexts } from './correct.js';
import { quizImages } from './imgs.js';
import { resultMessage } from './result-message.js';
import { resultImg } from './result-message.js';

const testStartBtn = document.getElementById("start-btn");
const mainPageSection = document.getElementById("main-page");
const quizPageSection = document.getElementById("quiz-page");
const lodingPageSection = document.getElementById("loading-page");
const resultPageSection = document.getElementById("result-page");
const userScore = document.getElementById("user-score");
const progress = document.getElementById("progress");
const $form = document.querySelector("form");

const hintButton = document.querySelector('.hint');
const hintModal = document.querySelector('.hint-modal');
const hintOkay = document.querySelector('.okay');
const hintNope = document.querySelector('.nope');
const hintModalText = document.querySelector('.hint-modal__confirm');

const quizInput = document.querySelector(".answer-input");
const quizImg = document.querySelector(".quiz-img");

const resultText = document.getElementById("result-text");
const resultImages = document.getElementById("result-img");
const resultScores = document.getElementById("result-score");
const copyResultBtn = document.getElementById("share-link");
const reStartBtn = document.getElementById("restart");



let score = 10;
let hint = 5;


// 테스트 시작 
testStartBtn.addEventListener("click", () => {
  mainPageSection.style.display = "none";
  quizPageSection.style.display = "block";
  userScore.textContent = `Score: ${score}점`;

})


// 힌트 버튼
let hintIndex = 0;
const hintElement = document.createElement('p');

hintButton.addEventListener('click', () => {
  
  if(hintIndex < hintTexts.length){
    
    hintModal.style.display = "block";
    hintElement.style.display = "none";
    hintModalText.style.display = "block";
    hintElement.classList.add("hint-modal__hint-text");
    hintElement.textContent = hintTexts[hintIndex];
    hintModal.appendChild(hintElement);
  }
});


// 힌트(OK버튼)
hintOkay.addEventListener("click", () => {
  
  hintModalText.style.display = "none";
  hintElement.style.display = "block";
  
  score -= hint;
  userScore.textContent = `Score: ${score}점`;



  if(hintIndex === stepIndex){

    if(score < 0){
      alert("점수가 부족합니다😞");
      userScore.textContent = `Score: 0점`;
      hintElement.style.display = "none";
      hintModal.style.display = "none";
      return;
    } 

    if(hintIndex < hintTexts.length){
      hintElement.classList.add("hint-modal__hint-text");
      hintElement.textContent = hintTexts[hintIndex];
      hintElement.style.display = "block";
      hintModal.appendChild(hintElement);
      return;
    }
  }
});


// 힌트(NO) 버튼
hintNope.addEventListener("click", () => {
  hintModal.style.display = "none";
});

setInterval(() => {
  hintButton.classList.add('shake');

  setTimeout(() => {
    hintButton.classList.remove('shake');
  }, 500);
}, 3000);



//정답 입력
let stepIndex = 0;
        
function increaseProgress() {
  if (stepIndex <= 110) {
    const currentWidth = parseInt(progress.style.width || '0');
    progress.style.width = (currentWidth + 10) + "%";
  }
}

const baseURL = '/';
function printResult(score){

  if(score > 0 && score <= 20){
    resultScores.textContent = `${score}점`;
    resultText.textContent = resultMessage[0].message;
    resultImages.src = resultImg[0];
    return `?result=f${score}`;
  } else if(score >= 21 && score <= 40){
    resultScores.textContent = `${score}점`;
    resultText.textContent = resultMessage[1].message;
    resultImages.src = resultImg[1];
    return `?result=d${score}`;
  } else if(score >= 41 && score <= 60){
    resultScores.textContent = `${score}점`;
    resultText.textContent = resultMessage[2].message;
    resultImages.src = resultImg[2];
    return `?result=c${score}`;
  } else if(score >= 61 && score <= 80){
    resultScores.textContent = `${score}점`;
    resultText.textContent = resultMessage[3].message;
    resultImages.src = resultImg[3];
    return `?result=b${score}`;
  } else {
    resultScores.textContent = `${score}점`;
    resultText.textContent = resultMessage[4].message;
    resultImages.src = resultImg[4];
    setTimeout(() => confetti(), 3000);
    return `?result=a${score}`;
  }
}
function redirectToResultPage(score) {
  const queryString = printResult(score);
  const resultURL = baseURL + queryString;
  history.pushState({}, "", resultURL); // 현재 링크를 변경
}



$form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const userInputValue = quizInput.value.trim();
  
  
  
  if(userInputValue !== ''){
    if(userInputValue === correctTexts[stepIndex]){
      if(stepIndex < quizImages.length){
        
        quizImg.src = `${quizImages[stepIndex]}`;
        stepIndex++;
        hintElement.classList.remove("hint-modal__hint-text");
        hintElement.style.display = "none";
        hintModal.style.display = "none";
        hintIndex++;
        score += 10;
        userScore.textContent = `Score: ${score}점`;
        increaseProgress();

        if(score < 0){
          userScore.textContent = `Score: 0점`;
          hintElement.style.display = "none";
          hintModal.style.display = "none";
          quizInput.value = '';
          return;
        } 
        

      } else {
        score += 10;
        quizPageSection.style.display = "none";
        lodingPageSection.style.display = "block";
        setTimeout(() => {
        lodingPageSection.style.display = "none";
        resultPageSection.style.display = "block";
        
        }, 3000);

        printResult(score);
        redirectToResultPage(score)

        
      }
    } else {
      score -= 3;
      userScore.textContent = `Score: ${score}점`;
      alert("정답이 아닙니다 🥲");

      if(score <= 0){
        alert("저런..남은 점수가 없네요...😢");
        location.reload();
        return;
      }
    }
    quizInput.value = '';
  } else {
    alert("당신의 무도력을 보여주세요 💪🏻")
  }

 
});


// 공유하기 기능
function shareResult(){
  
  const currentPath = window.location.search;
  const numbers = [];

  for(let i = 0; i <= 110; i++){
    numbers.push(i);
    
    if(currentPath === `?result=f${i}` ||
      currentPath === `?result=d${i}` ||
      currentPath === `?result=c${i}` ||
      currentPath === `?result=b${i}` ||
      currentPath === `?result=a${i}`){
      
      mainPageSection.style.display = "none";
      quizPageSection.style.display = "none";
      lodingPageSection.style.display = "none";
      resultPageSection.style.display = "block";
      copyResultBtn.style.display = "none";
      
      resultScores.textContent = `${i}점`;
      reStartBtn.textContent = '메인으로'

      if(i <= 20){
        resultImages.src = resultImg[0];
        resultText.textContent = resultMessage[0].message;
      } else if(i <= 40){
        resultImages.src = resultImg[1];
        resultText.textContent = resultMessage[1].message;
      } else if(i <= 60){
        resultImages.src = resultImg[2];
        resultText.textContent = resultMessage[2].message;
      } else if(i <= 80){
        resultImages.src = resultImg[3];
        resultText.textContent = resultMessage[3].message;
      } else if(i <= 110){
        resultImages.src = resultImg[4];
        resultText.textContent = resultMessage[4].message;
      }
    }
  }
}
shareResult();



// 결과 공유버튼
copyResultBtn.addEventListener('click', () => {
  const currenURL = window.location.href;

  const tempInput = document.createElement("textarea");
  tempInput.value = currenURL;

  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  alert("테스트 결과가 복사되었습니다.");
  console.log(currenURL);
});


//다시하기 버튼
reStartBtn.addEventListener('click', () => {
  window.location.href = "/";
})