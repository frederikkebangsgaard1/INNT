// Holder styr på alle lister et sted, så hver screen kan læse og ændre dem
// Listerne gemmes med AsyncStorage så de er der når appen åbnes igen
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { seedLists, WATCHED_ID } from "../data/seed";

export { WATCHED_ID };

// Nøgle til at gemme listerne
const STORAGE_KEY = "minwatchlist_lists";

const WatchlistContext = createContext(null);

// Er det samme film? (samme id og samme type film/serie)
function sameMovie(a, b) {
  return a.id === b.id && a.mediaType === b.mediaType;
}

// Flyt film fra en liste til en anden
function moveBetween(prev, fromId, toId, movie, patch) {
  const fromList = prev.find((l) => l.id === fromId);
  const existing = fromList ? fromList.items.find((m) => sameMovie(m, movie)) : null;
  const moved = { ...(existing || movie), ...patch };

  return prev.map((list) => {
    if (list.id === fromId) {
      return { ...list, items: list.items.filter((m) => !sameMovie(m, movie)) };
    }
    if (list.id === toId) {
      if (list.items.some((m) => sameMovie(m, moved))) return list; // undgå dobbelte
      return { ...list, items: [...list.items, moved] };
    }
    return list;
  });
}

export function WatchlistProvider({ children }) {
  const [lists, setLists] = useState(seedLists);
  const [loaded, setLoaded] = useState(false); // er listerne hentet?

  // Hent gemte lister når appen starter
  useEffect(() => {
    async function load() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setLists(JSON.parse(saved)); // laver tekst om til objekt
      } catch (e) {
        console.log("Kunne ikke hente lister", e);
      }
      setLoaded(true);
    }
    load();
  }, []);

  // Gem listerne hver gang de ændres
  // venter til de er hentet, så start-listerne ikke overskriver dem
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lists)).catch((e) =>
      console.log("Kunne ikke gemme lister", e)
    );
  }, [lists, loaded]);

  // Opret en ny liste. Returnerer den, så vi kan lægge en film i den med det samme.
  function createList(name, emoji, color) {
    if (!name) return null;
    const newList = {
      id: Date.now().toString(),
      name: name,
      emoji: emoji || "🎬",
      color: color || "#114B5F",
      items: [],
    };
    setLists((prev) => [...prev, newList]);
    return newList;
  }

  // Ret navn, emoji eller farve på en liste
  function updateList(listId, patch) {
    setLists((prev) => prev.map((l) => (l.id === listId ? { ...l, ...patch } : l)));
  }

  // Slet en liste 
  function deleteList(listId) {
    setLists((prev) => prev.filter((l) => l.id !== listId || l.isSystem));
  }

  // Tilføj en film til liste
  function addToList(listId, movie) {
    setLists((prev) =>
      prev.map((list) => {
        if (list.id !== listId) return list;
        if (list.items.some((m) => sameMovie(m, movie))) return list;
        return { ...list, items: [...list.items, { ...movie, watched: false }] };
      })
    );
  }

  // Fjern en film helt fra liste
  function removeFromList(listId, movie) {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? { ...list, items: list.items.filter((m) => !sameMovie(m, movie)) }
          : list
      )
    );
  }

  // Flyt en film til en anden liste
  function moveItem(fromListId, toListId, movie) {
    if (fromListId === toListId) return;
    setLists((prev) =>
      moveBetween(prev, fromListId, toListId, movie, { watched: false, originListId: undefined })
    );
  }

  // Marker set/ikke set
  // "Set" flytter filmen til Set-listen, "ikke set" flytter den tilbage til den liste den kom fra
  function toggleWatched(currentListId, movie) {
    setLists((prev) => {
      const fromWatched = currentListId === WATCHED_ID;
      let targetId;
      let patch;

      if (fromWatched) {
        const originExists = movie.originListId && prev.find((l) => l.id === movie.originListId); // hvis listen stadig findes, flyt tilbage til den
        const firstNormal = prev.find((l) => l.id !== WATCHED_ID);
        targetId = originExists ? movie.originListId : firstNormal ? firstNormal.id : null;
        patch = { watched: false, originListId: undefined };
      } else {
        targetId = WATCHED_ID;
        patch = { watched: true, originListId: currentListId }; // husk hvor den kom fra, så vi kan flytte tilbage
      }

      if (!targetId) return prev;
      return moveBetween(prev, currentListId, targetId, movie, patch);
    });
  }

  const value = {
    lists,
    createList,
    updateList,
    deleteList,
    addToList,
    removeFromList,
    moveItem,
    toggleWatched,
  };

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}
