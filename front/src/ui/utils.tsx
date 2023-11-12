const timeModeToEmoji = (timeMode: string | null) => {
    if (timeMode == "after-school") return { emoji: "🚀", name: "After junction" };
    if (timeMode == "after-dinner") return { emoji: "🍽️", name: "After dinner" };
    if (timeMode == "custom") return { emoji: "🕒", name: "Custom time" };
    return { emoji: "❓", name: "UNKNOWN" };
};

export { timeModeToEmoji };
