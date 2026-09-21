// Start-lister så appen ikke er tom første gang
export const WATCHED_ID = "watched";

export const seedLists = [
  { id: "1", name: "Romkom", emoji: "💕", color: "#c53c73", items: [] },
  { id: "2", name: "Film med kæresten", emoji: "🍿", color: "#E6A532", items: [] },
  { id: "3", name: "Must watch", emoji: "⭐", color: "#114B5F", items: [] },
  { id: WATCHED_ID, name: "Set", emoji: "✅", color: "#1B7A6E", items: [], isSystem: true },
];
