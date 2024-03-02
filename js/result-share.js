// 결과 페이지의 기본 URL
var baseURL = "http://example.com/result";

// 점수에 따른 결과 페이지의 쿼리 문자열 생성 함수
function generateQueryString(score) {
    if (score > 0 && score <= 20) {
        return "?result=1"; // 예를 들어, 점수가 20점 이하일 때의 결과 식별자
    } else if (score >= 21 && score <= 40) {
        return "?result=2"; // 예를 들어, 점수가 40점 이하일 때의 결과 식별자
    } else if (score >= 41 && score <= 60) {
        return "?result=3"; // 예를 들어, 점수가 60점 이하일 때의 결과 식별자
    } else if (score >= 61 && score <= 80) {
        return "?result=4"; // 예를 들어, 점수가 80점 이하일 때의 결과 식별자
    } else {
        return "?result=5"; // 예를 들어, 그 외의 경우의 결과 식별자
    }
}

// 점수에 따른 결과 페이지로 이동하는 함수
function redirectToResultPage(score) {
    var queryString = generateQueryString(score);
    var resultURL = baseURL + queryString;
    window.location.href = resultURL;
}

// 사용 예시
var score = 50; // 예를 들어, 사용자의 점수
redirectToResultPage(score);
