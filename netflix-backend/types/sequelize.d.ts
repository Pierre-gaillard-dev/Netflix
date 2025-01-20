import { Model, ModelStatic } from "sequelize"

export interface ExtendedModelStatic<TModel> extends ModelStatic<TModel> {
	name: string
	associate?: (models: { [key: string]: ModelStatic<Model> }) => void
}
