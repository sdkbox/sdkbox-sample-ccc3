
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

        console.log(`SDKBox TS onButtonInit`);
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

