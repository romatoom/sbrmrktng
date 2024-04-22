const EXCLUDED_FIELDS = ["groupId", "service", "formatSize", "ca"];

function isDecodableKey(key) {
  return key.endsWith("Id") && !EXCLUDED_FIELDS.includes(key);
}

function decodedValueForKey(key, value, translations, uniqIds) {
  if (!isDecodableKey(key)) {
    return value;
  }

  const decodedValue = translations[parseInt(value)];

  if (decodedValue === undefined) {
    return value;
  }

  uniqIds.add(parseInt(value));

  return decodedValue;
}

export default function decode(encoded, translations) {
  const uniqIds = new Set();

  const decoded = encoded.map((item) => {
    const decodedItem = {};

    for (const key in item) {
      decodedItem[key] = decodedValueForKey(
        key,
        item[key],
        translations,
        uniqIds
      );
    }

    return decodedItem;
  });

  console.log(
    `Список уникальных id (которые были декодированы): ${[...uniqIds]
      .sort((prev, next) => (next > prev ? -1 : 1))
      .join(", ")}`
  );

  return decoded;
}
