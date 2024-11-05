import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Store extends Model {
  public id!: number;
  public name!: string;
  public contact!: string; // Verifique se esta linha está presente
  public cep!: string;
  public street!: string;
  public number!: string;
  public neighborhood!: string;
  public city!: string;
  public state!: string;
  public latitude!: number;
  public longitude!: number;
}

Store.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: { // Certifique-se de que esta definição está correta
      type: DataTypes.STRING,
      allowNull: false,
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'stores',
    timestamps: true, // Adiciona campos de createdAt e updatedAt
  }
);

export default Store;
