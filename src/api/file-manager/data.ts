import { subDays, subHours, subMinutes } from "date-fns";
import type { Item } from "src/types/file-manager";

const now = new Date();

export const items: Item[] = [
  {
    id: "719a07ce8e46dee2388d411c",
    author: {
      avatar: "/assets/avatars/avatar-alcides-antonio.png",
      name: "Alcides Antonio",
    },
    createdAt: subMinutes(now, 15).getTime(),
    isFavorite: false,
    isPublic: false,
    items: [],
    itemsCount: 12,
    name: "AWS Credentials",
    shared: [
      {
        avatar: "/assets/avatars/avatar-anika-visser.png",
        name: "Anika Visser",
      },
      {
        avatar: "/assets/avatars/avatar-miron-vitold.png",
        name: "Miron Vitold",
      },
    ],
    size: 528381242,
    tags: ["Business", "Work", "Homework", "Cats", "Holiday", "Friends"],
    type: "folder",
    updatedAt: null,
  },
];
