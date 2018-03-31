import * as ResourceEntryCategories from "./ResourceEntryCategories";

export interface ApplicationState {
  resourceEntryCategories: ResourceEntryCategories.ResourceEntryCategoriesState;
}

export const reducers = {
  resourceEntryCategories: ResourceEntryCategories.reducer,
};
