const Botkit = require('botkit');
const googlehome = require('google-home-notifier');

//GoogleHome
const language = 'ja';
const deviceName = 'Google-Home'; //なんでもいい
googlehome.device(deviceName, language)

//Slack
const slackToken = 'xoxb-***'; //slack

//Botkit
const controller = Botkit.slackbot({
    debug: false,
    status_optout: true
});

controller.spawn({
    token: slackToken
}).startRTM(err => {
    if (err) {
	process.exit(1);
	console.log('Error: Cannnot to Slack');
        //throw new Error(err);
    }
});

controller.hears([''], 'ambient,bot_message', (bot, message) => {
    console.log(message.text);
    googlehome.notify(message.text, res => {
        console.log(res);
    })
    bot.api.reactions.add({
        timestamp:message.ts,
        channel: message.channel,
        name:"ok"
    });
});
