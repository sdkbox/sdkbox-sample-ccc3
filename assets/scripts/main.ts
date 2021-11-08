
import { _decorator, Component, Node } from 'cc';
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
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    onButtonInit() {
        if (!this.checkSDKBox()) { return; }

        this.initIAP();
        this.initPluginAdMob();
    }

    onButtonStart() {
        if (!this.checkSDKBox()) { return; }
        console.log(`SDKBox TS onButtonStart`);
    }

    checkSDKBox(): boolean {
        if ('undefined' == typeof sdkbox) {
            console.log("Can't detect sdkbox");
            return false;
        }

        return true;
    }

    initIAP() {
        console.log(`to init IAP`);
        try {
            sdkbox.IAP.init();
        } catch (error) {
            console.error(error.toString());
            console.log(error.stack);
        }
    }

    initPluginAdMob() {
        if ('undefined' == typeof sdkbox) {
            this.output('sdkbox is undefined');
            return;
        }

        if ('undefined' == typeof sdkbox.PluginAdMob) {
            this.output('sdkbox.PluginAdMob is undefined');
            return;
        }

        const self = this;
        sdkbox.PluginAdMob.setListener({
            adViewDidReceiveAd: function(name: string) {
                self.output('adViewDidReceiveAd:'+name);
            },
            adViewDidFailToReceiveAdWithError: function(name, msg) {
                self.output('adViewDidFailToReceiveAdWithError:'+name+':'+msg);
            },
            adViewWillPresentScreen: function(name) {
                self.output('adViewWillPresentScreen:'+name);
            },
            adViewDidDismissScreen: function(name) {
                self.output('adViewDidDismissScreen:'+name);
            },
            adViewWillDismissScreen: function(name) {
                self.output('adViewWillDismissScreen:'+name);
            },
            adViewWillLeaveApplication: function(name) {
                self.output('adViewWillLeaveApplication:'+name);
            },
            reward: function(name, currency, amount) {
                self.output('reward:'+name+':'+currency+':'+amount);
            }
        });
        sdkbox.PluginAdMob.init();
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

