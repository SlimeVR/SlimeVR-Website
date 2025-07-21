export interface Contributor {
  name: string;
  roles: ("dev" | "artist" | "community")[];
  colors?: {
    background?: string;
    border?: string;
  };
  socials: {
    twitter?: string;
    bluesky?: string;
    github?: string;
    instagram?: string;
    youtube?: string;
    website?: string;
    twitch?: string;
    kofi?: string;
    discord?: string;
    tiktok?: string;
    printables?: string;
    steam?: string;
    matrix?: string;
  };
  tags: string[];
  classes?: string;
}

// TODO: get transparent version for em

export const contributors: Contributor[] = [
  {
    name: "Butterscotch",
    roles: ["dev", "community"],
    colors: {
      background: "#e18400",
      border: "#e18400",
    },
    socials: {
      github: "https://github.com/ButterscotchV/",
    },
    tags: ["#skunk", "#creature", "#programmer", "#cowboy"],
    classes: "ml-5 !scale-[85%]",
  },
  {
    name: "loucass003",
    roles: ["dev"],
    colors: {
      background: "#ffe276",
      border: "#ffe276",
    },
    socials: {
      github: "https://github.com/loucass003",
    },
    tags: ["#programmer", "#french"],
    classes: "-mt-5 !scale-[115%]",
  },
  {
    name: "Summer",
    roles: ["dev"],
    colors: {
      background: "#98a2d3",
      border: "#98a2d3",
    },
    socials: {
      github: "https://github.com/SummerSigh",
    },
    tags: ["#dev", "#drivenbydata", "#neuralnoodle"],
  },
  {
    name: "ZRock35",
    roles: ["community", "artist"],
    colors: {
      background: "#bb1e40",
      border: "#bb1e40",
    },
    socials: {
      youtube: "https://www.youtube.com/@ZRock35VR",
    },
    tags: ["#demon_cat", "#artist", "#slimevr_mascot"],
  },
  {
    name: "Shoyu",
    roles: ["artist"],
    colors: {
      background: "#c0ddec",
      border: "#c0ddec",
    },
    socials: {
      bluesky: "https://bsky.app/profile/shoyuwoyu.bsky.social",
      instagram: "https://www.instagram.com/shoyuwoyu",
      twitter: "https://x.com/shoyuwoyu",
    },
    tags: ["#shark", "#fish", "#illustrator", "#2d3d"],
  },
  {
    name: "Anna",
    roles: ["dev"],
    colors: {
      background: "#f8c4bf",
      border: "#f8c4bf",
    },
    socials: {
      discord: "https://discordapp.com/users/602597585764483083",
      matrix: "https://matrix.to/#/@devminer:devminer.xyz",
      website: "https://devminer.xyz",
    },
    tags: ["#programmer", "#meow", "#klipperize-it"],
    classes: "-mt-2 !scale-[110%]",
  },
  {
    name: "Smeltie",
    roles: ["dev"],
    colors: {
      background: "#ffd5ff",
      border: "#ffd5ff",
    },
    socials: {
      github: "https://github.com/smeltie",
      bluesky: "https://bsky.app/profile/smeltie.dev",
    },
    tags: ["#possum", "#chaotic", "#grilled_cheese_connoisseur"],
  },
  {
    name: "Blue",
    roles: ["artist"],
    colors: {
      background: "#a9c3c1",
      border: "#a9c3c1",
    },
    socials: {
      website: "https://imbluewisp.com/",
    },
    tags: ["#artist", "#gremlin", "#friend", "#furry"],
    classes: "-mt-1 !scale-[110%]",
  },
  {
    name: "Spazzwan",
    colors: {
      background: "#e5b5d5",
      border: "#e5b5d5",
    },
    roles: ["community", "artist", "dev"],
    socials: {
      twitch: "https://www.twitch.tv/spazzwan",
      youtube: "https://www.youtube.com/spazzwan",
      bluesky: "https://bsky.app/profile/spazzwan.bsky.social",
      kofi: "https://ko-fi.com/spazzwan",
      github: "https://github.com/spazznyan",
    },
    tags: ["#menace", "#infographics", "#<3", "#paintnet_abuser"],
  },
  {
    name: "Meia",
    roles: ["dev", "community"],
    colors: {
      background: "#e3d2e3",
      border: "#e3d2e3",
    },
    socials: {
      bluesky: "https://bsky.app/profile/meia.gay",
      github: "https://github.com/kounocom",
    },
    tags: ["#cosmic", "#starry", "#dumb"],
  },
  {
    name: "Flarchenskii",
    roles: ["artist"],
    colors: {
      background: "#fadade",
      border: "#fadade",
    },
    socials: {
      website: "https://flarchenskii.carrd.co/",
    },
    tags: ["#artist"],
  },
  {
    name: "sctanf",
    roles: ["dev"],
    colors: {
      background: "#c9d7ef",
      border: "#c9d7ef",
    },
    socials: {
      github: "https://github.com/sctanf",
    },
    tags: ["#cat", "#kitty"],
  },
  {
    name: "nataly",
    roles: ["community"],
    colors: {
      background: "#ffe8a9",
      border: "#ffe8a9",
    },
    socials: {},
    tags: ["#coffee_addict", "#fashionista", "#foodporn", "#blogging", "#☺️"],
  },
  {
    name: "Yexo",
    roles: ["community"],
    colors: {
      background: "#d048a7",
      border: "#d048a7",
    },
    socials: {
      website: "https://linktr.ee/yex0",
    },
    tags: ["#silly", "#yes", "#DIYtheWorld"],
    classes: "-mt-5 ml-2 !scale-[120%]",
  },
  {
    name: "Snaila",
    roles: ["artist"],
    socials: {},
    tags: ["#snailing", "#caring", "#pink", "#maid"],
  },
  {
    name: "Eve",
    roles: ["community", "dev"],
    colors: {
      background: "#b1caeb",
      border: "#b1caeb",
    },
    socials: {
      bluesky: "https://bsky.app/profile/evenightingale.bsky.social",
    },
    tags: ["#cute", "#cool", "#fun", "#comfy", "#silly"],
  },
  {
    name: "Cake",
    roles: ["dev"],
    colors: {
      background: "#f8c661",
      border: "#f8c661",
    },
    socials: {
      github: "https://github.com/tort32",
      bluesky: "https://bsky.app/profile/tort32.bsky.social",
    },
    tags: ["#diy", "#electronics", "#prog", "#rock"],
    classes: "ml-3 -mt-2 !scale-[110%]",
  },
  {
    name: "Az",
    roles: ["community"],
    colors: {
      background: "#64c954",
      border: "#64c954",
    },
    socials: {},
    tags: ["#~"],
  },
  {
    name: "Erimel",
    roles: ["dev", "community"],
    colors: {
      background: "#f8ab01",
      border: "#f8ab01",
    },
    socials: {
      github: "https://github.com/Erimelowo",
      youtube: "https://youtube.com/channel/UCq2GXb43iplH8IqB2u0iOZA",
      twitter: "https://x.com/auyerimel",
      discord: "https://discordapp.com/users/695085311994232902",
    },
    tags: ["#fox", "#owo", "#programmer"],
    classes: "-mt-2 !scale-[120%]",
  },
  {
    name: "Gorbit99",
    roles: ["dev"],
    colors: {
      background: "#45b1d4",
      border: "#45b1d4",
    },
    socials: {
      github: "https://github.com/gorbit99",
    },
    tags: ["#programmer", "#not_creative"],
  },
  {
    name: "ImUrX",
    roles: ["dev"],
    colors: {
      background: "#fde09c",
      border: "#fde09c",
    },
    socials: {
      website: "https://imurx.github.io",
    },
    tags: ["#eevee", "#silly", "#:3", "#funky", "#rust"],
    classes: "scale-[105%]",
  },
  {
    name: "Eiren",
    roles: ["dev", "community"],
    colors: {},
    socials: {
      website: "https://eiren.io",
      bluesky: "https://bsky.app/profile/eiren.io",
      github: "https://github.com/eirenliel",
      youtube: "https://www.youtube.com/@eirenrain",
    },
    tags: ["#robot", "#friend", "#eldritch", "#tinkerer"],
    classes: "-mt-1 !scale-[105%]",
  },
  {
    name: "JovannMC",
    roles: ["dev", "community"],
    colors: {
      background: "#b59ec8",
      border: "#b59ec8",
    },
    socials: {
      website: "https://jovann.me",
      youtube: "https://www.youtube.com/@JovannMC",
      github: "https://github.com/JovannMC",
      twitter: "https://x.com/JovannMC",
      matrix: "https://matrix.to/#/@jovannmc:tchncs.de",
    },
    tags: ["#slimetora", "#silly", "#trans", "programmer"],
  },
  {
    name: "Em",
    roles: ["dev", "artist"],
    colors: {
      background: "#e7c1da",
      border: "#e7c1da",
    },
    socials: {},
    tags: ["#shy", "#weeb", "#justhappytobehere"],
  },
  {
    name: "Platinum",
    roles: ["dev", "community"],
    socials: {
      github: "https://github.com/PlatinumVsReality",
    },
    tags: ["#eepy", "#skittle", "shaped", "#friend"],
  },
  {
    name: "Elle",
    roles: ["dev", "community"],
    socials: {
      github: "https://github.com/lmore377",
      twitter: "https://twitter.com/lmore377",
      discord: "https://discordapp.com/users/245072764321398784",
    },
    tags: ["#gay", "#eepy", "#silly"],
  },
  {
    name: "Sigtyr",
    roles: ["community"],
    colors: {
      background: "#e88d40",
      border: "#e88d40",
    },
    socials: {
      kofi: "https://ko-fi.com/sigtyr",
    },
    tags: ["#it", "#corgi", "#support"],
    classes: "mt-2 !scale-[105%]",
  },
  {
    name: "Fate",
    roles: ["dev"],
    socials: {
      bluesky: "https://bsky.app/profile/threadsoffate.bsky.social",
      github: "https://github.com/ThreadOfFate",
    },
    tags: ["#cute", "#programmer", "#scatterbrain"],
  },
  {
    name: "Dqmaged",
    roles: ["community"],
    colors: {
      background: "#dfabc8",
      border: "#dfabc8",
    },
    socials: {
      kofi: "https://ko-fi.com/dqmaged",
    },
    tags: ["#PCBDesign", "#freeslime", "#Pink", "#fuckingboat"],
    classes: "-mt-1 !scale-[105%]",
  },
  {
    name: "Shine Bright",
    roles: ["dev", "community"],
    socials: {
      github: "https://github.com/ShineBrightMeow",
    },
    tags: ["#cat", "#smol", "#kitty", "#meow", "#cute"],
  },
  {
    name: "Aoki",
    roles: ["community"],
    colors: {
      background: "#b0d7d2",
      border: "#b0d7d2",
    },
    socials: {
      github: "https://github.com/kruemmelbande",
      kofi: "https://ko-fi.com/aokiuwu",
      website: "https://agoi.gay",
    },
    tags: ["#meow", "#arch-btw"],
    classes: "-mt-1 !scale-[105%]",
  },
  {
    name: "Polymoria",
    roles: ["artist", "community"],
    colors: {
      background: "#93cdb2",
      border: "#93cdb2",
    },
    socials: { bluesky: "https://bsky.app/profile/polymoria.bsky.social" },
    tags: ["#silly", "#friend", "#uwu", "#owo", "#ryr"],
    classes: "-mt-1 !scale-[110%]",
  },
  {
    name: "Jaberrocky",
    roles: ["dev"],
    socials: {
      twitch: "https://www.twitch.tv/jabberrocky",
      bluesky: "https://bsky.app/profile/jabberrocky.bsky.social",
    },
    tags: ["#stayaligned", "#wolf", "#programmer", "#petsplz"],
  },
  {
    name: "Vyolex",
    roles: ["dev"],
    colors: {
      background: "#f08523",
      border: "#f08523",
    },
    socials: {
      github: "https://github.com/Vyolex",
      bluesky: "https://bsky.app/profile/vyolex.bsky.social",
      printables: "https://www.printables.com/@Vyolex_327889",
    },
    tags: ["#snackiestealer", "#maker", "#raccoon", "#dingus"],
    classes: "mt-5 !scale-[102%]",
  },
  {
    name: "Ashy",
    roles: ["community"],
    socials: {
      twitch: "https://www.twitch.tv/ashyfire33",
      steam: "https://steamcommunity.com/id/ashyfire33",
      discord: "https://discordapp.com/users/951394014240858142",
    },
    tags: ["#techsupportsoldier", "#eepy", "#unityhater"],
  },
  {
    name: "BracketProto",
    roles: ["dev"],
    socials: {
      website: "https://bracketproto.com/",
    },
    tags: ["#slimetora", "#silly", "#trans", "#programmer"],
  },
];
