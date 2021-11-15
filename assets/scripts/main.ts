
import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property(Label)
    logArea: Label | null = null;

    start () {
        // [3]
        console.log(`SDKBox TS start`);
        this.initPlugin();
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    onButtonInit() {
        if (!this.checkSDKBox()) { return; }
        console.log(`SDKBox TS onButtonInit`);

        if (sdkbox.PluginFacebook.isLoggedIn()) {
            this.output("FB to Logout");
            sdkbox.PluginFacebook.logout();
        } else {
            this.output("FB to Login");
            sdkbox.PluginFacebook.login(['public_profile']);
        }
    }

    onButtonStart() {
        if (!this.checkSDKBox()) { return; }
        console.log(`SDKBox TS onButtonStart`);

        const permission = sdkbox.PluginFacebook.getPermissionList();
        this.output('FB permission:' + permission);
        console.log("FB token:" + sdkbox.PluginFacebook.getAccessToken());
        this.output("FB UserID:" + sdkbox.PluginFacebook.getUserID());
        this.output("FB SDK Ver:" + sdkbox.PluginFacebook.getSDKVersion());

        sdkbox.PluginFacebook.api("me", "GET", ['first_name'], "me");
    }

    initPlugin() {
        this.initPluginFacebook();
    }

    initPluginFacebook() {
        if (!this.checkSDKBox()) { return; }

        if ('undefined' == typeof sdkbox.PluginFacebook) {
            this.output('sdkbox.PluginFacebook is undefined');
            return;
        }

        const self = this;
        sdkbox.PluginFacebook.setListener({
            onLogin: function(isLogin, msg) {
              if(isLogin){
                self.output("login successful");
              } else {
                self.output("login failed");
              }
            },
            onAPI: function(tag, data) {
                self.output(`onAPI t:${tag}`);
                if (tag == "me") {
                    const obj = JSON.parse(data);
                    self.output('onAPI Name:' + obj.name);
                // } else if (tag == "/me/friendlists") {
                //     var obj = JSON.parse(data);
                //     var friends = obj.data;
                //     for (var i = 0; i < friends.length; i++) {
                //     self.output("id %s", friends[i].id);
                //     }
                // } else if (tag == "__fetch_picture_tag__") {
                //     var obj = JSON.parse(data);
                //     var url = obj.data.url;
                //     self.output("get friend's profile picture=%s", url);
                }
            },
            onSharedSuccess: function(data) {
                self.output("share successful");
            },
            onSharedFailed: function(data) {
                self.output("share failed");
            },
            onSharedCancel: function() {
                self.output("share canceled");
            },
            onPermission: function(isLogin, msg) {
                if(isLogin) {
                    self.output("request permission successful");
                }
                else {
                    self.output("request permission failed");
                }
            },
            onFetchFriends: function(ok, msg) {
                self.output(ok + ":"+msg, "onFetchFriends");
            },
            onRequestInvitableFriends: function(friendsData) {
                self.output(JSON.stringify(friendsData));
            },
            onInviteFriendsWithInviteIdsResult: function (result, description) {
                self.output("onInviteFriendsWithInviteIdsResult result=" + (result?"ok":"error") + " " + description);
            },
            onInviteFriendsResult: function (result, description) {
                self.output("onInviteFriendsResult result=" + (result?"ok":"error") + " " + description);
            }
        });
        sdkbox.PluginFacebook.init();
    }

    checkSDKBox(): boolean {
        if ('undefined' == typeof sdkbox) {
            console.log("Can't detect sdkbox");
            return false;
        }

        return true;
    }

    output(s: string) {
        console.log(s);

        if (null == this.logArea) {
            return;
        }

        let lines = this.logArea.string.split('\n');
        while (lines.length > 5) {
            lines.shift();
        }
        lines.push(s);
        this.logArea.string = lines.join('\n');
    }

}

