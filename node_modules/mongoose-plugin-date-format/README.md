# mongoose-plugin-date-format

Change the date field default output in your mongoose schemas

**Note:** This plugin will *only* work with mongoose >= 4.0. Do NOT use
this plugin with mongoose 3.x. You have been warned.

# Usage

The `mongoose-plugin-date-format` module exposes a single function that you can
pass to [Mongoose schema's `plugin()` function](https://mongoosejs.com/docs/api.html#schema_Schema-plugin).

```javascript
const schema = new mongoose.Schema({
  birthdate: Date,
});
schema.plugin(require('mongoose-plugin-date-format')('YYYY-MM-DDTHH:mm:ss[Z]'));
```
