import fs from "node:fs";
import path from "node:path";

const dictionaryDir = path.join(process.cwd(), "src", "i18n", "dictionaries");
const source = JSON.parse(fs.readFileSync(path.join(dictionaryDir, "ko.json"), "utf8"));

function validate(reference, candidate, currentPath) {
  if (Array.isArray(reference)) {
    if (!Array.isArray(candidate)) {
      errors.push(`${currentPath}: expected an array`);
      return;
    }
    if (reference.length !== candidate.length) {
      errors.push(`${currentPath}: expected ${reference.length} items, received ${candidate.length}`);
    }

    const referenceIds = reference.map((item) => item?.id).filter(Boolean);
    const candidateIds = candidate.map((item) => item?.id).filter(Boolean);
    if (referenceIds.length > 0 && referenceIds.join("|") !== candidateIds.join("|")) {
      errors.push(`${currentPath}: item IDs or ordering do not match`);
    }

    for (let index = 0; index < Math.min(reference.length, candidate.length); index += 1) {
      validate(reference[index], candidate[index], `${currentPath}[${index}]`);
    }
    return;
  }

  if (reference && typeof reference === "object") {
    if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
      errors.push(`${currentPath}: expected an object`);
      return;
    }

    const referenceKeys = Object.keys(reference).sort();
    const candidateKeys = Object.keys(candidate).sort();
    for (const key of referenceKeys) {
      if (!(key in candidate)) errors.push(`${currentPath}.${key}: missing key`);
    }
    for (const key of candidateKeys) {
      if (!(key in reference)) errors.push(`${currentPath}.${key}: unexpected key`);
    }
    for (const key of referenceKeys) {
      if (key in candidate) validate(reference[key], candidate[key], `${currentPath}.${key}`);
    }
    return;
  }

  if (typeof reference !== typeof candidate) {
    errors.push(`${currentPath}: expected ${typeof reference}, received ${typeof candidate}`);
  }
}

const localeFiles = fs
  .readdirSync(dictionaryDir)
  .filter((file) => file.endsWith(".json") && file !== "ko.json")
  .sort();

const errors = [];

for (const file of localeFiles) {
  const target = JSON.parse(fs.readFileSync(path.join(dictionaryDir, file), "utf8"));
  validate(source, target, file.replace(/\.json$/, ""));
}

if (errors.length > 0) {
  console.error("Locale dictionaries are out of sync:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Locale dictionaries match: ko ↔ ${localeFiles.map((file) => file.replace(/\.json$/, "")).join(", ")}`);
