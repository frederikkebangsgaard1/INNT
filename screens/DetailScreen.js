// Detaljer om film/serie. Kan åbnes fra søgning, liste eller anbefalinger
import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useWatchlist } from "../context/WatchlistContext";
import { getDetails } from "../api/tmdb";
import { confirmRemove } from "../utils/dialogs";
import { styles } from "../styles/GlobalStyle";
import AddToListModal from "../components/AddToListModal";

// Laver minutter om til timer og min
function formatRuntime(minutes) {
  if (!minutes) return "";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? h + " t " + m + " min" : m + " min";
}

export default function DetailScreen({ route, navigation }) {
  const { movie, listId } = route.params;
  const { lists, toggleWatched, removeFromList } = useWatchlist();
  const [showAdd, setShowAdd] = useState(false);
  const [details, setDetails] = useState(null); // mere info fra TMDB

  // Hent mere info når skærmen åbner
  useEffect(() => {
    getDetails(movie)
      .then(setDetails)
      .catch(() => setDetails(null));
  }, [movie]);

  // Hvis vi kom fra en liste, find den "levende" version så set-status er korrekt
  let liveMovie = movie;
  if (listId) {
    const list = lists.find((l) => l.id === listId);
    const found = list && list.items.find((m) => m.id === movie.id && m.mediaType === movie.mediaType);
    if (found) liveMovie = found;
  }

  // Fjern film, spørg først
  function handleRemove() {
    confirmRemove(liveMovie.title, () => {
      removeFromList(listId, liveMovie);
      navigation.goBack(); // tilbage til listen
    });
  }

  // Linje med varighed/sæsoner og genrer
  let infoLine = "";
  if (details) {
    const parts = [];
    if (details.runtime) parts.push(formatRuntime(details.runtime) + (liveMovie.mediaType === "tv" ? " pr. afsnit" : ""));
    if (details.seasons) parts.push(details.seasons + (details.seasons === 1 ? " sæson" : " sæsoner"));
    if (details.genres.length > 0) parts.push(details.genres.join(", "));
    infoLine = parts.join(" · ");
  }

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

      {/* Varighed, genrer og skuespillere */}
      {infoLine ? <Text style={styles.detailInfo}>{infoLine}</Text> : null}
      {details && details.cast.length > 0 ? (
        <Text style={styles.detailInfo}>Medvirkende: {details.cast.join(", ")}</Text>
      ) : null}

      <Text style={styles.overview}>
        {liveMovie.overview ? liveMovie.overview : "Ingen beskrivelse tilgængelig."}
      </Text>

      {/* Kom vi fra en liste: vis set/fjern. Ellers: vis tilføj-knap */}
      {listId ? (
        <View style={styles.fullWidth}>
          <TouchableOpacity style={styles.button} onPress={() => toggleWatched(listId, liveMovie)}>
            <Text style={styles.buttonText}>{liveMovie.watched ? "Marker som ikke set" : "Marker som set"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDanger} onPress={handleRemove}>
            <Text style={styles.buttonText}>Fjern fra liste</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => setShowAdd(true)}>
          <Text style={styles.buttonText}>Tilføj til liste</Text>
        </TouchableOpacity>
      )}

      {/* Knap til anbefalinger */}
      <TouchableOpacity
        style={[styles.buttonSecondary, styles.fullWidth, styles.spacedTop]}
        onPress={() => navigation.push("Anbefalinger", { movie: liveMovie })}
      >
        <Text style={styles.buttonSecondaryText}>✨ Se lignende titler</Text>
      </TouchableOpacity>

      <AddToListModal visible={showAdd} movie={movie} onClose={() => setShowAdd(false)} />
    </ScrollView>
  );
}
