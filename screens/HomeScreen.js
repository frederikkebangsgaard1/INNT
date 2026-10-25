// Forsiden/dashboard
import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { useWatchlist, WATCHED_ID } from "../context/WatchlistContext";
import { styles } from "../styles/GlobalStyle";
import ListEditModal from "../components/ListEditModal";

export default function HomeScreen({ navigation }) {
  const { lists } = useWatchlist();
  const [showCreate, setShowCreate] = useState(false); // vis ny liste vindue

  const allItems = lists.flatMap((l) => l.items);
  const total = allItems.length;
  const watched = allItems.filter((i) => i.watched).length; // antal markeret som set
  const unwatched = total - watched;

  // Set-listen er ikke med her, den ligger i overblikket
  const myLists = lists.filter((l) => l.id !== WATCHED_ID);

  // Åbn den nye liste med det samme
  function handleCreated(newList) {
    navigation.navigate("Liste", { listId: newList.id, name: newList.name });
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Min Watchlist</Text>

      {/* Nøgletal */}
      <View style={styles.statRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{total}</Text>
          <Text style={styles.statLabel}>I alt</Text>
        </View>
        {/* Tryk på Set for at gå til Set-listen */}
        <Pressable
          style={styles.statCard}
          onPress={() => navigation.navigate("Liste", { listId: WATCHED_ID, name: "Set" })}
        >
          <Text style={styles.statNumber}>{watched}</Text>
          <Text style={styles.statLabel}>Set ›</Text>
        </Pressable>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{unwatched}</Text>
          <Text style={styles.statLabel}>Mangler</Text>
        </View>
      </View>

      {/* Dine lister + knap til ny liste */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Dine lister</Text>
        <TouchableOpacity onPress={() => setShowCreate(true)}>
          <Text style={styles.sectionAction}>+ Ny liste</Text>
        </TouchableOpacity>
      </View>

      {myLists.map((list) => (
        <Pressable
          key={list.id}
          style={[styles.listCard, styles.listCardBorder, { borderLeftColor: list.color }]}
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

      {/* Genvej til søgning */}
      <TouchableOpacity style={[styles.buttonSecondary, styles.spacedTop]} onPress={() => navigation.navigate("Søg")}>
        <Text style={styles.buttonSecondaryText}>Søg efter film</Text>
      </TouchableOpacity>

      {/* Opret ny liste (samme vindue som rediger) */}
      <ListEditModal
        visible={showCreate}
        list={null}
        onClose={() => setShowCreate(false)}
        onCreated={handleCreated}
      />
    </ScrollView>
  );
}
