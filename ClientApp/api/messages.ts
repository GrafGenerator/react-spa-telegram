import { apiBaseUrl } from "#config/apis";
import { createFetch } from "#common/api";
import { MessageApiModel, IMessagesRequest } from "#models/api";
import * as init from "#common/api/inits";

export function getLatestMessages(request: IMessagesRequest): Promise<MessageApiModel[]> {
  const searchParams: (() => init.OptionSpec)[] = [
    init.searchUriSegment("pid", request.pid),
    init.searchUriSegment("offset", request.offset),
    init.searchUriSegment("count", request.count),
  ];

  return createFetch(apiBaseUrl)
    .get("api/messages", null, ...searchParams)
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error(`Get latest messages request failed with code ${resp.status}, "${resp.statusText}"`);
    });
}
