import { Pipe, PipeTransform } from '@angular/core';
import { element } from 'protractor';

@Pipe({
  name: 'eventQuery'
})
export class EventQueryPipe implements PipeTransform {

  transform(values: any[], query: string): any {
    return values.filter((element) => {
      return element.displayName.toLowerCase().includes(query.toLowerCase()) || element.description.toLowerCase().includes(query.toLowerCase());
    });

  }

}
