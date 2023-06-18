import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(value: string[], ...args: unknown[]): unknown {
    return value.join(' / ');
  }

}
