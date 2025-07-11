import { world } from "@minecraft/server";
const advancements = [
    {
        name: "Getting an Upgrade!",
        item: "minecraft:stone_pickaxe",
        requiredAmount: 1,
        tag: "stone_pickaxe",
        title: "stone_pickaxe",
        epic: false,
    },
    {
        name: "Aquire Hardware!",
        item: "minecraft:iron_ingot",
        requiredAmount: 1,
        tag: "iron_ingot",
        title: "iron_ingot",
        epic: false,
    },
    {
        name: "Hot Stuff!",
        item: "minecraft:lava_bucket",
        requiredAmount: 1,
        tag: "lava_bucket",
        title: "lava_bucket",
        epic: false,
    },
    {
        name: "Suit Up!",
        item: "minecraft:iron_chestplate",
        requiredAmount: 1,
        tag: "iron_chestplate",
        title: "iron_chestplate",
        epic: false,
    },
    {
        name: "Isn't It Iron Pick!",
        item: "minecraft:iron_pickaxe",
        requiredAmount: 1,
        tag: "iron_pickaxe",
        title: "iron_pickaxe",
        epic: false,
    },
    {
        name: "Ice Bucket Challenge!",
        item: "minecraft:obsidian",
        requiredAmount: 1,
        tag: "obsidian",
        title: "obsidian",
        epic: false,
    },
    {
        name: "Diamonds!",
        item: "minecraft:diamond",
        requiredAmount: 1,
        tag: "diamond",
        title: "diamond",
        epic: false,
    },
    {
        name: "Cover me with Diamonds!",
        item: "minecraft:diamond_chestplate",
        requiredAmount: 1,
        tag: "diamond_chestplate",
        title: "diamond_chestplate",
        epic: false,
    },
    {
        name: "Enchanter!",
        item: "minecraft:enchanted_book",
        requiredAmount: 1,
        tag: "enchanted_book",
        title: "enchanted_book",
        epic: true,
    },
    {
        name: "Zombie Doc!",
        item: "minecraft:golden_apple",
        requiredAmount: 1,
        tag: "golden_apple",
        title: "golden_apple",
        epic: false,
    },
    {
        name: "Eye Spy!",
        item: "minecraft:ender_eye",
        requiredAmount: 1,
        tag: "ender_eye",
        title: "ender_eye",
        epic: true,
    },
    {
        name: "Bee Our Guest!",
        item: "minecraft:honey_bottle",
        requiredAmount: 1,
        tag: "honey_bottle",
        title: "honey_bottle",
        epic: false,
    },
    {
        name: "BFF!",
        item: "minecraft:lead",
        requiredAmount: 1,
        tag: "lead",
        title: "lead",
        epic: false,
    },
];

let tick = 0;
/** @param { import("@minecraft/server").Player } player */
export function getItems(player) {
    if (tick < 20) {
        tick++;
        return;
    }
    else tick = 0;

    const inventory = player.getComponent("inventory").container;
    for (let slot = 0; slot < inventory.size; slot++) {
        const itemStack = inventory.getItem(slot);
        if (itemStack === undefined)
            continue;

        const advancement = advancements.find(
            (a) =>
                itemStack.typeId == a.item
                && itemStack.amount >= a.requiredAmount
                && !player.hasTag(a.tag)
        );

        if (advancement == undefined)
            continue;

        world.sendMessage({
            translate: "genlabs.message.achievementMade",
            with: [
                player.name,
                (advancement.epic ? "§u" : "§e") + advancement.name
            ],
        });

        player.addTag(advancement.tag);
        player.onScreenDisplay.setTitle(advancement.title);
    };
};