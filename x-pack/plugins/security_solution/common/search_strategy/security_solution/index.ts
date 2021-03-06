/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { IEsSearchRequest } from '../../../../../../src/plugins/data/common';
import { ESQuery } from '../../typed_json';
import {
  HostDetailsStrategyResponse,
  HostDetailsRequestOptions,
  HostOverviewStrategyResponse,
  HostAuthenticationsRequestOptions,
  HostAuthenticationsStrategyResponse,
  HostOverviewRequestOptions,
  HostFirstLastSeenStrategyResponse,
  HostFirstLastSeenRequestOptions,
  HostsQueries,
  HostsRequestOptions,
  HostsStrategyResponse,
  HostUncommonProcessesStrategyResponse,
  HostUncommonProcessesRequestOptions,
} from './hosts';
import {
  NetworkQueries,
  NetworkDetailsStrategyResponse,
  NetworkDetailsRequestOptions,
  NetworkDnsStrategyResponse,
  NetworkDnsRequestOptions,
  NetworkTlsStrategyResponse,
  NetworkTlsRequestOptions,
  NetworkHttpStrategyResponse,
  NetworkHttpRequestOptions,
  NetworkOverviewStrategyResponse,
  NetworkOverviewRequestOptions,
  NetworkTopCountriesStrategyResponse,
  NetworkTopCountriesRequestOptions,
  NetworkTopNFlowStrategyResponse,
  NetworkTopNFlowRequestOptions,
  NetworkUsersStrategyResponse,
  NetworkUsersRequestOptions,
} from './network';
import {
  MatrixHistogramQuery,
  MatrixHistogramRequestOptions,
  MatrixHistogramStrategyResponse,
} from './matrix_histogram';
import {
  DocValueFields,
  TimerangeInput,
  SortField,
  PaginationInput,
  PaginationInputPaginated,
} from '../common';

export * from './hosts';
export * from './matrix_histogram';
export * from './network';

export type FactoryQueryTypes = HostsQueries | NetworkQueries | typeof MatrixHistogramQuery;

export interface RequestBasicOptions extends IEsSearchRequest {
  timerange: TimerangeInput;
  filterQuery: ESQuery | string | undefined;
  defaultIndex: string[];
  docValueFields?: DocValueFields[];
  factoryQueryType?: FactoryQueryTypes;
}

/** A mapping of semantic fields to their document counterparts */

export interface RequestOptions<Field = string> extends RequestBasicOptions {
  pagination: PaginationInput;
  sort: SortField<Field>;
}

export interface RequestOptionsPaginated<Field = string> extends RequestBasicOptions {
  pagination: PaginationInputPaginated;
  sort: SortField<Field>;
}

export type StrategyResponseType<T extends FactoryQueryTypes> = T extends HostsQueries.hosts
  ? HostsStrategyResponse
  : T extends HostsQueries.details
  ? HostDetailsStrategyResponse
  : T extends HostsQueries.overview
  ? HostOverviewStrategyResponse
  : T extends HostsQueries.authentications
  ? HostAuthenticationsStrategyResponse
  : T extends HostsQueries.firstLastSeen
  ? HostFirstLastSeenStrategyResponse
  : T extends HostsQueries.uncommonProcesses
  ? HostUncommonProcessesStrategyResponse
  : T extends NetworkQueries.details
  ? NetworkDetailsStrategyResponse
  : T extends NetworkQueries.dns
  ? NetworkDnsStrategyResponse
  : T extends NetworkQueries.http
  ? NetworkHttpStrategyResponse
  : T extends NetworkQueries.overview
  ? NetworkOverviewStrategyResponse
  : T extends NetworkQueries.tls
  ? NetworkTlsStrategyResponse
  : T extends NetworkQueries.topCountries
  ? NetworkTopCountriesStrategyResponse
  : T extends NetworkQueries.topNFlow
  ? NetworkTopNFlowStrategyResponse
  : T extends NetworkQueries.users
  ? NetworkUsersStrategyResponse
  : T extends typeof MatrixHistogramQuery
  ? MatrixHistogramStrategyResponse
  : never;

export type StrategyRequestType<T extends FactoryQueryTypes> = T extends HostsQueries.hosts
  ? HostsRequestOptions
  : T extends HostsQueries.details
  ? HostDetailsRequestOptions
  : T extends HostsQueries.overview
  ? HostOverviewRequestOptions
  : T extends HostsQueries.authentications
  ? HostAuthenticationsRequestOptions
  : T extends HostsQueries.firstLastSeen
  ? HostFirstLastSeenRequestOptions
  : T extends HostsQueries.uncommonProcesses
  ? HostUncommonProcessesRequestOptions
  : T extends NetworkQueries.details
  ? NetworkDetailsRequestOptions
  : T extends NetworkQueries.dns
  ? NetworkDnsRequestOptions
  : T extends NetworkQueries.http
  ? NetworkHttpRequestOptions
  : T extends NetworkQueries.overview
  ? NetworkOverviewRequestOptions
  : T extends NetworkQueries.tls
  ? NetworkTlsRequestOptions
  : T extends NetworkQueries.topCountries
  ? NetworkTopCountriesRequestOptions
  : T extends NetworkQueries.topNFlow
  ? NetworkTopNFlowRequestOptions
  : T extends NetworkQueries.users
  ? NetworkUsersRequestOptions
  : T extends typeof MatrixHistogramQuery
  ? MatrixHistogramRequestOptions
  : never;
