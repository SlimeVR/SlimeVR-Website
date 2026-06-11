export interface Contributor {
  name: string;
  roles: ("dev" | "artist" | "community")[];
  color?: string;
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
    vgen?: string;
    booth?: string;
    soundcloud?: string;
    steam?: string;
    matrix?: string;
    reddit?: string;
    patreon?: string;
  };
  tags: string[];
  classes?: string;
}

export const contributors: Contributor[] = [
  {
    name: "Butterscotch",
    roles: ["dev", "community"],
    color: "#e18400",
    socials: {
      github: "https://github.com/ButterscotchV/",
    },
    tags: ["#skunk", "#creature", "#🦨", "#hungry"],
    classes: "ml-5 scale-[85%]!",
  },
  {
    name: "loucass003",
    roles: ["dev"],
    color: "#fae2c1",
    socials: {
      github: "https://github.com/loucass003",
    },
    tags: ["#programmer", "#french"],
    classes: "scale-[105%]!",
  },
  {
    name: "Summer",
    roles: ["dev"],
    color: "#98a2d3",
    socials: {
      github: "https://github.com/SummerSigh",
    },
    tags: ["#dev", "#drivenbydata", "#neuralnoodle"],
  },
  {
    name: "ZRock35",
    roles: ["community", "artist"],
    color: "#f01817",
    socials: {
      youtube: "https://www.youtube.com/@ZRock35VR",
    },
    tags: ["#demon_cat", "#artist", "#slimevr_mascot"],
  },
  {
    name: "Shoyu",
    roles: ["artist"],
    color: "#c0ddec",
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
    color: "#c80f8d",
    socials: {
      discord: "https://discordapp.com/users/602597585764483083",
      matrix: "https://matrix.to/#/@devminer:devminer.xyz",
      website: "https://devminer.xyz",
    },
    tags: ["#programmer", "#meow", "#klipperize-it"],
    classes: "-mt-2 scale-[110%]!",
  },
  {
    name: "Smeltie",
    roles: ["dev"],
    color: "#ffd5ff",
    socials: {
      github: "https://github.com/smeltie",
      bluesky: "https://bsky.app/profile/smeltie.dev",
    },
    tags: ["#possum", "#chaotic", "#grilled_cheese_connoisseur"],
  },
  {
    name: "Blue",
    roles: ["artist"],
    color: "#a9c3c1",
    socials: {
      website: "https://imbluewisp.com/",
    },
    tags: ["#artist", "#gremlin", "#friend", "#furry"],
    classes: "-mt-1 scale-[110%]!",
  },
  {
    name: "Spazzwan",
    color: "#d4bbff",
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
    color: "#e3d2e3",
    socials: {
      bluesky: "https://bsky.app/profile/meia.gay",
      github: "https://github.com/kounocom",
    },
    tags: ["#cosmic", "#starry", "#dumb", "#miku"],
  },
  {
    name: "Flarchenskii",
    roles: ["artist"],
    color: "#fadade",
    socials: {
      website: "https://flarchenskii.carrd.co/",
    },
    tags: ["#artist"],
  },
  {
    name: "sctanf",
    roles: ["dev"],
    color: "#c9d7ef",
    socials: {
      github: "https://github.com/sctanf",
    },
    tags: ["#cat", "#kitty"],
  },
  {
    name: "nataly",
    roles: ["community"],
    color: "#eec792",
    socials: {},
    tags: ["#coffee_addict", "#fashionista", "#foodporn", "#blogging", "#☺️"],
  },
  {
    name: "Yexo",
    roles: ["community"],
    color: "#d048a7",
    socials: {
      website: "https://linktr.ee/yex0",
    },
    tags: ["#silly", "#yes", "#DIYtheWorld"],
    classes: "-mt-3 ml-2 scale-[115%]!",
  },
  {
    name: "Snaila",
    color: "#ecc5c1",
    roles: ["artist"],
    socials: {},
    tags: ["#snailing", "#caring", "#pink", "#maid"],
    classes: "-mt-1",
  },
  {
    name: "Eve",
    roles: ["community", "dev"],
    color: "#b1caeb",
    socials: {
      bluesky: "https://bsky.app/profile/evenightingale.bsky.social",
    },
    tags: ["#cute", "#cool", "#fun", "#comfy", "#silly"],
  },
  {
    name: "Cake",
    roles: ["dev"],
    color: "#f8c661",
    socials: {
      github: "https://github.com/tort32",
      bluesky: "https://bsky.app/profile/tort32.bsky.social",
    },
    tags: ["#diy", "#electronics", "#prog", "#rock"],
    classes: "ml-3 -mt-2 scale-[110%]!",
  },
  {
    name: "Az",
    roles: ["community"],
    color: "#74f062",
    socials: {
      steam: "https://steamcommunity.com/profiles/76561198082379723",
      discord: "https://discordapp.com/users/231153368817598464",
    },
    tags: ["#~", "#cool", "#tea", "#samurai", "#warranty"],
  },
  {
    name: "Erimel",
    roles: ["dev", "community"],
    color: "#f8ab01",
    socials: {
      github: "https://github.com/Erimelowo",
      youtube: "https://youtube.com/channel/UCq2GXb43iplH8IqB2u0iOZA",
      twitter: "https://x.com/auyerimel",
      discord: "https://discordapp.com/users/695085311994232902",
    },
    tags: ["#fox", "#owo", "#programmer"],
    classes: "-mt-2 scale-[120%]!",
  },
  {
    name: "Gorbit99",
    roles: ["dev"],
    color: "#45b1d4",
    socials: {
      github: "https://github.com/gorbit99",
    },
    tags: ["#programmer", "#not_creative"],
  },
  {
    name: "ImUrX",
    roles: ["dev"],
    color: "#fde09c",
    socials: {
      website: "https://imurx.github.io",
    },
    tags: ["#eevee", "#silly", "#:3", "#funky", "#rust"],
    classes: "scale-[105%]!",
  },
  {
    name: "Eiren",
    color: "#e68a26",
    roles: ["dev", "community"],
    socials: {
      website: "https://eiren.io",
      bluesky: "https://bsky.app/profile/eiren.io",
      github: "https://github.com/eirenliel",
      youtube: "https://www.youtube.com/@eirenrain",
    },
    tags: ["#robit", "#friend", "#eldritch", "#tinkerer"],
    classes: "mt-1 scale-[105%]!",
  },
  {
    name: "JovannMC",
    roles: ["dev", "community"],
    color: "#c0c0c0",
    socials: {
      website: "https://jovann.me",
      youtube: "https://www.youtube.com/@JovannMC",
      github: "https://github.com/JovannMC",
      twitter: "https://x.com/JovannMC",
      matrix: "https://matrix.to/#/@jovannmc:tchncs.de",
    },
    tags: ["#slimetora", "#silly", "#trans", "#eepy", "#zz"],
  },
  {
    name: "Em",
    roles: ["dev", "artist"],
    color: "#e7c1da",
    socials: {},
    tags: ["#shy", "#weeb", "#justhappytobehere"],
    classes: "",
  },
  {
    name: "Platinum",
    roles: ["dev", "community"],
    color: "#d0a067",
    socials: {
      github: "https://github.com/PlatinumVsReality",
    },
    tags: ["#eepy", "#skittle", "shaped", "#friend"],
    classes: "mt-1 scale-[110%]!",
  },
  {
    name: "Elle",
    roles: ["dev", "community"],
    color: "#af87ad",
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
    color: "#e88d40",
    socials: {
      kofi: "https://ko-fi.com/sigtyr",
    },
    tags: ["#it", "#corgi", "#support"],
    classes: "mt-2 scale-[105%]!",
  },
  {
    name: "Fate",
    roles: ["dev"],
    color: "#e8e0d4",
    socials: {
      bluesky: "https://bsky.app/profile/threadsoffate.bsky.social",
      github: "https://github.com/ThreadOfFate",
    },
    tags: ["#cute", "#programmer", "#scatterbrain"],
  },
  {
    name: "Dqmaged",
    roles: ["community"],
    color: "#dfabc8",
    socials: {
      kofi: "https://ko-fi.com/dqmaged",
    },
    tags: ["#PCBDesign", "#freeslime", "#Pink", "#fuckingboat"],
    classes: "-mt-1 scale-[105%]!",
  },
  {
    name: "Shine",
    color: "#f5d1e2",
    roles: ["dev", "community"],
    socials: {
      github: "https://github.com/ShineBrightMeow",
    },
    tags: ["#cat", "#smol", "#kitty", "#meow", "#cute"],
    classes: "-mt-1 scale-[105%]!",
  },
  {
    name: "Aoki",
    roles: ["community"],
    color: "#b0d7d2",
    socials: {
      github: "https://github.com/kruemmelbande",
      kofi: "https://ko-fi.com/aokiuwu",
      website: "https://agoi.gay",
    },
    tags: ["#meow", "#arch-btw"],
    classes: "-mt-1 scale-[105%]!",
  },
  {
    name: "Polymoria",
    roles: ["artist", "community"],
    color: "#e4867a",
    socials: { bluesky: "https://bsky.app/profile/polymoria.bsky.social" },
    tags: ["#silly", "#friend", "#uwu", "#owo", "#ryr"],
    classes: "scale-[110%]!",
  },
  {
    name: "Jabberrocky",
    color: "#ef7b58",
    roles: ["dev"],
    socials: {
      twitch: "https://www.twitch.tv/jabberrocky",
      bluesky: "https://bsky.app/profile/jabberrocky.bsky.social",
    },
    tags: ["#stayaligned", "#wolf", "#programmer", "#petsplz"],
    classes: "-mt-1 scale-[110%]!",
  },
  {
    name: "Vyolex",
    roles: ["dev"],
    color: "#f08523",
    socials: {
      github: "https://github.com/Vyolex",
      bluesky: "https://bsky.app/profile/vyolex.bsky.social",
      printables: "https://www.printables.com/@Vyolex_327889",
    },
    tags: ["#snackiestealer", "#maker", "#raccoon", "#dingus"],
    classes: "mt-5 scale-[102%]!",
  },
  {
    name: "Ashy",
    color: "#ad91c3",
    roles: ["community"],
    socials: {
      twitch: "https://www.twitch.tv/ashyfire33",
      steam: "https://steamcommunity.com/id/ashyfire33",
      discord: "https://discordapp.com/users/951394014240858142",
    },
    tags: ["#techsupportsoldier", "#eepy", "#unityhater"],
    classes: "-mt-1 scale-[110%]!",
  },
  {
    name: "BracketProto",
    roles: ["dev"],
    socials: {
      website: "https://bracketproto.com/",
    },
    tags: ["#slimetora", "#silly", "#trans", "#programmer"],
  },
  {
    name: "unlogisch",
    roles: ["dev"],
    socials: {
      github: "https://github.com/unlogisch04/",
    },
    tags: ["#programmer", "#fork", "#maintainer", "#firmware"],
    classes: "",
  },
  {
    name: "Aed",
    color: "#e0e1ed",
    roles: ["dev", "community"],
    socials: {
      kofi: "https://ko-fi.com/aed00",
      github: "https://github.com/Aed-1",
      discord: "https://discord.com/users/884888736855392307",
    },
    tags: ["#rusk", "#silly", "#goated"],
  },
  {
    name: "Sebby",
    color: "#e0cdb8",
    roles: ["dev", "community"],
    socials: {
      bluesky: "https://bsky.app/profile/sebrinarena.bsky.social",
    },
    tags: ["#programmer", "#madscientist", "#punny"],
  },
  {
    name: "Sky",
    color: "#e0e1ed",
    roles: ["community"],
    socials: {
      kofi: "https://ko-fi.com/skyborne01",
      discord: "https://discord.com/users/673798346397188111",
    },
    tags: ["#daydream", "#rock", "#☁️"],
  },
  {
    name: "BakaSoniji",
    color: "#e0e1ed",
    roles: ["community"],
    socials: {
      github: "https://github.com/BakaSoniji",
    },
    tags: ["#baka", "#cat", "#meow", "#food"],
  },
  {
    name: "Rexa",
    color: "#aeadcf",
    roles: ["dev", "community"],
    socials: {
      bluesky: "https://bsky.app/profile/did:plc:jw5h23y2xxu3jznx5taro64r",
      reddit: "https://www.reddit.com/u/RexaOnReddit",
      github: "https://github.com/AmberStormbright",
      kofi: "https://ko-fi.com/troniquellc",
      patreon: "https://patreon.com/tronique_llc",
    },
    tags: ["#foxy", "#silly", "#cute", "#engineer", "#gamer"],
  },
  {
    name: "Sapphire",
    roles: ["dev"],
    socials: {
      github: "https://github.com/ImSapphire",
      discord: "https://discord.com/users/615014335525289984",
    },
    tags: ["#derg", "#linux", "#goober"],
  },
  {
    name: "CalliePepper",
    roles: ["dev"],
    socials: {
      website: "https://callie.zone/",
    },
    tags: ["#robot"],
  },
  {
    name: "Bagel",
    roles: ["dev", "community"],
    socials: {
      github: "https://github.com/lordbagel42",
      website: "https://sylviethedev.com",
    },
    tags: ["#silly", "#goober", "#meow", "#colonthree"],
  },
  {
    name: "Kamilake",
    roles: ["dev", "community"],
    socials: {
      github: "https://github.com/kamilake",
    },
    tags: ["#programmer", "#kami", "#silly"],
  },
  {
    name: "Mercymainer",
    roles: ["dev"],
    socials: {
      github: "https://github.com/rastorguevia",
    },
    tags: ["#contributor", "#programmer", "#lazy"],
  },
  {
    name: "Pixel_Lily",
    roles: ["community"],
    socials: {
      soundcloud: "https://soundcloud.com/pixelily",
      website: "https://pixelily.net",
    },
    tags: ["#djixel", "#purple", "#cute"],
  },
  {
    name: "SickHekker",
    roles: ["community"], // ? - logistics / supply
    socials: {
      bluesky: "https://bsky.app/profile/sickhekker.bsky.social",
      twitter: "https://twitter.com/sickhekker",
    },
    tags: ["#dog", "#logistics", "#metal", "#barkbarkbark"],
  },
  {
    name: "Emi",
    roles: ["artist"],
    socials: {},
    tags: ["#have-a-pleasant-10000-years", "#drawer", "#nerd🤓", "#shy"],
  },
  {
    name: "GizmoQC",
    roles: ["dev"],
    socials: {
      twitch: "https://www.twitch.tv/gizmoqcvr",
      github: "https://github.com/Guizmo12",
    },
    tags: ["#bunny", "#twitch", "#handtraking"],
  },
  {
    name: "Depact",
    roles: ["community"],
    socials: {
      github: "https://github.com/Depact",
    },
    tags: ["#diy", "#smols", "#docs", "#tracker-straps"],
  },
  {
    name: "NWB",
    roles: ["community"],
    socials: {},
    tags: ["#quietly_lurking", "#homelabber", "#programmer", "#DIYer"],
  },
  {
    name: "Chiimera",
    color: "#c0c2cf",
    roles: ["artist"],
    socials: {
      bluesky: "https://bsky.app/profile/chimericcurios.bsky.social",
      youtube: "https://www.youtube.com/@chimericcurios",
      vgen: "https://vgen.co/chimericcurios",
      booth: "https://chimericcurios.booth.pm/",
    },
    tags: ["#unity", "#blender", "#deletethedefaultcube"],
    classes: "-mt-1 scale-[105%]!",
  },
  {
    name: "HannahPadd",
    color: "#f3c554",
    roles: ["dev"],
    socials: {
      github: "https://github.com/hannahpadd",
    },
    tags: ["#programmer", "#metal", "#silly", "#terraria"],
    classes: "mt-3",
  },
];
