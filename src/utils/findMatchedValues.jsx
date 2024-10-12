export const findMatchedValues = (data, stacks, languages, levels) => {
    const matchedStack = stacks?.find(s => s.label === data.stack_name)?.value || "";
    const matchedLanguages = data.language_names
        ? data.language_names.map(lang => languages?.find(l => l.label === lang)?.value || "")
        : [];
    const matchedLevel = levels?.find(l => l.label === data.level_name)?.value || "";

    return { matchedStack, matchedLanguages, matchedLevel };
};