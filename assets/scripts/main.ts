
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]
        console.log(`SDKBox TS start`);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    onButtonInit() {
        console.log(`SDKBox TS onButtonInit`);
        try {
            sdkbox.firebase.Analytics.init();
        } catch (error) {
            console.error(error.toString());
            console.log(error.stack);
        }
    }

    onButtonStart() {
        console.log(`SDKBox TS onButtonStart`);
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
