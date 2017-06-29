/*
 * menu.js intializes menu items and serves as handler
 * of menu requests and dispatch to other items. 
 * 
 * Because background.js includes menu.js, menu.js
 * is in the same contenxt and (therefore) Twitter and 
 * Settings are already initialized.
 */

var Menu = {

	// The onClicked callback function.
	onClickHandler : function(info, tab) {

		var menuItemId = info.menuItemId;

		if (menuItemId.indexOf('collect_tweet') >= 0) {
			Menu.saveTweetHandler(info, tab);
		} else if (menuItemId.indexOf('embed_tweet') >= 0) {
			Menu.embedTweetHandler(info, tab, menuItemId);
		} else if (menuItemId.indexOf('tweet_article') >= 0) {
			Menu.tweetArticleHandler(info, tab, false);
		} else if (menuItemId.indexOf('settings') >= 0) {
			URL.open("settings");
		}

	},

	saveTweetHandler : function(info, tab) {

		var url = Menu.getUrl(info);
		var qs = { "url" : url }
		URL.open("save", qs);

	},

	embedTweetHandler : function(info, tab, style) {

		Twitter.embedTweets([TweetStore.tweetId]);

	},

	tweetArticleHandler : function(info, tab) {

		var url = Menu.getUrl(info);
		url = URL.TWITTER_STATUS + encodeURI(url);
		chrome.tabs.create({
			"url" : url
		});

		return;

	},

	createContext : function() {





		id = chrome.contextMenus.create({
			"title" : "Twitter Auth",
			"contexts" : [ "all" ],
			"id" : "settings"
		});

	},
	
	getUrl : function(info) {
		var url = info.linkUrl;
		if (!url){
			url = info.pageUrl;
		}
		return url;
	}

}