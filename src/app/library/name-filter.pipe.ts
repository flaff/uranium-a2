import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform(items: any[], value: string): any[] {
    if (!items) return [];
    if(value) value = value.toLowerCase();
    return items.filter(
      object => object.name.toLowerCase().indexOf(value) !== -1 ||
                object.tags ? object.tags.filter(tag => tag.toLowerCase().indexOf(value)).length > 0 : true
    );
  }

}
