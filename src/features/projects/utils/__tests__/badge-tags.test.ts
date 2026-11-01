import { describe, expect, it } from "vitest";
import { TAG_ICONS } from "@/shared/icons";
import { getBadgeTags } from "../badge-tags";

const withIcon = Object.keys(TAG_ICONS);

describe("getBadgeTags", () => {
  it("descarta tags sin icono", () => {
    const tags = [{ name: withIcon[0] }, { name: "Encryption" }, { name: "AES" }];
    expect(getBadgeTags(tags)).toEqual([{ name: withIcon[0] }]);
  });

  it("descarta los lenguajes ya mostrados en LanguagesBar", () => {
    const tags = [{ name: withIcon[0] }, { name: withIcon[1] }];
    expect(getBadgeTags(tags, { [withIcon[0]]: 100 })).toEqual([{ name: withIcon[1] }]);
  });

  it("limita la cantidad de badges después de filtrar", () => {
    const tags = [{ name: "NoIcon" }, ...withIcon.slice(0, 6).map((name) => ({ name }))];
    expect(getBadgeTags(tags, {}, 4)).toEqual(withIcon.slice(0, 4).map((name) => ({ name })));
  });

  it("devuelve [] si ningún tag tiene icono", () => {
    expect(getBadgeTags([{ name: "Windows-xyz-unknown" }])).toEqual([]);
  });
});
