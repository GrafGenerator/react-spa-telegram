import { apiBaseUrl } from "#config/apis";
import { createFetch } from "#common/api";
import { ResourceEntryCategoryApiModel } from "#models/api";

export function getAllCategories(): Promise<ResourceEntryCategoryApiModel[]> {
  return createFetch(apiBaseUrl)
    .get("/api/resourceEntryCategories")
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error(`Get all categories request failed with code ${resp.status}, "${resp.statusText}"`);
    });
}
