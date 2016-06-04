import { Pipe, PipeTransform } from '@angular/core';

import { User } from './domain';

@Pipe({
  name: 'online'
})
export class OnlineFilter implements PipeTransform {
  transform(value: User[]): any {
    const d = new Date().getTime(),
          gap = 1000 * 60 * 7; // 7 minutes
    
    return value ? value.filter( u => u.lastSeen && d > u.lastSeen && d - u.lastSeen < gap) : value;
  }
}
