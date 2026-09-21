// Viser filmene i liste
import React, { useState, useLayoutEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Pressable } from "react-native";
import { useWatchlist, WATCHED_ID } from "../context/WatchlistContext";
import { styles, colors } from "../styles/GlobalStyle";
import AddToListModal from "../components/AddToListModal";
import ListEditModal from "../components/ListEditModal";

export default function ListScreen({ route, navigation }) {
  const { listId } = route.params;
  const { lists, toggleWatched, removeFromList } = useWatchlist();
  const [moveMovie, setMoveMovie] = useState(null);
  const [editVisible, setEditVisible] = useState(false);

  const list = lists.find((l) => l.id === listId);
  const isWatchedList = listId === WATCHED_ID;

  // overskrift, farve og en rediger knap i toppen
  useLayoutEffect(() => {
    if (list) {
      navigation.setOptions({
        title: (list.emoji ? list.emoji + " " : "") + list.name,
        headerStyle: { backgroundColor: list.color || colors.primary },
        headerTintColor: "#fff",
        headerRight: isWatchedList
          ? undefined
          : () => (
              <TouchableOpacity onPress={() => setEditVisible(true)} style={{ paddingHorizontal: 6 }}> 
                <Text style={{ color: "#fff", fontSize: 26 }}>{"⋯"}</Text>
              </TouchableOpacity>
            ),
      });
    }
  }, [navigation, list, isWatchedList]);

  if (!list) {
    return (
      <View style={styles.screen}>
        <Text style={styles.emptyText}>Listen findes ikke.</Text>
      </View>
    );
  }

  // Visning af film i listen
  function renderItem({ item }) {
    return (
      <Pressable style={styles.row} onPress={() => navigation.navigate("Detaljer", { movie: item, listId: listId })}>
        {item.poster ? (
          <Image source={{ uri: item.poster }} style={styles.poster} />
        ) : (
          <View style={[styles.poster, styles.posterPlaceholder]}>
            <Text style={styles.posterPlaceholderText}>?</Text>
          </View>
        )}
        <View style={styles.rowInfo}>
          <Text style={styles.movieTitle}>{item.title}</Text>
          <Text style={[styles.badge, item.watched ? styles.badgeWatched : styles.badgeUnwatched]}>
            {item.watched ? "Set" : "Ikke set"}
          </Text>
          <View style={styles.rowButtons}>
            <TouchableOpacity style={styles.smallButton} onPress={() => toggleWatched(listId, item)}>
              <Text style={styles.smallButtonText}>{isWatchedList ? "Marker ikke set" : "Marker set"}</Text>
            </TouchableOpacity>
            {!isWatchedList && (
              <TouchableOpacity style={styles.smallButtonNeutral} onPress={() => setMoveMovie(item)}>
                <Text style={styles.smallButtonText}>Flyt</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.smallButtonDanger} onPress={() => removeFromList(listId, item)}>
              <Text style={styles.smallButtonText}>Fjern</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={list.items}
        keyExtractor={(item) => item.mediaType + "-" + item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {isWatchedList ? "Ingen film set  endnu." : "Listen er tom. Gå til Søg og tilføj noget :)"}
          </Text>
        }
      />

      <AddToListModal
        visible={!!moveMovie}
        movie={moveMovie}
        mode="move"
        currentListId={listId}
        onClose={() => setMoveMovie(null)}
      />

      <ListEditModal
        visible={editVisible}
        list={list}
        onClose={() => setEditVisible(false)}
        onDeleted={() => navigation.goBack()}
      />
    </View>
  );
}
