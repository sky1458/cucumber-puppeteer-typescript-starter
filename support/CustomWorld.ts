import {World} from "cucumber";
import {BrowserActor} from "./actors/BrowserActor";
import {CustomParameters, defaults} from "./CustomParameters";
import {merge} from "lodash";

export class CustomWorld implements World {
    readonly attach: Function;
    readonly parameters: CustomParameters;
    readonly browser: BrowserActor;

    constructor({attach, parameters}: { attach: Function, parameters: CustomParameters }) {
        this.attach = attach;
        this.parameters = CustomWorld.mixinParameters(parameters);
        this.browser = new BrowserActor(this);
    }

    async init() {
        await this.browser.init();
    }

    async destroy() {
        await this.browser.destroy();
    }

    private static mixinParameters(userDefined: CustomParameters) {
        return merge({}, defaults, userDefined);
    }
}
