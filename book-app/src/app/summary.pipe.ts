import {Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'summary'
})
export class SummaryPipe implements PipeTransform {
    transform(value: string, args?: any) {
        if (!value) { return null; }
        // tslint:disable-next-line:no-unused-expression
        return value.substr(0, 150) + '...';
    }
}