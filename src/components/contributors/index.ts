export interface Contributor {
  name: string;
  roles: ("dev" | "artist" | "community")[];
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

export const contributors: Contributor[] = [
  {
    name: "Butterscotch",
    roles: ["dev", "community"],
    socials: {
      github: "https://github.com/ButterscotchV/",
    },
    tags: ["#skunk", "#creature", "#programmer"],
    classes: "ml-5 !scale-[85%]"
  },
  {
    name: "loucass003",
    roles: ["dev"],
    socials: {
      github: "https://github.com/loucass003",
    },
    tags: ["#programmer", "#french"],
    classes: "-mt-5 !scale-[115%]"
  },
  {
    name: "Summer",
    roles: ["dev"],
    socials: {
      github: "https://github.com/SummerSigh",
    },
    tags: ["#programmer", "#drivenbydata", "#neuralnoodle"],
  },
  {
    name: "ZRock35",
    roles: ["community"],
    socials: {
      youtube: "https://www.youtube.com/@ZRock35VR",
    },
    tags: ["#demon_cat", "#slimevr_mascot", "#beta_tester"],
  },
  {
    name: "Shoyu",
    roles: ["artist"],
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
    socials: {
      discord: "https://discordapp.com/users/602597585764483083",
      matrix: "https://matrix.to/#/@devminer:devminer.xyz",
      website: "https://devminer.xyz",
    },
    tags: ["#programmer", "#meow"],
    classes: "-mt-2 !scale-[110%]"
  },
  {
    name: "Smeltie",
    roles: ["dev"],
    socials: {
      github: "https://github.com/smeltie",
      bluesky: "https://bsky.app/profile/smeltie.dev",
    },
    tags: ["#possum", "#chaotic", "#grilled_cheese_connoisseur"],
  },
  {
    name: "Blue",
    roles: ["artist"],
    socials: {
      website: "https://imbluewisp.com/",
    },
    tags: ["#artist", "#gremlin", "#friend", "#furry"],
  },
  {
    name: "Spazzwan",
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
    socials: {
      bluesky: "https://bsky.app/profile/meia.gay",
      github: "https://github.com/kounocom",
    },
    tags: ["#cosmic", "#starry", "#dumb"],
  },
  {
    name: "Flarchenskii",
    roles: ["artist"],
    socials: {
      website: "https://flarchenskii.carrd.co/",
    },
    tags: ["#artist"],
  },
  {
    name: "sctanf",
    roles: ["dev"],
    socials: {
      github: "https://github.com/sctanf",
    },
    tags: ["#cat", "#kitty"],
  },
  {
    name: "nataly",
    roles: ["community"],
    socials: {},
    tags: ["#coffee_addict", "#fashionista", "#foodporn", "#blogging", "#☺️"],
  },
  {
    name: "Yexo",
    roles: ["community"],
    socials: {
      website: "https://linktr.ee/yex0",
    },
    tags: ["#silly", "#yes", "#DIYtheWorld"],
    classes: "-mt-5 ml-2 !scale-[120%]"
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
    socials: {
      bluesky: "https://bsky.app/profile/evenightingale.bsky.social",
    },
    tags: ["#cute", "#cool", "#fun", "#comfy", "#silly"],
  },
  {
    name: "Cake",
    roles: ["dev"],
    socials: {
      github: "https://github.com/tort32",
      bluesky: "https://bsky.app/profile/tort32.bsky.social",
    },
    tags: ["#diy", "#electronics", "#prog", "#rock"],
    classes: "ml-3 -mt-2 !scale-[110%]"
  },
  {
    name: "Az",
    roles: ["community"],
    socials: {},
    tags: ["#~"],
  },
  {
    name: "Erimel",
    roles: ["dev", "community"],
    socials: {
      github: "https://github.com/Erimelowo",
      youtube: "https://youtube.com/channel/UCq2GXb43iplH8IqB2u0iOZA",
      twitter: "https://x.com/auyerimel",
      discord: "https://discordapp.com/users/695085311994232902",
    },
    tags: ["#fox", "#owo", "#programmer"],
    classes: "-mt-2 !scale-[120%]"
  },
  {
    name: "Gorbit99",
    roles: ["dev"],
    socials: {
      github: "https://github.com/gorbit99",
    },
    tags: ["#programmer", "#not_creative"],
  },
  {
    name: "ImUrX",
    roles: ["dev"],
    socials: {
      website: "https://imurx.github.io",
    },
    tags: ["#eevee", "#silly", "#:3", "#funky", "#rust"],
    classes: "scale-[105%]"
  },
  {
    name: "Eiren",
    roles: ["dev", "community"],
    socials: {
      website: "https://eiren.io",
      bluesky: "https://bsky.app/profile/eiren.io",
      github: "https://github.com/eirenliel",
      youtube: "https://www.youtube.com/@eirenrain",
    },
    tags: ["#robot", "#friend", "#eldritch", "#tinkerer"],
  },
  {
    name: "JovannMC",
    roles: ["dev", "community"],
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
    socials: {
      kofi: "https://ko-fi.com/sigtyr",
    },
    tags: ["#it", "#corgi", "#support"],
    classes: "mt-2 !scale-[105%]"
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
    socials: {
      kofi: "https://ko-fi.com/dqmaged",
    },
    tags: ["#3dmodeler", "#Pink", "#PCBDesign", "#freeslime", "#fuckingboat"],
    classes: "-mt-1 !scale-[105%]"
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
    socials: {
      github: "https://github.com/kruemmelbande",
      kofi: "https://ko-fi.com/aokiuwu",
      website: "https://agoi.gay",
    },
    tags: ["#meow", "#arch-btw"],
    classes: "-mt-1 !scale-[105%]"
  },
  {
    name: "Polymoria",
    roles: ["artist", "community"],
    socials: { bluesky: "https://bsky.app/profile/polymoria.bsky.social" },
    tags: ["#silly", "#friend", "#uwu", "#owo", "#ryr"],
    classes: "-mt-1 !scale-[110%]"
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
    socials: {
      github: "https://github.com/Vyolex",
      bluesky: "https://bsky.app/profile/vyolex.bsky.social",
      printables: "https://www.printables.com/@Vyolex_327889",
    },
    tags: ["#snackiestealer", "#maker", "#raccoon", "#dingus"],
    classes: "mt-5 !scale-[102%]"
  },
  {
    name: "Ashy",
    roles: ["community"],
    socials: {
      twitch: "https://www.twitch.tv/ashyfire33",
      steam: "https://steamcommunity.com/id/ashyfire33",
      discord: "https://discordapp.com/users/951394014240858142",
    },
    tags: ["#techsupportsoldier", "#eepy", "#silly", "#unityhater"],
  },
  {
    name: "BracketProto",
    roles: ["dev"],
    socials: {
      website: "https://bracketproto.com/",
    },
    tags: ["#slimetora", "#silly", "#trans", "programmer"],
  },
];
