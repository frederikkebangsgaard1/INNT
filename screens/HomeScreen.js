// Forsiden/dashboard
import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, Pressable } from "react-native";
import { useWatchlist } from "../context/WatchlistContext";
import { styles } from "../styles/GlobalStyle";

export default function HomeScreen({ navigation }) {
  const { lists, createList } = useWatchlist();
  const [newName, setNewName] = useState("");

  const allItems = lists.flatMap((l) => l.items);
  const total = allItems.length;
  const watched = allItems.filter((i) => i.watched).length; // antal markeret som set
  const unwatched = total - watched;
  const pct = total ? Math.round((watched / total) * 100) : 0;

  // Opret en ny liste ud fra teksten i feltet
  function handleCreate() {
    createList(newName.trim());
    setNewName("");
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      automaticallyAdjustKeyboardInsets={true}
    >
      <Text style={styles.title}>Min Watchlist</Text>

      {/* Nøgletal */}
      <View style={styles.statRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{total}</Text>
          <Text style={styles.statLabel}>I alt</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{watched}</Text>
          <Text style={styles.statLabel}>Set</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{unwatched}</Text>
          <Text style={styles.statLabel}>Mangler</Text>
        </View>
      </View>

      {/* Dine lister */}
      <Text style={styles.sectionTitle}>Dine lister</Text>
      {lists.map((list) => (
        <Pressable
          key={list.id}
          style={[styles.listCard, { borderLeftWidth: 5, borderLeftColor: list.color }]}
          onPress={() => navigation.navigate("Liste", { listId: list.id, name: list.name })}
        >
          <View style={styles.listCardLeft}>
            <Text style={styles.listEmoji}>{list.emoji}</Text>
            <View>
              <Text style={styles.movieTitle}>{list.name}</Text>
              <Text style={styles.movieMeta}>{list.items.length} titler</Text>
            </View>
          </View>
          <Text style={styles.chevron}>{"›"}</Text>
        </Pressable>
      ))}

      {/* Opret ny liste */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Opret ny liste</Text>
        <TextInput
          style={styles.input}
          placeholder="Fx Gyser eller Fredagsfilm"
          value={newName}
          onChangeText={setNewName}
        />
        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Opret liste</Text>
        </TouchableOpacity>
      </View>

      {/* Genvej til søgning */}
      <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate("Søg")}>
        <Text style={styles.buttonSecondaryText}>Søg efter film</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
