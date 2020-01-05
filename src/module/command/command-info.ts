import { BotCommandEvent } from "../../bot-event";
import { Logger } from "../../logger/logger";

/*
 * Created on Sat Oct 26 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export interface CommandInfo {

    readonly CommandList: string[];

    readonly Description: string;

    readonly Usage: string;

    onCommand(e: BotCommandEvent, logger: Logger): void;

}