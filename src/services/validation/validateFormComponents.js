async function validateVueComponent(component) {
  if (!component.$children) {
    return true;
  }

  const array = await Promise.all(
    component.$children.map(async childComponent => {
      if (
        childComponent.customValidation &&
        typeof childComponent.customValidation === "function"
      ) {
        return await childComponent.validate();
      } else if (childComponent.$children) {
        return await validateVueComponent(childComponent);
      }

      return true;
    })
  );

  return array.every(i => Boolean(i));
}

export default async function validateFormComponents(form) {
  return await validateVueComponent(form);
}
