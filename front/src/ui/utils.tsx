const timeModeToEmoji = (timeMode: string) => {
    if (timeMode == "after-school") return { emoji: "🏫", name: "After school" };
    if (timeMode == "after-dinner") return { emoji: "🍽️", name: "After dinner" };
    if (timeMode == "custom") return { emoji: "🕒", name: "Custom time" };
    return { emoji: "❓", name: "UNKNOWN" };
};

export { timeModeToEmoji };
