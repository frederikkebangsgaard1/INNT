import {
  StyleSheet
} from "react-native";

export const colors = {
  primary: "#114B5F",
  primaryDark: "#0C3543",
  accent: "#E6A532",
  bg: "#F3F4F5",
  card: "#FFFFFF",
  text: "#1C2B31",
  muted: "#7C8A90",
  watched: "#E6A532",
  unwatched: "#D9DDDF",
  danger: "#C5573C",
  border: "#E6EAEB",
};

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg
  },
  content: {
    padding: 16
  },
  detailContent: {
    padding: 16,
    alignItems: "center"
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border
  },

  row: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border
  },
  rowInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center"
  },
  rowButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8
  },

  poster: {
    width: 60,
    height: 90,
    borderRadius: 8,
    backgroundColor: colors.unwatched
  },
  posterLarge: {
    width: 180,
    height: 270,
    borderRadius: 12,
    backgroundColor: colors.unwatched,
    marginBottom: 16
  },
  posterPlaceholder: {
    alignItems: "center",
    justifyContent: "center"
  },
  posterPlaceholderText: {
    color: "#fff",
    fontWeight: "600"
  },

  movieTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text
  },
  movieMeta: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 2
  },

  detailTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: 4
  },
  overview: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginVertical: 16,
    textAlign: "center"
  },

  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
    alignSelf: "stretch"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15
  },
  buttonSecondary: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
    borderWidth: 1,
    borderColor: colors.primary
  },
  buttonSecondaryText: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 15
  },
  buttonDanger: {
    backgroundColor: colors.danger,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
    alignSelf: "stretch"
  },

  smallButton: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginRight: 8,
    marginBottom: 6
  },
  smallButtonNeutral: {
    backgroundColor: colors.muted,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginRight: 8,
    marginBottom: 6
  },
  smallButtonDanger: {
    backgroundColor: colors.danger,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginRight: 8,
    marginBottom: 6
  },
  smallButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 10,
    backgroundColor: "#fff"
  },

  searchBar: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center"
  },
  // Søgefelt og kryds i samme boks
  searchInputWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15
  },
  clearButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.unwatched,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.muted
  },
  searchButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },

  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.border
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary
  },
  statLabel: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 4
  },

  barTrack: {
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.unwatched,
    overflow: "hidden"
  },
  barFill: {
    height: "100%",
    backgroundColor: colors.watched
  },

  listCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border
  },
  listCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  listEmoji: {
    fontSize: 22,
    marginRight: 12
  },
  editBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  editBtnText: {
    fontSize: 18,
    color: colors.muted
  },
  chevron: {
    fontSize: 22,
    color: colors.muted
  },

  badge: {
    alignSelf: "flex-start",
    fontSize: 12,
    fontWeight: "600",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
    overflow: "hidden",
    marginTop: 4
  },
  badgeWatched: {
    backgroundColor: colors.watched,
    color: colors.primaryDark
  },
  badgeUnwatched: {
    backgroundColor: colors.unwatched,
    color: colors.text
  },

  emptyText: {
    textAlign: "center",
    color: colors.muted,
    marginTop: 40,
    fontSize: 15
  },

  // Vores egne menuer (i stedet for Apples standard-menu)
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 24
  },
  modalCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 18,
    maxHeight: "85%"
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 2,
    marginBottom: 12
  },
  modalListRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: colors.bg,
    marginBottom: 8
  },
  modalListName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text
  },
  modalListCount: {
    fontSize: 13,
    color: colors.muted
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 14
  },
  modalClose: {
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 4
  },
  modalCloseText: {
    color: colors.muted,
    fontWeight: "600",
    fontSize: 15
  },

  // Rediger-liste menu
  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8
  },
  swatch: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "transparent"
  },
  swatchSelected: {
    borderColor: colors.text
  },
  emojiOption: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "transparent"
  },
  emojiOptionSelected: {
    borderColor: colors.primary
  },
  emojiText: {
    fontSize: 20
  },

  // Styles fra App.js og ListScreen
  tabIcon: {
    fontSize: 18
  },
  headerButton: {
    paddingHorizontal: 6
  },
  headerButtonText: {
    color: "#fff",
    fontSize: 26
  },

  // Hjælpe-styles
  flex1: {
    flex: 1
  },
  fullWidth: {
    alignSelf: "stretch"
  },
  spacedTop: {
    marginTop: 12
  },
  spacedBottom: {
    marginBottom: 12
  },
  smallButtonSpaced: {
    marginTop: 8
  },
  loader: {
    marginTop: 20
  },

  listCardBorder: {
    borderLeftWidth: 5
  },

  // Detaljer: ekstra info
  detailInfo: {
    fontSize: 13,
    color: colors.muted,
    textAlign: "center",
    marginTop: 6
  },

  // Forside: Dine lister + ny liste
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  sectionAction: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 8
  },

  // Anbefalinger
  recoIntro: {
    fontSize: 15,
    color: colors.muted,
    marginBottom: 12
  },
});