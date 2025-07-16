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
  image: string;
  tags: string[];
}

export const contributors: Contributor[] = [
  {
    name: "Butterscotch!",
    roles: ["dev", "community"],
    socials: {
      github: "https://github.com/ButterscotchV/",
    },
    image: "/images/contrib-slime.png",
    tags: ["#skunk", "#creature", "#programmer"],
  },
  {
    name: "loucass003",
    roles: ["dev"],
    socials: {
      github: "https://github.com/loucass003",
    },
    image: "/images/contrib-slime.png",
    tags: ["#programmer", "#french"],
  },
  {
    name: "Summer",
    roles: ["dev"],
    socials: {
      github: "https://github.com/SummerSigh",
    },
    image: "/images/contrib-slime.png",
    tags: ["#programmer", "#drivenbydata", "#neuralnoodle"],
  },
  {
    name: "ZRock35",
    roles: ["community"],
    socials: {
      youtube: "https://www.youtube.com/@ZRock35VR",
    },
    image: "/images/contrib-slime.png",
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
    image: "/images/contrib-slime.png",
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
    image: "/images/contrib-slime.png",
    tags: ["#programmer", "#meow"],
  },
  {
    name: "Smeltie",
    roles: ["dev"],
    socials: {
      github: "https://github.com/smeltie",
      bluesky: "https://bsky.app/profile/smeltie.dev",
    },
    image: "/images/contrib-slime.png",
    tags: ["#possum", "#chaotic", "#grilled_cheese_connoisseur"],
  },
  {
    name: "Blue",
    roles: ["artist"],
    socials: {
      website: "https://imbluewisp.com/",
    },
    image: "/images/contrib-slime.png",
    tags: ["#artist", "#gremlin", "#friend", "#furry"],
  },
  {
    name: "Spazzwan",
    roles: ["community"],
    socials: {
      twitch: "https://www.twitch.tv/spazzwan",
      youtube: "https://www.youtube.com/spazzwan",
      bluesky: "https://bsky.app/profile/spazzwan.bsky.social",
      discord: "https://discordapp.com/users/418337866574200833",
      github: "https://github.com/spazznyan",
    },
    image: "/images/contrib-slime.png",
    tags: [
      "#calibration_cat",
      "#menace",
      "#infographics",
      "#<3",
      "#girlkisser",
      "#paintnet_abuser",
    ],
  },
  {
    name: "Meia",
    roles: ["dev", "community"],
    socials: {
      bluesky: "https://bsky.app/profile/meia.gay",
      github: "https://github.com/kounocom",
    },
    image: "/images/contrib-slime.png",
    tags: ["#cosmic", "#starry", "#dumb"],
  },
  {
    name: "Flarchenskii",
    roles: ["artist"],
    socials: {
      website: "https://flarchenskii.carrd.co/",
    },
    image: "/images/contrib-slime.png",
    tags: ["#artist"],
  },
  {
    name: "sctanf",
    roles: ["dev"],
    socials: {
      github: "https://github.com/sctanf",
    },
    image: "/images/contrib-slime.png",
    tags: ["#cat", "#kitty"],
  },
  {
    name: "nataly",
    roles: ["community"],
    socials: {},
    image: "/images/contrib-slime.png",
    tags: ["#coffee_addict", "#fashionista", "#foodporn", "#blogging", "☺️"],
  },
  {
    name: "Yexo",
    roles: ["community"],
    socials: {
      website: "https://linktr.ee/yex0",
    },
    image: "/images/contrib-slime.png",
    tags: ["#silly", "#yes", "#DIYtheWorld"],
  },
  {
    name: "Snaila",
    roles: ["artist"],
    socials: {},
    image: "/images/contrib-slime.png",
    tags: ["#snailing", "#caring", "#pink", "#maid"],
  },
  {
    name: "Eve",
    roles: ["community"],
    socials: {
      bluesky: "https://bsky.app/profile/evenightingale.bsky.social",
    },
    image: "/images/contrib-slime.png",
    tags: ["#cute", "#cool", "#comfy", "#silly", "#fun"],
  },
  {
    name: "Cake",
    roles: ["dev"],
    socials: {
      github: "https://github.com/tort32",
      bluesky: "https://bsky.app/profile/tort32.bsky.social",
    },
    image: "/images/contrib-slime.png",
    tags: ["#diy", "#electronics", "#prog", "#rock"],
  },
  {
    name: "Az",
    roles: ["community"],
    socials: {},
    image: "/images/contrib-slime.png",
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
    image: "/images/contrib-slime.png",
    tags: ["#fox", "#owo", "#programmer"],
  },
  {
    name: "Gorbit99",
    roles: ["dev"],
    socials: {
      github: "https://github.com/gorbit99",
    },
    image: "/images/contrib-slime.png",
    tags: ["#programmer", "#not_creative"],
  },
  {
    name: "ImUrX",
    roles: ["dev"],
    socials: {
      website: "https://imurx.github.io",
    },
    image: "/images/contrib-slime.png",
    tags: ["#eevee", "#silly", "#:3", "#funky", "#rust"],
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
    image: "/images/contrib-slime.png",
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
    image: "/images/contrib-slime.png",
    tags: ["#slimetora", "#trans", "#silly", "#meow", "#programmer"],
  },
  {
    name: "Em",
    roles: ["dev", "artist"],
    socials: {},
    image: "/images/contrib-slime.png",
    tags: ["#shy", "#weeb", "#justhappytobehere"],
  },
  {
    name: "Platinum",
    roles: ["dev", "community"],
    socials: {
      github: "https://github.com/PlatinumVsReality",
    },
    image: "/images/contrib-slime.png",
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
    image: "/images/contrib-slime.png",
    tags: ["#gay", "#eepy", "#silly"],
  },
  {
    name: "Sigtyr",
    roles: ["community"],
    socials: {
      kofi: "https://ko-fi.com/sigtyr",
    },
    image: "/images/contrib-slime.png",
    tags: ["#it", "#corgi", "#support"],
  },
  {
    name: "Fate",
    roles: ["dev"],
    socials: {
      bluesky: "https://bsky.app/profile/threadsoffate.bsky.social",
      github: "https://github.com/ThreadOfFate",
    },
    image: "/images/contrib-slime.png",
    tags: ["#cute", "#programmer", "#scatterbrain"],
  },
  {
    name: "Dqmaged",
    roles: ["community"],
    socials: {
      kofi: "https://ko-fi.com/dqmaged",
    },
    image: "/images/contrib-slime.png",
    tags: ["#3dmodeler", "#Pink", "#PCBDesign", "#freeslime", "#fuckingboat"],
  },
  {
    name: "Shine Bright",
    roles: ["dev", "community"],
    socials: {
      github: "https://github.com/ShineBrightMeow",
    },
    image: "/images/contrib-slime.png",
    tags: ["#cat", "#kitty", "#meow", "#cute", "#smol"],
  },
  {
    name: "Aoki",
    roles: ["community"],
    socials: {
      github: "https://github.com/kruemmelbande",
      kofi: "https://ko-fi.com/aokiuwu",
      website: "https://agoi.gay",
    },
    image: "/images/contrib-slime.png",
    tags: ["#meow", "#arch-btw"],
  },
  {
    name: "Polymoria",
    roles: ["dev", "artist", "community"],
    socials: {},
    image: "/images/contrib-slime.png",
    tags: ["#placeholder", "#loremipsum"],
  },
  {
    name: "Jaberrocky",
    roles: ["dev"],
    socials: {
      twitch: "https://www.twitch.tv/jabberrocky",
      bluesky: "https://bsky.app/profile/jabberrocky.bsky.social",
    },
    image: "/images/contrib-slime.png",
    tags: ["#stayaligned", "#programmer", "#wolf", "#petsplz", "#speedrunner"],
  },
  {
    name: "Vyolex",
    roles: ["dev"],
    socials: {
      github: "https://github.com/Vyolex",
      bluesky: "https://bsky.app/profile/vyolex.bsky.social",
      kofi: "https://ko-fi.com/vyolex",
      printables: "https://www.printables.com/@Vyolex_327889",
    },
    image: "/images/contrib-slime.png",
    tags: ["#snackiestealer", "#raccoon", "#dingus", "#maker", "#imu_muncher"],
  },
  {
    name: "Ashy",
    roles: ["community"],
    socials: {
      twitch: "https://www.twitch.tv/ashyfire33",
      steam: "https://steamcommunity.com/id/ashyfire33",
      discord: "https://discordapp.com/users/951394014240858142",
    },
    image: "/images/contrib-slime.png",
    tags: ["#techsupportsoldier", "#eepy", "#silly", "#unityhater"],
  },
];

export const contributorsAlphabetical = contributors.sort((a, b) =>
  a.name.localeCompare(b.name)
);
