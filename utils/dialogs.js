// Pop-up beskeder der bruges flere steder i appen
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Spørg før en film fjernes fra en liste
export function confirmRemove(title, onConfirm) {
  Alert.alert("Fjern fra liste?", 'Vil du fjerne "' + title + '" fra listen?', [
    { text: "Annuller", style: "cancel" },
    { text: "Fjern", style: "destructive", onPress: onConfirm },
  ]);
}

// Fake door test
// Del liste findes ikke endnu, knappen skal teste om folk vil have det før jeg bygger det
// gemmer antal tryk og hvor mange der siger ja/nej
const FAKE_DOOR_KEY = "fakedoor_shared_lists";

async function saveFakeDoorAnswer(answer) {
  try {
    const saved = await AsyncStorage.getItem(FAKE_DOOR_KEY);
    const stats = saved ? JSON.parse(saved) : { clicks: 0, yes: 0, no: 0 };
    stats.clicks = stats.clicks + 1;
    if (answer === "ja") stats.yes = stats.yes + 1;
    else stats.no = stats.no + 1;
    await AsyncStorage.setItem(FAKE_DOOR_KEY, JSON.stringify(stats));
    console.log("Fake door - delte lister:", stats); // vises i terminalen
  } catch (e) {
    console.log("Kunne ikke gemme fake door-svar", e);
  }
}

export function openShareFakeDoor() {
  Alert.alert(
    "Delte lister er på vej 👥",
    "Snart kan du dele en liste med venner eller din kæreste, så I nemmere kan finde noget at se sammen. Er det noget, du ville bruge?",
    [
      { text: "Nej tak", style: "cancel", onPress: () => saveFakeDoorAnswer("nej") },
      {
        text: "Ja tak, god idé!",
        onPress: () => {
          saveFakeDoorAnswer("ja");
          // besked om at svaret er gemt
          Alert.alert("Tak! 🙌", "Din interesse er noteret");
        },
      },
    ]
  );
}
