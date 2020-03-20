import { Schema } from 'mongoose';
declare function declareFormat(format: string): (schema: Schema) => void;
export default declareFormat;
