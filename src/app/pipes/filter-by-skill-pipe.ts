import { Pipe, PipeTransform } from '@angular/core';
import { IProficiency } from '../models/sheet.model';

@Pipe({
  name: 'filterBySkill',
})
export class FilterBySkillPipe implements PipeTransform {

  transform(proficiencies: IProficiency[] | null, skillId: string | undefined): IProficiency[] {
    if (!proficiencies || !skillId) {
      return [];
    }
    return proficiencies.filter(proficiency => 
      proficiency.skillId === skillId
    );
  }

}
