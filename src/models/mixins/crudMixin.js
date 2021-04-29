import { isObject, has, isEmpty, toNumber, cloneDeep } from "lodash";
import router from "@/router";
import store from "@/store";
export default {
  /**
   *
   */
  async loadCollection(
    page = 0,
    filters = null,
    sort = null,
    size = null,
    cache = null,
    params = null,
    recoveryFilters = false
  ) {
    // Verifica se o primeiro parametro é um objeto de configuração
    // Ex.: model.loadCollection({size: 50});
    if (arguments.length === 1 && isObject(page)) {
      const config = page;
      return this.loadCollection(0, config);
    }

    // Verifica se o segundo parametro é um objeto de configuração
    // Ex.: model.loadCollection(1, {size: 50});
    if (arguments.length === 2 && isObject(filters)) {
      const config = filters;
      const paths = [
        "page",
        "filters",
        "sort",
        "size",
        "cache",
        "params",
        "recoveryFilters"
      ];

      let foundConfig = false;
      paths.forEach(path => {
        foundConfig = foundConfig || has(config, path);
      });

      if (foundConfig) {
        page = config.page;
        filters = config.filters;
        sort = config.sort;
        size = config.size;
        cache = config.cache;
        params = config.params;
        recoveryFilters = config.recoveryFilters;
      }
    }

    sort = this.checkSortConfig(sort);
    size = this.checkSizeConfig(size);
    cache = this.checkCacheConfig(cache);
    filters = this.checkFiltersConfig(filters, recoveryFilters);

    // Verifica se tem algum tratamento para realizar no filtro
    filters = await this.beforeFilter(filters);

    // faz o tratamento da URL
    let url = this.formatUrlParams(page, sort, filters, size, {
      useSimpleSearch: this.useSimpleSearch
    });

    try {
      let response = {};
      const headers = {};

      if (cache) {
        headers["Cache-Control"] = cache;
      }

      if (this.eQueryType) {
        let eQueryURL = `?type=${this.eQueryType}`;

        if (!isEmpty(url)) {
          eQueryURL = `${eQueryURL}&${url}`;
        }

        response = await this.requestEQuery.get(eQueryURL, { headers, params });
      } else {
        url = url ? `?${url}` : "";
        response = await this.request.get(url, { headers, params });
      }

      const collection = await this.prepareCollectionOnLoad(response.data);

      return Promise.resolve(collection);
    } catch {
      return [];
    }
  },

  /**
   *
   * @param {*} filterUrl
   */
  async search(filterUrl) {
    filterUrl = encodeURIComponent(filterUrl);
    const response = await this.request.get(`?search=${filterUrl}`);
    return Promise.resolve(response.data.content);
  },

  /**
   *
   */
  async loadRecord(id, cache = null) {
    // Caso não venha o cache por parametro, verifica se tem na configuração do model
    cache = cache || this.cacheRecord;
    if (toNumber(cache) > 0) {
      cache = `max-age=${toNumber(cache)}`;
    }

    const headers = {};

    if (cache) {
      headers["Cache-Control"] = cache;
    }

    const response = await this.request.get(`${id}`, { headers });
    const record = await this.prepareRecordOnLoad(response.data);

    return Promise.resolve(record);
  },

  /**
   *
   */
  async insertRecord(attributes) {
    const originalAttributes = cloneDeep(attributes);
    let response = null;

    try {
      attributes = this.castsAttributes(attributes);
      attributes = this.hidesAttributes(attributes);
      attributes = await this.beforeSave(attributes);
      attributes = await this.beforeInsert(attributes);

      const params = {};

      if (this.withResponseBody) {
        params.response = true;
      }

      if (this.withResponseId) {
        params.responseID = true;
      }

      response = await this.request.post("", attributes, { params });

      await this.afterSave(originalAttributes, response.data);
      await this.afterInsert(originalAttributes, response.data);

      if (!this.silent) {
        // Toast.success("Item incluído com sucesso!");
      }

      return Promise.resolve(response.data);
    } catch (error) {
      const customError = error.response ? error.response.data : error;

      if (response) {
        customError.attributes = response.data;
      }

      return Promise.reject(customError);
    }
  },

  /**
   *
   */
  async updateRecord(id, attributes) {
    const originalAttributes = cloneDeep(attributes);
    let response = null;

    try {
      attributes = this.castsAttributes(attributes);
      attributes = this.hidesAttributes(attributes);
      attributes = await this.beforeSave(attributes);
      attributes = await this.beforeUpdate(attributes);

      const params = {};

      if (this.withResponseBody) {
        params.response = true;
      }

      if (this.withResponseId) {
        params.responseID = true;
      }

      response = await this.request.put(`${id}`, attributes, { params });

      await this.afterSave(originalAttributes, response.data);
      await this.afterUpdate(originalAttributes, response.data);

      if (!this.silent) {
        store.dispatch(
          "Snackbar/setSnackbar",
          {
            show: true,
            text: "Item atualizado com sucesso!",
            color: "success"
          },
          { root: true }
        );
      }

      router.go(-1);

      return Promise.resolve(response.data);
    } catch (error) {
      const customError = error.response ? error.response.data : error;

      if (response) {
        customError.attributes = response.data;
      }

      return Promise.reject(customError);
    }
  },

  /**
   *
   */
  async updateRecordPatch(id, attributes) {
    const originalAttributes = cloneDeep(attributes);
    let response = null;

    try {
      attributes = this.castsAttributes(attributes);
      attributes = this.hidesAttributes(attributes);
      attributes = await this.beforeSave(attributes);
      attributes = await this.beforeUpdate(attributes);

      const params = {};

      if (this.withResponseBody) {
        params.response = true;
      }

      if (this.withResponseId) {
        params.responseID = true;
      }

      response = await this.request.patch(`${id}`, attributes, { params });

      await this.afterSave(originalAttributes, response.data);
      await this.afterUpdate(originalAttributes, response.data);

      if (!this.silent) {
        // Toast.success("Item atualizado com sucesso!");
      }

      return Promise.resolve(response.data);
    } catch (error) {
      const customError = error.response ? error.response.data : error;

      if (response) {
        customError.attributes = response.data;
      }

      return Promise.reject(customError);
    }
  },

  /**
   *
   */
  async deleteRecord(id) {
    try {
      const response = await this.request.delete(`${id}`);

      if (!this.silent) {
        // Toast.success("Item excluído com sucesso!");
      }

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error);
    }
  }
};
