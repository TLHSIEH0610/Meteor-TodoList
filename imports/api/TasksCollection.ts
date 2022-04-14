import { Mongo } from "meteor/mongo";
import { TaskProp } from "../model/model";

export const TaskCollection = new Mongo.Collection<TaskProp>("tasks");
