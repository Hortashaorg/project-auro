import { db } from "../index";

const populateDBData = async () => {
  try {
    await db.transaction().execute(async (trx) => {
      await trx.deleteFrom("asset").execute();
      // Populate Assets
      await trx
        .insertInto("asset")
        .values([
          {
            name: "Woodcutting",
            type: "skill",
            url: "https://gameweb3.blob.core.windows.net/images/skill_woodcutting.png",
          },
          {
            name: "Fishing",
            type: "skill",
            url: "https://gameweb3.blob.core.windows.net/images/skill_fishing.png",
          },
          {
            name: "Basic Woods",
            type: "assignment",
            url: "https://gameweb3.blob.core.windows.net/images/normal_nonthreatning_forrest.png",
          },
          {
            name: "Basic Field",
            type: "assignment",
            url: "https://gameweb3.blob.core.windows.net/images/normal_field.png",
          },
          {
            name: "Male basic character",
            type: "character",
            url: "https://gameweb3.blob.core.windows.net/images/male_iron_armor.png",
          },
          {
            name: "Female basic character",
            type: "character",
            url: "https://gameweb3.blob.core.windows.net/images/woman_iron_armor.png",
          },
          {
            name: "Ice Fire Sword",
            type: "item",
            url: "https://gameweb3.blob.core.windows.net/images/sword_legendary_ice.png",
          },
          {
            name: "Bag of Coins",
            type: "resource",
            url: "https://gameweb3.blob.core.windows.net/images/resource_bag_coins.png",
          },
          {
            name: "Bag of Coal",
            type: "resource",
            url: "https://gameweb3.blob.core.windows.net/images/resource_bag_of_coal.png",
          },
          {
            name: "Chest of Gold",
            type: "resource",
            url: "https://gameweb3.blob.core.windows.net/images/resource_chest_gold.png",
          },
          {
            name: "Gold Bar",
            type: "resource",
            url: "https://gameweb3.blob.core.windows.net/images/resource_gold_bar.png",
          },
          {
            name: "Stack of Gold Bars",
            type: "resource",
            url: "https://gameweb3.blob.core.windows.net/images/resource_gold_bars.png",
          },
          {
            name: "Pile of Metal Bars",
            type: "resource",
            url: "https://gameweb3.blob.core.windows.net/images/resource_metal_bars.png",
          },
          {
            name: "Purse of Coins",
            type: "resource",
            url: "https://gameweb3.blob.core.windows.net/images/resource_purse_coins.png",
          },
          {
            name: "Rich Rubble",
            type: "resource",
            url: "https://gameweb3.blob.core.windows.net/images/resource_rich_rubble.png",
          },
          {
            name: "Rubble",
            type: "resource",
            url: "https://gameweb3.blob.core.windows.net/images/resource_rubble.png",
          },
          {
            name: "Block of Stone",
            type: "resource",
            url: "https://gameweb3.blob.core.windows.net/images/resource_stone.png",
          },
          {
            name: "Bunch of Twigs and Branches",
            type: "resource",
            url: "https://gameweb3.blob.core.windows.net/images/resource_twigs_branches.png",
          },
          {
            name: "Wooden Logs",
            type: "resource",
            url: "https://gameweb3.blob.core.windows.net/images/resource_wood_logs.png",
          },
          {
            name: "Rubies",
            type: "resource",
            url: "https://gameweb3.blob.core.windows.net/images/resources_robuies.png",
          },
        ])
        .execute();
    });
  } catch (error) {
    console.log(error);
    process.exit(0);
  } finally {
    console.log("DB populated!");
    process.exit(0);
  }
};
await populateDBData();
