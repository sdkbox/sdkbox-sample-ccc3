
import { _decorator, Component, Node, Label } from 'cc';
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
        this.log(`SDKBox TS start`);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    onButtonInit() {
        if (!this.checkSDKBox()) { return; }

        this.initIAP();
    }

    onButtonStart() {
        if (!this.checkSDKBox()) { return; }
        this.log(`SDKBox TS onButtonStart`);
    }

    checkSDKBox(): boolean {
        if ('undefined' == typeof sdkbox) {
            this.log("Can't detect sdkbox");
            return false;
        }

        return true;
    }

    initIAP() {
        this.log(`to init IAP`);

        const self = this;
        sdkbox.IAP.setListener({
            onSuccess : function (product) {
                //Purchase success
                self.log("Purchase successful: " + product.name);
                self.printProduct(product);
            },
            onFailure : function (product, msg) {
                //Purchase failed
                //msg is the error message
                self.log("Purchase failed: " + product.name + " error: " + msg);

            },
            onCanceled : function (product) {
                //Purchase was canceled by user
                self.log("Purchase canceled: " + product.name);
            },
            onRestored : function (product) {
                //Purchase restored
                self.log("Restored: " + product.name);

                self.printProduct(product);
            },
            onProductRequestSuccess : function (products) {
                //Returns you the data for all the iap products
                //You can get each item using following method
                for (var i = 0; i < products.length; i++) {
                    self.printProduct(products[i]);
                    // self.log("================");
                    // self.log("name: " + products[i].name);
                    // self.log("price: " + products[i].price);
                    // self.log("priceValue: " + products[i].priceValue);
                    // self.log("================");
                }
            },
            onProductRequestFailure : function (msg) {
                //When product refresh request fails.
                self.log("Failed to get products");
            },
            onShouldAddStorePayment: function(productId) {
                self.log("onShouldAddStorePayment:" + productId);
                return true;
            },
            onFetchStorePromotionOrder : function (productIds, error) {
                self.log("onFetchStorePromotionOrder:" + " " + " e:" + error);
            },
            onFetchStorePromotionVisibility : function (productId, visibility, error) {
                self.log("onFetchStorePromotionVisibility:" + productId + " v:" + visibility + " e:" + error);
            },
            onUpdateStorePromotionOrder : function (error) {
                self.log("onUpdateStorePromotionOrder:" + error);
            },
            onUpdateStorePromotionVisibility : function (error) {
                self.log("onUpdateStorePromotionVisibility:" + error);
            },
        });

        sdkbox.IAP.init();

    }

    printProduct(p: any) {
        // this.log("======The product info======");

        this.log(p.name + ":" + p.price);

        // this.log("name=" + p.name);
        // this.log("title=" + p.title);
        // this.log("description=" + p.description);
        // this.log("price=" + p.price);
        // this.log("priceValue=" + p.priceValue);
        // this.log("currencyCode=" + p.currencyCode);
        // this.log("receipt=" + p.receipt);
        // this.log("receiptCipheredPayload=" + p.receiptCipheredPayload);
        // this.log("transactionID=" + p.transactionID);
        // this.log("");
    }

    log(s: string) {
        console.log(s);
        if (null == this.logArea) { return; }
        let lines = this.logArea.string.split('\n');
        while (lines.length > 4) {
            lines.shift();
        }
        lines.push(s);
        this.logArea.string = lines.join('\n');
    }

}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
