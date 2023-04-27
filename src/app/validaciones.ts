import { ValidatorFn, AbstractControl } from '@angular/forms';

export function validarFechaRango100(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fecha = new Date(control.value);
      const hoy = new Date();
      const hace100Anios = new Date();
      hace100Anios.setFullYear(hace100Anios.getFullYear() - 100);
  
      if (fecha < hace100Anios || fecha > hoy) {
        return { 'fechaInvalida': { value: control.value } };
      }
  
      return null;
    };
  }

