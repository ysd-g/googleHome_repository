・概要
御社からメールを受信した際に、GASが動き、
そのメールの件名をSlackへ投げる。

Slackで件名を通知後、Google Homeが動き、
その件名をGoogle Homeがアナウンスするというシステム。


・注意
googleHome_repository/announced_from_gHome の
inform_sb_gas.gsは、GASファイル
index-git.jsは、Google Homeのファイルであるが、
SlackのKeyなどは省略しているため、
実際に動かす際には、
~/slack-google-home-notifierに移動して、実行する


