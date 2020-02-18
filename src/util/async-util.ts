/*
 * Created on Sat Feb 08 2020
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export namespace AsyncUtil {

    export async function wait(time: number): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, time));
    }

}