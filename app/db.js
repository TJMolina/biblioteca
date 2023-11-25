import mongoose from "mongoose";
export const conectDB = async () => {
  try {//127.0.0.1 es lo casi lo mismo que localhost, solo que en node causa errores usar localhosta al conectarse a mongodb
      // await mongoose.connect('mongodb://127.0.0.1:27017/biblioteca');
      await mongoose.connect('mongodb+srv://BibliotecaEEST5:oGwJjUvI889eHnzW@libreria.6go72ou.mongodb.net/biblioteca?retryWrites=true&w=majority');
      console.log('>>> DB is conected.');
  } catch (error) {
      console.log(error);
  }
}