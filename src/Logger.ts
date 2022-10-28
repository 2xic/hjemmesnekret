

class Printer {
    public green(text: string){
        return this.print(text, Color.GREEN)
    }

    public red(text: string){
        return this.print(text, Color.RED)
    }

    private print(text: string, color: Color){
        return (`${color}${text}${Color.RESET}`)
    }
}


export function HappyLog(text: string): string {
    return new Printer().green(text);
}

export function SadLog(text: string): string {
    return new Printer().red(text);
}

export enum Color {
    GREEN = '\x1b[0;32m',
    RED = '\x1b[0;31m',
    RESET = '\x1b[0m',
}
