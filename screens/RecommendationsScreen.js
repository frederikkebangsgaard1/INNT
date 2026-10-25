// Anbefalinger: viser film/serier der ligner den man kigger på
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Pressable, ActivityIndicator } from "react-native";
import { getRecommendations } from "../api/tmdb";
import { useWatchlist } from "../context/WatchlistContext";
import { styles, colors } from "../styles/GlobalStyle";
import AddToListModal from "../components/AddToListModal";

export default function RecommendationsScreen({ route, navigation }) {
  const { movie } = route.params; // filmen anbefalingerne er ud fra
  const { lists } = useWatchlist();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState(null); // filmen der er ved at tilføje

  // Hent anbefalinger når skærmen åbner
  useEffect(() => {
    async function load() {
      try {
        const found = await getRecommendations(movie);
        setResults(found);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    }
    load();
  }, [movie]);

  // Tjek om titlen allerede er på en liste
  function isOnMyLists(item) {
    return lists.some((list) =>
      list.items.some((m) => m.id === item.id && m.mediaType === item.mediaType)
    );
  }

  function renderItem({ item }) {
    const onList = isOnMyLists(item);
    return (
      // push så man kan klikke videre fra anbefaling til anbefaling
      <Pressable style={styles.row} onPress={() => navigation.push("Detaljer", { movie: item })}>
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
            {item.rating ? " · ⭐ " + item.rating : ""}
          </Text>
          {onList ? (
            <Text style={[styles.badge, styles.badgeWatched]}>På din liste</Text>
          ) : (
            <TouchableOpacity style={[styles.smallButton, styles.smallButtonSpaced]} onPress={() => setSelected(item)}>
              <Text style={styles.smallButtonText}>Tilføj</Text>
            </TouchableOpacity>
          )}
        </View>
      </Pressable>
    );
  }

  if (loading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator style={styles.loader} color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={results}
        keyExtractor={(item) => item.mediaType + "-" + item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <Text style={styles.recoIntro}>Hvis du kan lide {movie.title}, så prøv:</Text>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {error ? "Kunne ikke hente anbefalinger. Tjek din internetforbindelse." : "Ingen anbefalinger fundet."}
          </Text>
        }
      />

      <AddToListModal visible={!!selected} movie={selected} onClose={() => setSelected(null)} />
    </View>
  );
}
