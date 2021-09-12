import Filter from "@/services/filter/Filter";
import {
  isNil,
  isEmpty,
  isNumber,
  isBoolean,
  isDate,
  mapKeys,
  isObject,
  isArray
} from "lodash";

export const queryParamsHelper = {
  _params: [],

  /**
   *
   */
  clearParams() {
    this._params = [];
  },

  /**
   *
   * @param {*} value
   */
  addParam(value) {
    if (value) {
      this._params.push(value);
    }
  },

  /**
   *
   * @param {*} page
   */
  pageParam(page) {
    if (page > 0) {
      return `page=${page}`;
    }

    return "";
  },

  /**
   *
   * @param {*} sort
   */
  sortParam(sort) {
    if (sort) {
      if (typeof sort.field !== "string") {
        let sortString = `sort=${sort.field[0]},${sort.type}`;
        for (let i = 1; i < sort.field.length; i++) {
          sortString += `&sort=${sort.field[i]},${sort.type}`;
        }
        return sortString;
      } else {
        return `sort=${sort.field},${sort.type}`;
      }
    }

    return "";
  },

  /**
   *
   * @param {*} size
   */
  sizeParam(size) {
    if (size) {
      return `size=${size}`;
    }

    return "";
  },

  /**
   *
   * @param {*} value
   */
  isValidValue(value) {
    if (isNil(value)) {
      return false;
    }

    return (
      !isEmpty(value) || isNumber(value) || isBoolean(value) || isDate(value)
    );
  },

  /**
   *
   * @param {*} object
   */
  convertObjectToFilter(object) {
    var filterObj = new Filter();
    var useComplexSearch = false;

    mapKeys(object, (item, key) => {
      if (item && this.isValidValue(item.value)) {
        useComplexSearch = true;
        key = item.object || key;

        const field = item.field ? `${key}.${item.field}` : key;
        filterObj = filterObj.where(field, item.condition, item.value);
      }
    });

    if (useComplexSearch) {
      let str = filterObj.get();

      if (!isEmpty(str)) {
        str = encodeURIComponent(str);
        return `filter=${str}`;
      }
    } else {
      return this.serializer(object);
    }

    return null;
  },

  /**
   *
   * @param {*} filters
   * @param {*} options
   */
  filterParam(filters, options) {
    if (!filters) {
      return null;
    }

    if (options.useSimpleSearch) {
      return this.serializer(filters);
    } else if (filters instanceof Filter) {
      return `filter=${filters.get()}`;
    } else if (isObject(filters)) {
      return this.convertObjectToFilter(filters);
    } else {
      filters = encodeURIComponent(filters);
      return `filter=${filters}`;
    }
  },

  /**
   *
   * @param {*} page
   * @param {*} sort
   * @param {*} filters
   * @param {*} size
   * @param {*} options
   */
  collectionURL(page, sort, filters, size, options = {}) {
    this.clearParams();
    this.addParam(this.pageParam(page));
    this.addParam(this.sortParam(sort));
    this.addParam(this.filterParam(filters, options));
    this.addParam(this.sizeParam(size));

    return this._params.length ? `${this._params.join("&")}` : "";
  },

  serializer(params) {
    var parts = [];

    for (var key in params) {
      // eslint-disable-next-line no-prototype-builtins
      if (params.hasOwnProperty(key)) {
        var obj = params[key];

        if (isArray(obj)) {
          for (var idx = 0; idx < obj.length; idx++) {
            parts.push(`${key}=${encodeURIComponent(obj[idx])}`);
          }
        } else {
          parts.push(`${key}=${encodeURIComponent(obj)}`);
        }
      }
    }
    return parts.join("&");
  }
};
