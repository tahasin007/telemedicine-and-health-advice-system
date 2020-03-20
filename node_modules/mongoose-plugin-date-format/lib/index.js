"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
function modifyDates(format, obj) {
    Object.keys(obj).forEach((k) => {
        if (obj[k] instanceof Date)
            obj[k] = moment_1.default(obj[k]).format(format);
        if (typeof obj[k] === 'object')
            modifyDates(format, obj[k]);
    });
}
function toJSON(format, schema) {
    let transform;
    const toJSON = schema.get('toJSON');
    if (toJSON && toJSON.transform) {
        transform = toJSON.transform;
    }
    schema.set('toJSON', Object.assign(toJSON || {}, {
        transform(doc, ret) {
            modifyDates(format, ret);
            if (transform) {
                return transform(doc, ret);
            }
        },
    }));
}
function declareFormat(format) {
    return toJSON.bind(null, format);
}
exports.default = declareFormat;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBNEI7QUFHNUIsU0FBUyxXQUFXLENBQUMsTUFBYyxFQUFFLEdBQVE7SUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFTLEVBQVEsRUFBRTtRQUMzQyxJQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsWUFBWSxJQUFJO1lBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLGdCQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xFLElBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUTtZQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBUyxNQUFNLENBQUMsTUFBYyxFQUFFLE1BQW1CO0lBQ2pELElBQUksU0FBUyxDQUFDO0lBQ2QsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFO1FBQzlCLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0tBQzlCO0lBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRSxFQUFFO1FBQy9DLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRztZQUNoQixXQUFXLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRXpCLElBQUksU0FBUyxFQUFFO2dCQUNiLE9BQU8sU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUM1QjtRQUNILENBQUM7S0FDRixDQUFDLENBQUMsQ0FBQztBQUNOLENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FBQyxNQUFjO0lBR25DLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUVELGtCQUFlLGFBQWEsQ0FBQyJ9