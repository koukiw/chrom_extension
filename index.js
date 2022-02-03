let prevState;
let lastLocked;
let lastActive;

chrome.idle.onStateChanged.addListener((state) => {
    if (state === 'locked') {
        prevState = state;
        lastLocked = new Date();

    } else if (prevState === 'locked' && state === 'active') {
        prevState = state;
        lastActive = new Date();
        //alert(`last locked: ${lastLocked.toISOString()}, last active: ${lastActive.toISOString()}`);
        const Editing_URL = "https://atnd.ak4.jp/attendance";//編集画面URL
        const Stamping_URL = "https://atnd.ak4.jp/mypage/punch";//打刻画面URL
        AkashiConnection(Stamping_URL);

    }
}); 

//https://atnd.ak4.jp/attendance
//akashiデスクトップ通知関数
function AkashiConnection(AKASHI_URL){
    chrome.notifications.create('test', {
        type: 'basic',
        iconUrl: 'akashi.png',
        title: 'AKASHI休憩 アラート',
        message: 'AKASHI休憩打刻した？',
        priority: 2,
    });
    chrome.notifications.onClicked.addListener(() => {
        window.open().location.href = AKASHI_URL;
    });    
}