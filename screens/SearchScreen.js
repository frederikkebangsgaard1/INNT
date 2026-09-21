// Søg efter film og serier via TMDB og tilføj dem til en liste.
import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, Pressable, ActivityIndicator, Alert } from "react-native";
import { searchTitles } from "../api/tmdb";
import { styles, colors } from "../styles/GlobalStyle";
import AddToListModal from "../components/AddToListModal";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null); // filmen der er ved at tilføje

  // Søg på TMDB og gem resultaterne i state
  async function handleSearch() {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const found = await searchTitles(query.trim());
      setResults(found);
    } catch (e) {
      Alert.alert("Fejl", "Kunne ikke hente resultater. Tjek din internetforbindelse.");
    }
    setLoading(false);
  }

  // Visning af en film i søreresultater. og tryk for at se detaljer
  function renderItem({ item }) {
    return (
      <Pressable style={styles.row} onPress={() => navigation.navigate("Detaljer", { movie: item })}>
        {item.poster ? (
          <Image source={{ uri: item.poster }} style={styles.poster} />
        ) : (
          <View style={[styles.poster, styles.posterPlaceholder]}>
            <Text style={styles.posterPlaceholderText}>?</Text>
          </View>
        )}
        <View style={styles.rowInfo}>
          <Text style={styles.movieTitle}>{item.title}</Text>
          <Text style={styles.movieMeta}>
            {item.mediaType === "tv" ? "Serie" : "Film"}
            {item.year ? " · " + item.year : ""}
          </Text>
          <TouchableOpacity style={styles.smallButton} onPress={() => setSelected(item)}>
            <Text style={styles.smallButtonText}>Tilføj</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Søg efter film eller serie"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Søg</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} color={colors.primary} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.mediaType + "-" + item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.content}
          ListEmptyComponent={<Text style={styles.emptyText}>Søg for at finde film og serier.</Text>}
        />
      )}

      <AddToListModal visible={!!selected} movie={selected} onClose={() => setSelected(null)} />
    </View>
  );
}
