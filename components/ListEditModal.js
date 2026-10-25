// Rediger eller slet en liste. Bruges også til at oprette en ny liste
import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, Pressable, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useWatchlist } from "../context/WatchlistContext";
import { styles, colors } from "../styles/GlobalStyle";
import { listColors, listEmojis } from "../data/options";

// modal til at redigere en liste: navn, emoji og farve
export default function ListEditModal({ visible, list, onClose, onDeleted, onCreated }) {
  const { updateList, deleteList, createList } = useWatchlist();
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("🎬");
  const [color, setColor] = useState(colors.primary);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isNew = !list; // ingen liste = ny liste

  // Udfyld felterne når vinduet åbner (tomme hvis det er en ny liste)
  React.useEffect(() => {
    if (!visible) return;
    setName(list ? list.name : "");
    setEmoji(list ? list.emoji || "🎬" : "🎬");
    setColor(list ? list.color || colors.primary : colors.primary);
    setConfirmDelete(false);
  }, [list, visible]);

  // Opret ny liste eller gem ændringer
  function handleSave() {
    if (!name.trim()) return;
    if (isNew) {
      const newList = createList(name.trim(), emoji, color);
      onClose();
      if (newList && onCreated) onCreated(newList);
    } else {
      updateList(list.id, { name: name.trim(), emoji: emoji, color: color });
      onClose();
    }
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
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.flex1}>
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={() => {}}>
          <ScrollView>
            <Text style={styles.modalTitle}>{isNew ? "Ny liste" : "Rediger liste"}</Text>

            <Text style={[styles.sectionTitle, styles.spacedTop]}>Navn</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder={isNew ? "Fx Gyser eller Fredagsfilm" : "Listens navn"}
              autoFocus={isNew}
            />

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
              <Text style={styles.buttonText}>{isNew ? "Opret liste" : "Gem"}</Text>
            </TouchableOpacity>

            {/* Slet knap kun hvis listen findes i forvejen */}
            {!isNew && (
              <TouchableOpacity style={styles.buttonDanger} onPress={handleDelete}>
                <Text style={styles.buttonText}>{confirmDelete ? "Tryk igen for at slette" : "Slet liste"}</Text>
              </TouchableOpacity>
            )}

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
