import { FILTER_TYPE } from "@/types";
import moment from "moment";
import { mapKeys, isNil, isEmpty, isNumber } from "lodash";

const Filter = class {
  _searchs = [];
  _groupedItems = [];
  _grouped = false;
  _operator = "and";

  constructor(grouped) {
    this._grouped = grouped;
  }

  /**
   *
   */
  clear() {
    this._groupedItems = [];
  }

  /**
   *
   * @param {*} criteria
   */
  add(criteria) {
    this._groupedItems.push({
      operator: this._operator,
      value: criteria
    });
  }

  /**
   *
   * @param {*} field
   * @param {*} value
   */
  equal(field, value) {
    this.add(`${field}=="${value}"`);
  }

  /**
   *
   * @param {String} field
   * @param {String} value
   */
  notEqual(field, value) {
    this.add(`${field}!="${value}"`);
  }

  /**
   *
   * @param {String} field
   * @param {String} value
   */
  greaterThanOrEqual(field, value) {
    this.add(`${field}>="${value}"`);
  }

  /**
   *
   * @param {String} field
   * @param {String} value
   */
  greaterThan(field, value) {
    this.add(`${field}=gt="${value}"`);
  }

  /**
   *
   * @param {String} field
   * @param {String} value
   */
  lessThanOrEqual(field, value) {
    this.add(`${field}<="${value}"`);
  }

  /**
   *
   * @param {String} field
   * @param {String} value
   */
  lessThan(field, value) {
    this.add(`${field}<"${value}"`);
  }

  /**
   *
   * @param {String} field
   * @param {String} value
   */
  like(field, value) {
    this.add(`${field}=lk="${value}"`);
  }

  /**
   *
   * @param {*} field
   * @param {*} value
   */
  contains(field, value) {
    this.add(`${field}=ctn="${value}"`);
  }

  /**
   *
   * @param {String} field
   * @param {String} value
   */
  in(field, value) {
    this.add(`${field}=in=(${value})`);
  }

  /**
   *
   * @param {String} field
   * @param {String} value
   */
  notIn(field, value) {
    this.add(`${field}=nin=(${value})`);
  }

  /**
   *
   * @param {String} field
   * @param {String} value
   */
  between(field, value) {
    this.add(`${field}=bt="${value}"`);
  }

  /**
   *
   * @param {String} field
   * @param {String} value
   */
  startsWith(field, value) {
    this._search.push(`${field}=sw="${value}"`);
  }

  /**
   *
   * @param {String} field
   * @param {String} value
   */
  endWith(field, value) {
    this.add(`${field}=ew="${value}"`);
  }

  checkCompatibilityType(type) {
    switch (type) {
      case "=":
        return FILTER_TYPE.EQUAL;

      case "!=":
        return FILTER_TYPE.NOT_EQUAL;

      case ">=":
        return FILTER_TYPE.GREATER_THAN_OR_EQUAL;

      case ">":
        return FILTER_TYPE.GREATER_THAN;

      case "<=":
        return FILTER_TYPE.LESS_THAN_OR_EQUAL;

      case "<":
        return FILTER_TYPE.LESS_THAN;

      case "like":
        return FILTER_TYPE.LIKE;

      default:
        return type;
    }
  }

  /**
   *
   * @param {*} field
   * @param {*} type
   * @param {*} value
   * @param {*} operator
   */
  where(field, type, value, operator = "and") {
    this._operator = operator;

    // Caso venha uma função no primeiro parametro
    if (typeof field === "function") {
      return this.whereFunction(field);
    }

    // Limpa os itens caso não seja uma função agrupada
    if (!this._grouped) {
      this.clear();
    }

    // Caso venha apenas 2 parametros, considera que é a condição igual
    if (arguments.length === 2) {
      value = type;
      type = FILTER_TYPE.EQUAL;
    }

    type = this.checkCompatibilityType(type);

    // Verifica se é uma data para colocar no formato certo
    if (moment.isDate(value)) {
      value = moment(value).format("YYYY-MM-DD");
    }

    // Resolve o tipo de busca
    this[type](field, value);

    // Adiciona a lista de criterios
    this._searchs.push({
      operator: this._operator,
      value: this.getSubQuery()
    });

    return this;
  }

  /**
   *
   * @param {*} field
   * @param {*} type
   * @param {*} value
   */
  orWhere(field, type, value) {
    // Caso venha apenas 2 parametros, considera que é a condição igual
    if (arguments.length === 2) {
      value = type;
      type = FILTER_TYPE.EQUAL;
    }

    return this.where(field, type, value, "or");
  }

  /**
   *
   * @param {*} callback
   */
  whereFunction(callback) {
    const query = callback(new Filter(true)).getSubQuery();

    this._searchs.push({
      operator: this._operator,
      value: query
    });

    return this;
  }

  /**
   *
   * @param {*} field
   * @param {*} value
   */
  whereContains(field, value) {
    return this.where(field, FILTER_TYPE.CONTAINS, value);
  }

  /**
   *
   * @param {*} field
   * @param {*} value
   */
  orWhereContains(field, value) {
    return this.where(field, FILTER_TYPE.CONTAINS, value, "or");
  }

  /**
   *
   * @param {*} field
   * @param {*} value
   */
  whereIn(field, value) {
    if (value && value.length > 0) {
      return this.where(field, FILTER_TYPE.IN, value);
    }

    return this;
  }

  /**
   *
   * @param {*} field
   * @param {*} value
   */
  orWhereIn(field, value) {
    if (value && value.length > 0) {
      return this.where(field, FILTER_TYPE.IN, value, "or");
    }

    return this;
  }

  /**
   *
   */
  getSubQuery() {
    var query = "";

    for (let index = 0; index < this._groupedItems.length; index++) {
      const element = this._groupedItems[index];

      if (index > 0) {
        query += ` ${element.operator} `;
      }

      query += element.value;
    }

    if (this._groupedItems.length > 1) {
      query = `(${query})`;
    }

    return query;
  }

  /**
   *
   */
  get() {
    var result = "";

    for (let index = 0; index < this._searchs.length; index++) {
      const element = this._searchs[index];

      if (index > 0) {
        result += ` ${element.operator} `;
      }

      result += element.value;
    }

    return result;
  }

  /**
   *
   * @param {*} filters
   */
  fromObject(filters) {
    mapKeys(filters, (item, key) => {
      if (
        !isNil(item.value) &&
        (!isEmpty(item.value) || isNumber(item.value))
      ) {
        key = item.object || key;

        const field = item.field ? `${key}.${item.field}` : key;
        this.where(field, item.condition, item.value);
      }
    });

    return this;
  }

  /**
   *
   */
  getFiltroAtivo(filters) {
    if (!filters.ativo?.value && filters.inativo?.value) {
      return this.where("ativo", false);
    } else if (!filters.inativo?.value && filters.ativo?.value) {
      return this.where("ativo", true);
    }
    return this;
  }
};

export default Filter;
