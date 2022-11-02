import { Printer } from "./Printer";

export function HappyLog(text: string): string {
    return new Printer().green(text);
}

export function SadLog(text: string): string {
    return new Printer().red(text);
}

export function YellowColorLog(text: string): string {
    return new Printer().yellow(text);
}
