
export class Printer {
    public green(text: string){
        return this.print(text, Color.GREEN)
    }

    public red(text: string){
        return this.print(text, Color.RED)
    }

    public yellow(text: string){
        return this.print(text, Color.YELLOW)
    }

    private print(text: string, color: Color){
        return (`${color}${text}${Color.RESET}`)
    }
}


enum Color {
    GREEN = '\x1b[0;32m',
    YELLOW = '\x1b[0;33m',
    RED = '\x1b[0;31m',
    RESET = '\x1b[0m',
}

