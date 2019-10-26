import { BotCommandEvent } from "../../bot-event";

/*
 * Created on Sat Oct 26 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export interface CommandInfo {

    readonly CommandList: string[];

    readonly Description: string;

    readonly Usage: string;

    onCommand(e: BotCommandEvent): void;

}