// tslint:disable-next-line:import-name
import dateformatplugin from '../src';
import mongoose, { Schema } from 'mongoose';
import moment from 'moment';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('mongoose-plugin-date-format', () => {
  let mongod;

  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const uri = await mongod.getConnectionString();

    return mongoose.connect(uri, {
      useNewUrlParser: true,
    });
  });

  test('convert the date to a specific format', async () => {
    const personSchema = new Schema({ name: String, birthdate: Date });
    const dateFormat = 'YYYY';
    const birthdate = moment();
    personSchema.plugin(dateformatplugin(dateFormat));
    const personModel = mongoose.model('people', personSchema, 'people');

    const john = {
      birthdate,
      name: 'John Doe',
    };

    const person = await personModel.create(john);
    expect(person.get('birthdate')).toBeInstanceOf(Date);
    expect(person.toJSON().birthdate).toEqual(birthdate.format(dateFormat));
  });

  test('convert the date to a specific format with nested object', async () => {
    const personSchema = new Schema({
      name: String,
      birthdate: Date,
      nestedObject: {
        name: String,
        birthdate: Date,
      },
    });
    const dateFormat = 'YYYY';
    const birthdate = moment();
    personSchema.plugin(dateformatplugin(dateFormat));
    const personModel = mongoose.model('peopleNested', personSchema, 'peopleNested');

    const john = {
      birthdate,
      name: 'John Doe',
      nestedObject: {
        name: 'Nested test',
        birthdate,
      },
    };

    const person = await personModel.create(john);
    expect(person.get('birthdate')).toBeInstanceOf(Date);
    expect(person.toJSON().birthdate).toEqual(birthdate.format(dateFormat));
    expect(person.toJSON().nestedObject.birthdate).toEqual(birthdate.format(dateFormat));
  });

  test('convert the date to a specific format with nested array of object', async () => {
    const personSchema = new Schema({
      name: String,
      birthdate: Date,
      nestedArray: [{
        name: String,
        birthdate: Date,
      }],
    });
    const dateFormat = 'YYYY';
    const birthdate = moment();
    personSchema.plugin(dateformatplugin(dateFormat));
    const personModel = mongoose.model('peopleNestedArrayOfObjects', personSchema, 'peopleNestedArrayOfObjects');

    const john = {
      birthdate,
      name: 'John Doe',
      nestedArray: [
        {
          name: 'Nested test',
          birthdate,
        },
        {
          name: 'Nested test2',
          birthdate,
        },
      ],
    };

    const person = await personModel.create(john);
    expect(person.get('birthdate')).toBeInstanceOf(Date);
    expect(person.toJSON().birthdate).toEqual(birthdate.format(dateFormat));
    expect(person.toJSON().nestedArray[0].birthdate).toEqual(birthdate.format(dateFormat));
    expect(person.toJSON().nestedArray[1].birthdate).toEqual(birthdate.format(dateFormat));
  });

  afterAll(async () => {
    mongoose.disconnect();
    await mongod.stop();
  });
});
