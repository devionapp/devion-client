import HttpRequest from "../services/http/HttpRequest";
import { queryParamsHelper } from "@/helpers";
import useCrudMixin from "./uses/useCrudMixin";
import store from "@/store";
import {
  cloneDeep,
  mapKeys,
  omit,
  get,
  isArray,
  set,
  has,
  toNumber
} from "lodash";
import Vue from "vue";

export default class Model {
  /**
   *
   */
  _config;

  /**
   *
   */
  _store;

  /**
   * Classe de requisição
   */
  _request;

  /*
   * Classe de busca complexa
   */
  _requestEQuery;

  /**
   *
   */
  constructor() {
    this.setConfig();
    this._store = store;
  }

  /**
   *
   */
  get request() {
    return this._request;
  }

  /*
   *
   */
  get requestEQuery() {
    return this._requestEQuery;
  }

  /**
   *
   */
  get baseURL() {
    return this._config.baseURL;
  }

  /**
   *
   */
  get resource() {
    return this._config.resource;
  }

  /**
   *
   */
  get pageSize() {
    return this._config.pageSize;
  }

  /**
   *
   */
  get pageSort() {
    return this._config.pageSort;
  }

  /**
   *
   */
  get silent() {
    return this._config.silent;
  }

  /**
   *
   */
  get useSimpleSearch() {
    return this._config.useSimpleSearch;
  }

  /**
   *
   */
  get store() {
    return this._store;
  }

  /**
   *
   */
  get eQueryType() {
    return this._config.eQueryType;
  }

  /**
   *
   */
  get storeName() {
    return this._config.storeName;
  }

  /**
   *
   */
  get params() {
    return this._config.params;
  }

  /**
   *
   */
  get withResponseBody() {
    return this._config.withResponseBody;
  }

  /**
   *
   */
  get withResponseId() {
    return this._config.withResponseId;
  }

  /**
   *
   */
  get cacheCollection() {
    return this._config.cacheCollection;
  }

  /**
   *
   */
  get cacheRecord() {
    return this._config.cacheRecord;
  }

  /**
   *
   */
  setConfig() {
    this._config = this.config();
    this._request = HttpRequest(this.resource, this.baseURL, this.params);
  }

  /**
   *
   * @param {String} action
   * @param {Object} payload
   */
  dispatch(action, payload = null) {
    if (!this.storeName) {
      console.warn(
        `StoreName não informado para o model ${this.constructor.name} `
      );
      return false;
    }

    return this.store.dispatch(`${this.storeName}/${action}`, payload);
  }

  /**
   *
   * @param {*} key
   */
  get(key) {
    if (!this.storeName) {
      console.warn(
        `StoreName não informado para o model ${this.constructor.name} `
      );
      return false;
    }

    return this.store.getters[`${this.storeName}/${key}`];
  }

  hidesAttributes(attributes) {
    if (this.hidden) {
      attributes = cloneDeep(attributes);

      mapKeys(this.hidden, field => {
        attributes = omit(attributes, field);
      });
    }

    return attributes;
  }

  /**
   *
   * @param {*} attributes
   * @param {*} field
   * @param {*} splitKey
   * @param {*} splitType
   */
  castField(attributes, field, splitKey, splitType) {
    const castType = splitType[0];
    const fieldValue = get(attributes, field);

    // Valida o atributo quando é um object dentro de um array
    // Ex. centroCustos.*.usuarios = 'object:id'
    if (isArray(fieldValue) && splitKey[1]) {
      const nestedField = splitKey[1];
      const destField = splitType[1];

      fieldValue.forEach((element, index) => {
        // eslint-disable-next-line valid-typeof
        if (typeof element[nestedField] === castType) {
          Vue.set(
            fieldValue[index],
            nestedField,
            element[nestedField][destField]
          );
        }
      });
    } else {
      const destField = splitType[1];

      /* eslint-disable brace-style */
      // Se o atributo não for do mesmo tipo do cast, então seta nulo
      // eslint-disable-next-line valid-typeof
      if (typeof fieldValue !== castType && !destField) {
        set(attributes, field, null);
      }
      // Se o atributo for um objeto e tiver alguma propriedade no cast
      // Ex.: usuario = 'object:id'
      // Resultado: usuario: {id: 1, nome: 'Rafhael'} vai retornar usuario: 1
      else if (
        typeof fieldValue === "object" &&
        castType === "object" &&
        destField
      ) {
        set(attributes, field, fieldValue[destField]);
      }
    }

    return attributes;
  }

  /**
   *
   * @param {*} attributes
   */
  castsAttributes(attributes) {
    if (this.casts) {
      attributes = cloneDeep(attributes);

      mapKeys(this.casts, (type, key) => {
        const splitKey = key.split(".*.");
        const splitType = type.split(":");

        const field = splitKey[0];

        if (has(attributes, field)) {
          attributes = this.castField(attributes, field, splitKey, splitType);
        }
      });
    }

    return attributes;
  }

  /**
   *
   * @param {*} page
   * @param {*} sort
   * @param {*} filters
   * @param {*} size
   * @param {*} options
   */
  formatUrlParams(page, sort, filters, size, options = {}) {
    return queryParamsHelper.collectionURL(page, sort, filters, size, options);
  }

  /**
   *
   * @param {*} sort
   */
  checkSortConfig(sort) {
    sort = sort || this.pageSort;

    // Salva ou recupera as opções de ordenação
    if (sort) {
      this.dispatch("sort", sort);
    } else {
      sort = this.get("sortOptions");
    }
    return sort;
  }

  /**
   *
   * @param {*} size
   */
  checkSizeConfig(size) {
    return size || this.pageSize;
  }

  /**
   *
   * @param {*} cache
   */
  checkCacheConfig(cache) {
    cache = cache || this.cacheCollection;
    if (toNumber(cache) > 0) {
      cache = `max-age=${toNumber(cache)}`;
    }

    return cache;
  }

  /**
   *
   * @param {*} filters
   */
  checkFiltersConfig(filters, recoveryFilters = false) {
    if (!recoveryFilters) {
      return filters;
    }

    // Salva ou recupera as opções de filtros
    if (filters) {
      this.dispatch("filter", filters);
    } else {
      filters = this.get("filterOptions");
    }

    return filters;
  }

  /**
   *
   * @param {*} collection
   */
  prepareCollectionOnLoad(collection) {
    return collection;
  }

  /**
   *
   * @param {*} record
   */
  prepareRecordOnLoad(record) {
    return record;
  }

  /**
   *
   * @param {*} filters
   */
  beforeFilter(filters) {
    return filters;
  }

  /**
   *
   */
  clearFilters() {
    this.dispatch("filter", null);
  }

  /*
   *
   * @param {*} attributes
   */
  beforeSave(attributes) {
    return attributes;
  }

  /**
   *
   * @param {*} record
   */
  afterSave(attributes, record) {
    return record;
  }

  /**
   *
   * @param {*} attributes
   */
  beforeInsert(attributes) {
    return attributes;
  }

  /**
   *
   * @param {*} record
   */
  afterInsert(attributes, record) {
    return record;
  }

  /**
   *
   * @param {*} attributes
   */
  beforeUpdate(attributes) {
    return attributes;
  }

  /**
   *
   * @param {*} record
   */
  afterUpdate(attributes, record) {
    return record;
  }

  /**
   *
   * @param {*} mixin
   */
  static use(mixin) {
    if (mixin === "CRUD") {
      Object.assign(this.prototype, useCrudMixin(this.prototype));
    } else {
      console.warn(
        `Mixin '${mixin}' não encontrado para o model ${this.prototype.constructor.name}`
      );
    }
  }
}
