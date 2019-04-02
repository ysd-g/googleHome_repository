function myFunction() {
  //Slack
  const SLACK_WEBHOOKS = "**********"; //WebHooksで発行されたURL
  const SLACK_POSTUSER = "ドラミちゃん"; //Slackに通知されるユーザ名
  const SLACK_ICON = ":hatching_chick:";  // 通知時に表示されるアイコン

  //Gmailから特定の条件のスレッドを検索し、メールを取り出す
  var strTerms = 'is:unread ("Softbank" OR "ソフトバンク")';
  var myThreads = GmailApp.search(strTerms, 0, 10); //条件にマッチした複数件のスレッドを取得
  var myMsgs = GmailApp.getMessagesForThreads(myThreads) //スレッドからメールを取得 ※ 二次元配列で格納 
  var valMsgs = [];
 
  //各メールから日時，送信元，件名を取り出す
  for(var i = 0; i < myMsgs.length; i++){
    var msgToSlack = "";
    
    valMsgs[i] = [];
    valMsgs[i][0] = myMsgs[i][0].getDate();
    valMsgs[i][1] = myMsgs[i][0].getFrom();
    valMsgs[i][2] = myMsgs[i][0].getSubject();
    valMsgs[i][3] = myMsgs[i][0].getPlainBody();
    
    msgToSlack = valMsgs[i][2] + "\n";
    
    var jsonData =
    {
     "username" : SLACK_POSTUSER,
     "icon_emoji": SLACK_ICON,
     "text" : msgToSlack
    };
    
    var jsnMsg = JSON.stringify(jsonData);
    
    var options =
    {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : jsnMsg
    };

    UrlFetchApp.fetch(SLACK_WEBHOOKS, options);
    
    myMsgs[i][0].markRead(); //既読にする
  }
}

