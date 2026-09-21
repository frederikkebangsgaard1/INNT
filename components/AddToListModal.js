// menu til at tilføje en film til en liste, eller flytte den til en anden liste. Man kan også oprette en ny liste med det samme
import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, Pressable, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useWatchlist, WATCHED_ID } from "../context/WatchlistContext";
import { styles } from "../styles/GlobalStyle";

export default function AddToListModal({ visible, movie, onClose, mode = "add", currentListId }) {
  const { lists, addToList, createList, moveItem } = useWatchlist();
  const [newName, setNewName] = useState("");

  if (!movie) return null;

  const isMove = mode === "move";

  // Lister man kan vælge: aldrig "Set-liste", og ved flyt heller ikke listen man står i
  const targetLists = lists.filter(
    (l) => l.id !== WATCHED_ID && (!isMove || l.id !== currentListId) 
  );

  function choose(listId) {
    if (isMove) moveItem(currentListId, listId, movie);
    else addToList(listId, movie);
    onClose();
  }

  // Opret en ny liste og tilføj/flyt filmen til den
  function handleCreate() {
    const name = newName.trim();
    if (!name) return;
    const newList = createList(name);
    if (newList) {
      if (isMove) moveItem(currentListId, newList.id, movie);
      else addToList(newList.id, movie);
    }
    setNewName("");
    onClose();
  }

  // Render modal med lister og input til ny liste
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={() => {}}>
          <Text style={styles.modalTitle}>{isMove ? "Flyt til liste" : "Tilføj til liste"}</Text>
          <Text style={styles.modalSubtitle}>{movie.title}</Text>

          <ScrollView>
            {targetLists.map((list) => (
              <TouchableOpacity key={list.id} style={styles.modalListRow} onPress={() => choose(list.id)}>
                <Text style={styles.modalListName}>
                  {list.emoji ? list.emoji + "  " : ""}
                  {list.name}
                </Text>
                <Text style={styles.modalListCount}>{list.items.length}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Opret ny liste</Text>
          <TextInput
            style={styles.input}
            placeholder="Fx Gyser eller Fredagsfilm"
            value={newName}
            onChangeText={setNewName}
          />
          <TouchableOpacity style={styles.button} onPress={handleCreate}>
            <Text style={styles.buttonText}>{isMove ? "Opret og flyt" : "Opret og tilføj"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modalClose} onPress={onClose}>
            <Text style={styles.modalCloseText}>Luk</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}
