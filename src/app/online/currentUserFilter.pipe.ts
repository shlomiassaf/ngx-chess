import { Pipe, PipeTransform } from '@angular/core';

import { User } from './domain';

@Pipe({
  name: 'currentUser'
})
export class CurrentUserFilter implements PipeTransform {
  transform(value: User[], user$key: string): any {
    return value && user$key ? value.filter( u => u.$key !== user$key) : value;
  }
}
