# SlimeVR Press Kit Content

## Logos

### SlimeVR

![alt text](<SlimeVR logo with one SlimeVR mascot.png>)
![alt text](<SlimeVR logo transparent.png>)
![alt text](<slimevr logo transparent background.png>)
![alt text](<SlimeVR logo with two SlimeVR mascots.png>)
![alt text](<SlimeVR logo with three SlimeVR mascots.png>)
![alt text](<SlimeVR logo and text on background.png>)
![[SlimeVR logo with one SlimeVR mascot.png|302]]

### Butterfly Trackers Logo

![alt text](<Logos/Butterfly Trackers Logo/Butterfly Trackers Logo.png>)

## Product Shots and Videos

%%TODO:

- Make product shots for server
- Request product shots or videos for butterflies and Wi-Fi slimes

Reference examples: [https://www.happyfox.com/live-chat/press-kit/](https://www.happyfox.com/live-chat/press-kit/) %%

## About Us

## About SlimeVR (Short)

- The SlimeVR ecosystem is a set consisting of open hardware sensors and an open-source server that facilitates [Full-Body Tracking (FBT)](https://wiki.vrchat.com/wiki/Full-Body_Tracking)
- It is designed to be affordable, comfortable, and completely open, requiring no base stations or cameras
- SlimeVR is commonly used for virtual reality, VTubing, and motion capture

## About SlimeVR (Long)

The SlimeVR ecosystem consists of a set of trackers and server software that let users track their body movements and pose; from the torso and hips, to the fingers and toes.

This lets user bring their real-life movements into VR, do VTubing, and perform motion capture.
SlimeVR trackers are based on IMUs which do not require base stations or cameras, completely avoiding occlusion issues - you can use them under comfort of blanket!

Applications:

- **Games** that supports FBT via SteamVR, OSC, or VMC are compatible with SlimeVR: VRChat, NeosVR, Blade and Sorcery, Dance Dash, Zenith: Nexus, Chillout VR, Resonite, LIV and many others!
- **VTubing** software that supports OSC, VMC protocols, or SteamVR support SlimeVR, including VSeeFace, Warudo, Tracking Worlds, and many more!
- **Motion Capture (MoCap)** software that can import BVH files, or works with OSC, VMC protocols, and SteamVR, including Blender, Unreal Engine, and more!

### SlimeVR Ecosystem

#### SlimeVR Trackers

- The first generation of SlimeVR trackers were based on the ESP-32, using Wi-Fi.
- The next generation, Butterfly Trackers, are the official version of the "Smol trackers"[1]
- Both generations of official trackers can be ordered through Crowd Supply, but can also be built yourself (DIY) or bought from the community marketplace in the SlimeVR Discord.
---
1. Smol trackers - implementation of SlimeVR server compatible trackers based within the nRF ecosystem, using a proprietary Enhanced ShockBurst (ESB) protocol.

<table>
    <tr>
        <td>Tracker Type</td>
        <td>Communication Method</td>
        <td>Average Weight</td>
        <td>Battery Life</td>
        <td>Range</td>
        <td>Summary</td>
    </tr>
    <tr>
        <td>Official Wi-Fi Trackers</td>
        <td>2.4 GHz Wi-Fi</td>
        <td>50 g</td>
        <td>18-20 h</td>
        <td>Wi-Fi coverage</td>
        <td>
	        <ul>
		        <li>Bulkier and heavier</li>
		        <li>Lower battery life</li>
		        <li>Requires Wi-Fi setup and depends on network conditions</li>
		        <li>Much greater range</li>
	         </ul>
	    </td>
    </tr>
    <tr>
        <td>Smol/Butterfly Trackers</td>
        <td>2.4 GHz Enhanced ShockBurst (ESB)</td>
        <td>~10-15 g</td>
        <td>40-60 h</td>
        <td>7-12m from receiver (21-36 ft)</td>
        <td>
	        <ul>
		        <li>Greater battery life</li>
		        <li>Smaller and compact</li>
		        <li>Must be paired to a dongle connected to the host device</li>
		        <li>Lower range</li>
	         </ul>
	    </td>
    </tr>
</table>

##### SlimeVR Server

The server app for the SlimeVR ecosystem.
The server orchestrates communication between multiple sensors and integrations.
Server repository: https://github.com/SlimeVR/SlimeVR-Server

## Key Value Props

- Full-body tracking from the torso, arms, and legs-down, to fingers and toes - it's an entire full-body tracking system.
- Tracking that you can build yourself for affordible prices.
- Works great with blankets - no occlusion!
- SlimeVR Server automatically detects your VRChat settings and suggests the best settings for your tracking.
- A strong community on Discord.
- Windows, MacOS, Linux, mobile, and even standalone headsets supported.

### SlimeVR Project Timeline

- 2020 - Eiren and Polymoria started the project
  The server and Wi-Fi tracker firmware repositories were created:
  - https://github.com/SlimeVR/SlimeVR-Server
  - https://github.com/SlimeVR/SlimeVR-Tracker-ESP
- Dec, 2020 - SlimeVR Discord Server was created
- Aug 31, 2021 - SlimeVR Wi-Fi Trackers Crowd Supply campaign started
  https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker/updates/our-campaign-is-live
- Dec 29, 2021 - Chip shortage and COVID-19 hit the project
  https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker/updates/progress-and-schedule-updates
- Oct 12, 2022 - 7950 out of 32,000 required BNO085 (IMU) were secured
  https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker/updates/production-status-and-other-updates
- Mar 09, 2023 - SlimeVR Wi-Fi Trackers DIY kits has started shipping
  Crowd Supply update: https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker/updates/diy-kits-are-shipping
- Mar 09, 2023 - sctanf began work on Smol slimes, creating repositories for the tracker and receiver:
  - https://github.com/SlimeVR/SlimeVR-Tracker-nRF
  - https://github.com/SlimeVR/SlimeVR-Tracker-nRF-Receiver
- Jul 12, 2023 - SlimeVR Wi-Fi Trackers started shipping
  Crowd Supply update: https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker/updates/first-batch-of-slimevr-sets-shipping-soon-heres-how-to-get-started
- May 23, 2025 - The last 734 sets of SlimeVR 1.0 and 1.1 have been shipped. v1.2 version of Wi-Fi trackers started shipping
  Crowd Supply update: https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker/updates/epic-new-things
- Feb, 2026 - The SlimeVR Butterfly Trackers Campaign started and was fully funded in 30 hours
  Crowd Supply update about campaign start: https://www.crowdsupply.com/slimevr/slimevr-butterfly-trackers/updates/the-slimevr-butterfly-trackers-campaign-is-now-live
  Crowd Supply update about campaign getting funded: https://www.crowdsupply.com/slimevr/slimevr-butterfly-trackers/updates/were-funded-plus-q-and-a
- May 21, 2026 - SlimeVR Server was released on Steam.
  Server Steam page: https://store.steampowered.com/app/3245490/SlimeVR/

### Community

The open-source and DIY community spirit is essential to the experience we offer with SlimeVR, which is why one of our most important resources is the SlimeVR Discord server. It provides a valuable place for our users to not only turn to for help and guidance, but also develop their own SlimeVR tracker designs, implementations, software integrations, and more

## How to Talk About Us (Brand Voice Tips)

- Mention the most common uses: VR games (including social VR like VRChat), motion capture, and VTubing
- Emphasize that the project has a strong community drive, where get to contribute their thoughts and ideas, even manufacturing and selling their own parts and trackers
- Highlight that there are official trackers, a community marketplace, and the option to build your own set
- Mention that SlimeVR works well in small playspaces, as base stations or cameras are not needed
- Don't call it "just another full-body tracking" - we're community driven, open, affordable, and flexible

## Videos About SlimeVR

- https://youtu.be/0NMxdY1G0kY

### Butterfly Trackers Specific

- https://youtu.be/vBZreCeOmio

### Wi-Fi Trackers Specific

- https://youtu.be/G0du9c7doqs
- https://youtu.be/On8_1hrW7_g
- https://youtu.be/Pbm2pK8iEAA

## Quick Facts

- Founded: 2020 by Eiren and Polymoria
- Based in: Rotterdam, Netherlands
- Official stores: https://shop.slimevr.dev/ and https://www.crowdsupply.com/slimevr

## Leaders And Contributors

### Leaders
#### Polymoria
Co-founder
[Bluesky](https://bsky.app/profile/polymoria.bsky.social)
#### Eiren
Co-founder
[Bluesky](https://bsky.app/profile/eiren.io) | [Github](https://github.com/eirenliel)

### Contributors
https://slimevr.dev/team/

## Name Usage

The ‘S’ and the ‘VR’ are always capitalized. Always.
Good: SlimeVR
Not so good: slimeVR, SLIMEVR, Slime VR

### For Butterfly Trackers

The ‘B’ and t the "T" are always capitalized. Always.
Good: Butterfly
Not good: butterfly trackers, butterfly Trackers, Butterfly trackers

### More about trademark uses
https://slimevr.dev/tm/
## Contacts

- Website: https://slimevr.dev/
- Discord: https://discord.gg/SlimeVR
- Github: https://github.com/SlimeVR
- Support: support@slimevr.dev
- Bluesky: https://bsky.app/profile/slimevr.dev

%% Who is community manager or person to contact for marketing? %%
