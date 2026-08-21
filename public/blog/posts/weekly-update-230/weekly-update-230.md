---
title: "Weekly Dev Update #230"
date: "2026-03-19T00:00:00.000Z"
description: "Hiyo slime gang~! Spazzwan here, with my 30th official SlimeVR update. I hope you all have been enjoying them as much as I enjoy writing them..."
thumbnailUrl: "/blog/posts/weekly-update-230/80147_1785151797077_145.webp"
---

Hiyo slime gang~! Spazzwan here, with my 30th official SlimeVR update. I hope you all have been enjoying them as much as I enjoy writing them <3

SLIMES STILL IN STOCK!! https://slimevr.dev/buy

**Shipment 15.1:**
This will be the last update with this Shipment, as it is basically finished now. Please check your Crowd Supply account and inbox if you think your order was in here and hasn't shipped. Orders with upgrade sets included in them are likely waiting for stock to arrive in S16.

**Shipment 16:**
This shipment has been fully stacked and bundled, and are awaiting pickup by UPS. We expect pickup to occur this Friday. This shipment is a big one, with an enormous number of trackers which will result in, hopefully, **all sets being in stock for the first time ever!!!** This will also include all upgrades sets currently on order (at the time of posting), and all but a handful of DIY sets which will be sent in the coming week as the smallest shipment ever (16.1).
We are predicting this shipment arrival at CS **close to the end March**. Pictures of this shipment below.

__To sum up the current sets and when they are next expected:__
S**15.1** (At Crowd Supply) **-** Contains: 5+0, 6+2, 8+2, 12+4, upgrades (hip, feet)
S**16** (late March) **-** Contains: **6+0**, 6+2, DIY, upgrades

## Butterfly News <img src="/public/blog/emoji/butterfly-1470467583323930685.webp" alt="butterfly" class="discord-emoji" />
Work continues on in the Slime cave to ensure we hit our release target. We have received and begun testing on the 4th prototype of our Butterfly dongle. Check them out in the pictures below, along with a beauty pic of our newest Butterfly Panel tester that will be used to test each Butterfly Tracker we ship for quality assurance.

While the campaign official ends today, pre-orders for Butterfly Trackers will continue to be open just as they are now. To order or just learn more, head over to: https://slimevr.dev/smol
> **[SlimeVR Full-Body Tracker](https://slimevr.dev/buy)**
> An affordable, comfortable, wireless, 360° solution for full-body tracking in virtual reality

> **[SlimeVR Butterfly Trackers](https://slimevr.dev/smol)**
> Super comfortable IMU body-tracking for virtual reality, motion capture, and VTubing

![attachment](/blog/posts/weekly-update-230/80147_1785151797077_145.webp)
![attachment](/blog/posts/weekly-update-230/81411_1785151801819_146.webp)
![attachment](/blog/posts/weekly-update-230/81803_1785151809017_148.webp)
![attachment](/blog/posts/weekly-update-230/82610_1785151827878_152.webp)
## Ecosystem News <img src="/public/blog/emoji/nighty_hug-1314209493747241011.webp" alt="nighty_hug" class="discord-emoji" />
### A fairly huge change you will hopefully never notice is happening:

In simple terms we are changing one of core technologies we use to display stuff in the GUI.
In nerdy terms we are switching our web view engine from webkit-based Tauri to chromium based Electron.

What does this mean for you?
Hopefully either nothing or a better experience. The download will be a bit bigger, but should run the same with slightly less memory usage.

Why are we doing this?
A whole bunch of reasons. The change was primarily driven by our developers for 3 main factors:
1. Electron is much easier for us to develop on. It has industry leading dev tools, is made and backed by GitHub, and makes cross-platform development ***way*** simpler.
2. Linux versions of the server have been suffering from multiple serious issues, including memory leaks. While you might think this isn't important, the Steam Frame runs on linux, so the amount of people using linux in the VR space is about to get a lot larger.
3. Steam. Our [steam release](https://store.steampowered.com/app/3245490/SlimeVR/) was not feasible on Tauri, so switching to Electron was a no-brainer here.

This is a big change, but its a necessary step towards better software for everyone.
### Testing
With such a big change, we need to test it! We really need feedback on your experiences using this version, and there are currently two different ways you can help us out in that regard!

First up, you can get the latest Release Candidate in our beta testing forum, here: https://discord.com/channels/817184208525983775/1481527764137021451
Second, you can try out our steam release! Keys will go out periodically, so keep an eye on this thread if you are interested in providing feedback: https://discord.com/channels/817184208525983775/1475535820822679552

Please leave feedback in the relevant thread! Both positive and negative is much appreciated <3
## Rapid Roundup <img src="/public/blog/emoji/nighty_nom-1314209503276699708.webp" alt="nighty_nom" class="discord-emoji" />
Ready yourself for a bunch of SlimeVR news bits to bite on:
* The next batch of SlimeVR stickers are in the sketching stage and are looking so amazing! Once again modelled after various contributors, the finished designs of these will be included in Butterfly Tracker bundles and some of the future 1.2 tracker sets. Check out the fantastic artistry below!
* MOCAPers and VTubers rejoice... again. I personally took it upon myself to make fingers look cool as heck. Sickened by the old equi-length phalanx of our current finger system, I have added a system to asymmetrically divide fingers into more appealing and natural subdivisions. This is extremely important as now you can now do finger hearts! Check the little demo below.

*That's it for this week. Thank you for reading to the end, hope you all have a lovely week and weekend. See you space slimethings~! <3*
![attachment](/blog/posts/weekly-update-230/80137_1785151791125_143.webp)
![attachment](/blog/posts/weekly-update-230/80139_1785151794031_144.webp)
