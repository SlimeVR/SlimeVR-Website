import { Component, createSignal } from "solid-js";
import { Drawer, DrawerItem } from "../../components/commons/Drawer";
import { Typography } from "../../components/commons/Typogrtaphy";

const possibleImages = [
  "/images/Nighty_For_FAQ_Block first_.png",
  "/images/Nighty_For_FAQ_Block second_.png",
];

export const QASection: Component = () => {
  const [currentImage, setCurrentImage] = createSignal<string>(
    possibleImages[0]
  );

  const onOpenDrawer = (index: number, size: number) => {
    console.log("open", index);
    setCurrentImage(possibleImages[index % size] ?? possibleImages[0]);
  };

  return (
    <div class="flex gap-5 md:gap-12">
      <div class="md:flex min-w-56 S items-center justify-center pt-12 hidden">
        <img src={currentImage()} class="object-contain object-center"></img>
      </div>
      <div class="flex flex-col flex-grow gap-3">
        <Typography tag="h3" variant="main-title" textAlign="text-center">
          Q&A Section
        </Typography>
        <Drawer onOpen={onOpenDrawer}>
          <DrawerItem
            title={
              <Typography tag="h4" variant="section-title">
                How do SlimeVR Trackers work?
              </Typography>
            }
            open
          >
            <Typography tag="p">
              SlimeVR FBT provides simple, effective tracking of your body and
              limbs in VR games and other applications. it makes full-body
              tracking comfortable and affordable by leveraging high-quality
              inertial measurement unit (IMU) sensors and a Wi-Fi connection to
              your PC rather than wires, cameras, or base stations. Taking the
              Lower-body set as an example, five trackers—one on each thigh,
              another on each ankle, and a fifth at the chest—are enough to get
              the job done. Each tracker monitors its own rotation in space, and
              SlimeVR software uses your proportions and headset location to
              calculate joint angles and estimate limb positions. In more
              technical terms, SlimeVR relies on absolute-orientation sensors, a
              configurable skeleton model, and forward kinematics. The result is
              like having virtual Vive trackers at key locations on your body.
            </Typography>
          </DrawerItem>
          <DrawerItem
            title={
              <Typography tag="h4" variant="section-title">
                How do SlimeVR Trackers work? 2
              </Typography>
            }
          >
            <Typography tag="p">
              SlimeVR FBT provides simple, effective tracking of your body and
              limbs in VR games and other applications. it makes full-body
              tracking comfortable and affordable by leveraging high-quality
              inertial measurement unit (IMU) sensors and a Wi-Fi connection to
              your PC rather than wires, cameras, or base stations. Taking the
              Lower-body set as an example, five trackers—one on each thigh,
              another on each ankle, and a fifth at the chest—are enough to get
              the job done. Each tracker monitors its own rotation in space, and
              SlimeVR software uses your proportions and headset location to
              calculate joint angles and estimate limb positions. In more
              technical terms, SlimeVR relies on absolute-orientation sensors, a
              configurable skeleton model, and forward kinematics. The result is
              like having virtual Vive trackers at key locations on your body.
            </Typography>
          </DrawerItem>
          <DrawerItem
            title={
              <Typography tag="h4" variant="section-title">
                How do SlimeVR Trackers work? 2
              </Typography>
            }
          >
            <Typography tag="p">
              SlimeVR FBT provides simple, effective tracking of your body and
              limbs in VR games and other applications. it makes full-body
              tracking comfortable and affordable by leveraging high-quality
              inertial measurement unit (IMU) sensors and a Wi-Fi connection to
              your PC rather than wires, cameras, or base stations. Taking the
              Lower-body set as an example, five trackers—one on each thigh,
              another on each ankle, and a fifth at the chest—are enough to get
              the job done. Each tracker monitors its own rotation in space, and
              SlimeVR software uses your proportions and headset location to
              calculate joint angles and estimate limb positions. In more
              technical terms, SlimeVR relies on absolute-orientation sensors, a
              configurable skeleton model, and forward kinematics. The result is
              like having virtual Vive trackers at key locations on your body.
            </Typography>
          </DrawerItem>
        </Drawer>
      </div>
    </div>
  );
};
