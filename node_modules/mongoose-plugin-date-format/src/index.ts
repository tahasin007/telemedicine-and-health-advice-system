import moment from 'moment';
import { Schema } from 'mongoose';

function modifyDates(format: string, obj: any): void {
  Object.keys(obj).forEach((k: string): void => {
    if(obj[k] instanceof Date) obj[k] = moment(obj[k]).format(format);
    if(typeof obj[k] === 'object') modifyDates(format, obj[k]);
  });
}

function toJSON(format: string, schema: Schema<any>): any {
  let transform;
  const toJSON = schema.get('toJSON');
  if (toJSON && toJSON.transform) {
    transform = toJSON.transform;
  }
  // Extend toJSON options
  schema.set('toJSON', Object.assign(toJSON || {}, {
    transform(doc, ret) {
      modifyDates(format, ret);

      if (transform) {
        return transform(doc, ret);
      }
    },
  }));
}

function declareFormat(format: string): (schema: Schema) => void {
  // TODO: is valid format

  return toJSON.bind(null, format);
}

export default declareFormat;
