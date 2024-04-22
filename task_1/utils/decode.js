const EXCLUDED_FIELDS = ["groupId", "service", "formatSize", "ca"];

function isDecodableKey(key) {
  return key.endsWith("Id") && !EXCLUDED_FIELDS.includes(key);
}

function decodedValueForKey(key, value, translations) {
  return isDecodableKey(key) ? translations[parseInt(value)] ?? value : value;
}

export default function decode(encoded, translations) {
  return encoded.map((item) => {
    const decodedItem = {};

    for (const key in item) {
      decodedItem[key] = decodedValueForKey(key, item[key], translations);
    }

    return decodedItem;
  });
}
