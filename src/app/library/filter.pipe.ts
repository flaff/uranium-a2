import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  transform(items: any[], value: string): any[] {
    if (!items) return [];
    if(value) {
      value = value.toLowerCase();
    } else {
      return items;
    }
    return items.filter(
      object => object.name.toLowerCase().indexOf(value) !== -1 ||
                object.genres.filter(genre => genre.match(value)).length
    );
  }

}
