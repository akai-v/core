export interface ArgumentParser<T> {
    parse(rawArgs: string): T;
}
export declare class SpaceSplitedParser implements ArgumentParser<string[]> {
    parse(rawArgs: string): string[];
}
export declare class OptionParser implements ArgumentParser<Map<string, any>> {
    parse(rawArgs: string): Map<string, any>;
}
