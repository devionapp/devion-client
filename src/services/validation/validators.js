import { email, helpers } from "vuelidate/lib/validators";
import moment from "moment";

export * from "vuelidate/lib/validators";
export * from "vuelidate/lib/validators/common";

const DATE_FORMAT = "YYYY-MM-DD";
const DATE_FORMAT_BR = "DD/MM/YYYY";

/**
 *
 * @param {*} cpf
 */
function validCPF(cpf) {
  cpf = cpf.replace(/[^0-9]/g, "");

  if (
    !cpf ||
    cpf.length !== 11 ||
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999"
  ) {
    return false;
  }

  var soma = 0;
  var resto;
  for (var i = 1; i <= 9; i++) {
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  soma = 0;

  for (var j = 1; j <= 10; j++) {
    soma = soma + parseInt(cpf.substring(j - 1, j)) * (12 - j);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
}

/**
 *
 * @param {*} cnpj
 */
function validCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^0-9]/g, "");

  if (
    !cnpj ||
    cnpj.length !== 14 ||
    cnpj === "00000000000000" ||
    cnpj === "11111111111111" ||
    cnpj === "22222222222222" ||
    cnpj === "33333333333333" ||
    cnpj === "44444444444444" ||
    cnpj === "55555555555555" ||
    cnpj === "66666666666666" ||
    cnpj === "77777777777777" ||
    cnpj === "88888888888888" ||
    cnpj === "99999999999999"
  ) {
    return false;
  }

  var tamanho = cnpj.length - 2;
  var numeros = cnpj.substring(0, tamanho);
  var digitos = cnpj.substring(tamanho);
  var soma = 0;
  var pos = tamanho - 7;

  for (var i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos;
    pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (resultado !== parseInt(digitos.charAt(0))) {
    return false;
  }

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (var j = tamanho; j >= 1; j--) {
    soma += numeros.charAt(tamanho - j) * pos;
    pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (resultado !== parseInt(digitos.charAt(1))) {
    return false;
  }
  return true;
}

/**
 *
 * @param {*} value
 */
const requiredNumber = value => {
  return value > 0;
};

/**
 *
 * @param {*} value
 */
const CPF = value => {
  return !helpers.req(value) || validCPF(value);
};

/**
 *
 * @param {*} value
 */
const CNPJ = value => {
  return !helpers.req(value) || validCNPJ(value);
};

/**
 *
 * @param {*} value
 */
const CPFCNPJ = value => {
  let isValid = false;
  value = value ? value.replace(/[^0-9]/g, "") : null;

  if (value && value.length === 11) {
    isValid = CPF(value);
  } else if (value && value.length === 14) {
    isValid = CNPJ(value);
  }

  return !helpers.req(value) || isValid;
};

/**
 *
 * @param {*} value
 */
const maiorIdade = value => {
  const nascimento = value;
  if (nascimento && moment(nascimento).isValid()) {
    const idade = moment().diff(nascimento, "years");
    return idade >= 18;
  }

  return false;
};

const validJSON = value => {
  if (!value) {
    return true;
  }
  try {
    return !!JSON.parse(value);
  } catch (e) {
    return false;
  }
};

/**
 *
 * @param {*} key
 */
const object = (key = "id") => {
  return helpers.withParams({ type: "key", key }, value => {
    if (value) {
      return typeof value === "object" && !!value[key];
    }

    return !helpers.req(value);
  });
};

/**
 *
 * @param {*} key
 */
const objectOrText = (key = "id") => {
  return helpers.withParams({ type: "key", key }, value => {
    if (value) {
      if (typeof value === "object") {
        return !!value[key];
      } else if (typeof value === "string") {
        return !!value.trim();
      }
    }

    return false;
  });
};

/**
 *
 * @param {*} dateParam
 */
const maxDate = (dateParam = moment()) => {
  return helpers.withParams({ type: "date", dateParam }, value => {
    dateParam = moment(dateParam).format(DATE_FORMAT);

    if (!moment(value).isValid()) {
      value = moment(value, DATE_FORMAT_BR).toDate();
    }

    if (value && moment(value).isValid()) {
      value = moment(value).format(DATE_FORMAT);
      return dateParam >= value;
    }

    return !helpers.req(value);
  });
};

const minDateIf = (prop, dateParam = moment()) => {
  return helpers.withParams({ type: "date", prop }, function(value, parentVm) {
    if (helpers.ref(prop, this, parentVm)) {
      dateParam = moment(dateParam).format(DATE_FORMAT);

      if (!moment(value).isValid()) {
        value = moment(value, DATE_FORMAT_BR).toDate();
      }

      if (value && moment(value).isValid()) {
        value = moment(value).format(DATE_FORMAT);
        return dateParam <= value;
      }
    }
    return helpers.req(value);
  });
};

/**
 *
 * @param {*} dateParam
 */
const minDate = (dateParam = moment()) => {
  return helpers.withParams({ type: "date", dateParam }, value => {
    dateParam = moment(dateParam).format(DATE_FORMAT);

    if (!moment(value).isValid()) {
      value = moment(value, DATE_FORMAT_BR).toDate();
    }

    if (value && moment(value).isValid()) {
      value = moment(value).format(DATE_FORMAT);
      return dateParam <= value;
    }

    return !helpers.req(value);
  });
};

const emailIf = prop => {
  return helpers.withParams({ type: "email", prop }, function(value, parentVm) {
    return helpers.ref(prop, this, parentVm) ? email(value) : true;
  });
};

const dateFormatIf = prop => {
  return helpers.withParams({ type: "date", prop }, function(value, parentVm) {
    if (helpers.ref(prop, this, parentVm)) {
      return moment(value, DATE_FORMAT_BR, true).isValid();
    }
    return helpers.req(value);
  });
};

const unique = async function(model, field, value, id = null) {
  if (!value) {
    return true;
  }

  const filters = {
    [field]: {
      condition: "equal",
      value: value
    }
  };

  if (id) {
    filters.id = {
      condition: "notEqual",
      value: id
    };
  }

  const response = await model.loadCollection({ filters, cache: 30 });

  return response.content ? response.content.length === 0 : true;
};

export {
  requiredNumber,
  CPFCNPJ,
  CPF,
  CNPJ,
  maiorIdade,
  validJSON,
  objectOrText,
  object,
  maxDate,
  minDate,
  minDateIf,
  emailIf,
  dateFormatIf,
  unique
};
