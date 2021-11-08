
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

        const self = this;
        sdkbox.IAP.setListener({
            onSuccess : function (product) {
                //Purchase success
                self.output("Purchase successful: " + product.name);
            },
            onFailure : function (product, msg) {
                //Purchase failed
                //msg is the error message
                self.output("Purchase failed: " + product.name + " error: " + msg);
            },
            onCanceled : function (product) {
                //Purchase was canceled by user
                self.output("Purchase canceled: " + product.name);
            },
            onRestored : function (product) {
                //Purchase restored
                self.output("Restored: " + product.name);
            },
            onProductRequestSuccess : function (products) {
                //Returns you the data for all the iap products
                //You can get each item using following method
            },
            onProductRequestFailure : function (msg) {
                //When product refresh request fails.
                self.output("Failed to get products");
            },
            onShouldAddStorePayment: function(productId) {
                self.output("onShouldAddStorePayment:" + productId);
                return true;
            },
            onFetchStorePromotionOrder : function (productIds, error) {
                self.output("onFetchStorePromotionOrder:" + " " + " e:" + error);
            },
            onFetchStorePromotionVisibility : function (productId, visibility, error) {
                self.output("onFetchStorePromotionVisibility:" + productId + " v:" + visibility + " e:" + error);
            },
            onUpdateStorePromotionOrder : function (error) {
                self.output("onUpdateStorePromotionOrder:" + error);
            },
            onUpdateStorePromotionVisibility : function (error) {
                self.output("onUpdateStorePromotionVisibility:" + error);
            },
        });
        sdkbox.IAP.init();
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

