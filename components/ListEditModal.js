// Rediger eller slet en liste 
import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, Pressable, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useWatchlist } from "../context/WatchlistContext";
import { styles, colors } from "../styles/GlobalStyle";
import { listColors, listEmojis } from "../data/options";

// modal til at redigere en liste: navn, emoji og farve
export default function ListEditModal({ visible, list, onClose, onDeleted }) {
  const { updateList, deleteList } = useWatchlist();
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("🎬");
  const [color, setColor] = useState(colors.primary);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Når listen ændres, opdater inputfelterne
  React.useEffect(() => {
    if (list) {
      setName(list.name);
      setEmoji(list.emoji || "🎬");
      setColor(list.color || colors.primary);
      setConfirmDelete(false);
    }
  }, [list]);

  if (!list) return null;

  // Gem ændringerne i listen
  function handleSave() {
    if (!name.trim()) return;
    updateList(list.id, { name: name.trim(), emoji: emoji, color: color });
    onClose();
  }

// Slet liste
  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true); // bekræftelse 
      return;
    }
    deleteList(list.id);
    onClose();
    if (onDeleted) onDeleted();
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={() => {}}>
          <ScrollView>
            <Text style={styles.modalTitle}>Rediger liste</Text>

            <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Navn</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Listens navn" />

            <Text style={styles.sectionTitle}>Emoji</Text>
            <View style={styles.optionRow}>
              {listEmojis.map((e) => (
                <TouchableOpacity
                  key={e}
                  style={[styles.emojiOption, emoji === e && styles.emojiOptionSelected]}
                  onPress={() => setEmoji(e)}
                >
                  <Text style={styles.emojiText}>{e}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Farve</Text>
            <View style={styles.optionRow}>
              {listColors.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[styles.swatch, { backgroundColor: c }, color === c && styles.swatchSelected]}
                  onPress={() => setColor(c)}
                />
              ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Gem</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonDanger} onPress={handleDelete}>
              <Text style={styles.buttonText}>{confirmDelete ? "Tryk igen for at slette" : "Slet liste"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalClose} onPress={onClose}>
              <Text style={styles.modalCloseText}>Luk</Text>
            </TouchableOpacity>
          </ScrollView>
        </Pressable>
      </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}
