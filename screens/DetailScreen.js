// Detaljer om film/serie. Kan åbnes både fra søgning eller fra en liste
import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useWatchlist } from "../context/WatchlistContext";
import { styles } from "../styles/GlobalStyle";
import AddToListModal from "../components/AddToListModal";

export default function DetailScreen({ route }) {
  const { movie, listId } = route.params;
  const { lists, toggleWatched, removeFromList } = useWatchlist();
  const [showAdd, setShowAdd] = useState(false);

  // Hvis vi kom fra en liste, find den "levende" version så set-status er korrekt
  let liveMovie = movie;
  if (listId) {
    const list = lists.find((l) => l.id === listId);
    const found = list && list.items.find((m) => m.id === movie.id && m.mediaType === movie.mediaType);
    if (found) liveMovie = found;
  }

  // Render detaljeskærm med forside, titel, år, rating, beskrivelse og knapper til at tilføje/fjerne/flytte$
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.detailContent}>
      {liveMovie.poster ? (
        <Image source={{ uri: liveMovie.poster }} style={styles.posterLarge} />
      ) : (
        <View style={[styles.posterLarge, styles.posterPlaceholder]}>
          <Text style={styles.posterPlaceholderText}>Ingen forside</Text>
        </View>
      )}

      <Text style={styles.detailTitle}>{liveMovie.title}</Text>
      <Text style={styles.movieMeta}>
        {liveMovie.mediaType === "tv" ? "Serie" : "Film"}
        {liveMovie.year ? " · " + liveMovie.year : ""}
        {liveMovie.rating ? " · ⭐ " + liveMovie.rating : ""}
      </Text>
      <Text style={styles.overview}>
        {liveMovie.overview ? liveMovie.overview : "Ingen beskrivelse tilgængelig."}
      </Text>

      {/* Kom vi fra en liste: vis set/fjern. Ellers: vis tilføj-knap */}
      {listId ? (
        <View style={{ alignSelf: "stretch" }}>
          <TouchableOpacity style={styles.button} onPress={() => toggleWatched(listId, liveMovie)}>
            <Text style={styles.buttonText}>{liveMovie.watched ? "Marker som ikke set" : "Marker som set"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDanger} onPress={() => removeFromList(listId, liveMovie)}>
            <Text style={styles.buttonText}>Fjern fra liste</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => setShowAdd(true)}>
          <Text style={styles.buttonText}>Tilføj til liste</Text>
        </TouchableOpacity>
      )}

      <AddToListModal visible={showAdd} movie={movie} onClose={() => setShowAdd(false)} />
    </ScrollView>
  );
}
