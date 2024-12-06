import mongoose from "mongoose";
const { Schema, model } = mongoose;
import normalize from 'normalize-mongoose';

const clientSchema = new Schema({
    name: {
        type: String,
        require: true
    }
});
clientSchema.plugin(normalize);
const ClientModel = model('Client', clientSchema);

export default ClientModel;