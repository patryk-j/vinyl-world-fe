const DATA_TEST_ATTRIBUTE_NAME = "data-testid";

export function testId(id) {
  return { [DATA_TEST_ATTRIBUTE_NAME]: id };
}

export function testIdFactory(prefix, separator = "-") {
  return (id) => ({ [DATA_TEST_ATTRIBUTE_NAME]: `${prefix}${separator}${id}` });
}
