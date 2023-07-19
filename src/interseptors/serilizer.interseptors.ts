import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from "rxjs"

import { map } from 'rxjs/operators'
import { plainToClass } from 'class-transformer'


interface classConstractor {
    new(...args: any[]): {}
}

export function serialzer(dto: classConstractor) {
    return UseInterceptors(new SerializerInterceptor(dto))
}


export class SerializerInterceptor implements NestInterceptor {
    constructor(private dto: classConstractor) { }
    intercept(context: ExecutionContext, next: CallHandler<classConstractor>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data: classConstractor) => {
                return plainToClass(this.dto, data, { excludeExtraneousValues: true })
            })
        )

    }
}
