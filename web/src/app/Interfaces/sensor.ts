export interface Sensor {
    clave: string;
    data: {
      uuid: string;
      tipo_sensor: string;
      numero_serie: string;
      data: string;
      fecha: string;
      hora: string;
    };
    descripcion: string;
    nombre: string;
    unidad: string;
  }