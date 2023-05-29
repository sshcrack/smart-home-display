import MainLogger from "src/utils/logger/main";
import { MainPlugin } from "../MainPlugin";
import RegManMain from "src/utils/register/main";

const log = MainLogger.get("PluginArchitecture", "MainRegister")
export default class MainPluginRegister {
    private static plugins = new Map<string, MainPlugin>()
    private static rendererRegistered = [] as string[]

    public static setupEvents() {
        RegManMain.onPromise("plugin_registered", async (_, pluginId) => this.rendererRegistered.push(pluginId))
    }

    public static register(plugin: MainPlugin) {
        const id = plugin.id;

        this.plugins.set(id, plugin)
        log.info("Registered Plugin", `'${id}' (Main)`)

        plugin.initialize()
    }
}