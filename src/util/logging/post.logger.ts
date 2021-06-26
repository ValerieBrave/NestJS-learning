import { Logger } from '@nestjs/common';

import { COLORS } from './colors';

export class PostLogger extends Logger {
    constructor(context: string) {
        super(context, true)
    }

    write(message : string, color: string) {
        console.log('\%s (%s) ---%s--- %s\x1b[0m', color, this.context, Date.now().toString(), message);
    }
    log(message: string) {
        console.log('%s (%s) ---%s--- %s\x1b[0m',COLORS.GREEN, this.context, new Date().toTimeString(), message)
    }
    error(message: string) {
        console.log('%s (%s) ---%s--- %s\x1b[0m',COLORS.RED, this.context, new Date().toTimeString(), message)
    }
    warn(message: string) {
        console.log('%s (%s) ---%s--- %s\x1b[0m',COLORS.YELLOW, this.context, new Date().toTimeString(), message)
    }
    debug(message: string) {
        console.log('%s (%s) ---%s--- %s\x1b[0m',COLORS.CYAN, this.context, new Date().toTimeString(), message)
    }
    verbose(message: string) {
        console.log('%s (%s) ---%s--- %s\x1b[0m',COLORS.MAGENTA, this.context, new Date().toTimeString(), message)
    }
}