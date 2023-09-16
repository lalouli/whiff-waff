import React from 'react'
import { motion } from "framer-motion";
import { ModelChannelsType } from "@/types/channelsConversation";
const ModelChannel = (props:ModelChannelsType) => {
    const { avatars } = props;

  const renderAvatars = () => {
    if (avatars.length === 2) {
      return (
        <div className="flex flex-col w-10 h-10 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20   -space-x-1 -space-y-2">
          <div className="w-[55%] h-[55%] flex rounded-[12px]  ">
            <img
              alt="user avatar"
              className="w-full h-full  rounded-[12px]  "
              src={avatars[0]}
            />
          </div>
          <div className="w-full h-[55%]  rounded-[12px] flex justify-end items-end">
            <img
              alt="user avatar"
              className="w-[55%] h-full rounded-[12px]"
              src={avatars[1]}
            />
          </div>
        </div>
      );
    } else if (avatars.length === 3) {
      return (
        <div className="flex flex-col w-10 h-10 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20   -space-y-2">
          <div className="w-full h-[55%] flex rounded-[12px]   -space-x-1">
            <img
              alt="user avatar"
              className="w-[50%] h-full  rounded-[12px]  "
              src={avatars[0]}
            />
            <img
              alt="user avatar"
              className="w-[50%] h-full  rounded-[12px]  "
              src={avatars[1]}
            />
          </div>
          <div className="w-full h-[55%]  rounded-[12px] flex justify-center items-center">
            <img
              alt="user avatar"
              className="w-[55%] h-full rounded-[12px]"
              src={avatars[2]}
            />
          </div>
        </div>);
    } else if (avatars.length >= 4) {
      return (
        <div className="flex flex-col w-10 h-10 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20  ">
          <div className="w-full h-[50%] flex rounded-[12px]   ">
            <img
              alt="user avatar"
              className="w-[50%] h-full  rounded-[12px]  "
              src={avatars[0]}
            />
            <img
              alt="user avatar"
              className="w-[50%] h-full  rounded-[12px]  "
              src={avatars[1]}
            />
          </div>
          <div className="w-full h-[50%]  rounded-[12px] flex ">
            <img
              alt="user avatar"
              className="w-[50%] h-full rounded-[12px]"
              src={avatars[2]}
            />
            {avatars.length === 4 ? (
              <img
              alt="user avatar"
              className="w-[50%] h-full rounded-[12px]"
              src={avatars[3]}
            />
              
            ) : (
              <span className="w-[50%] h-full rounded-[12px] bg-DeepRose font-teko flex items-center justify-center">
                {avatars.length}
              </span>
            )}
          </div>
        </div>
      );
    }
  
    return null;
  };

  return (
    <motion.div
    whileTap={{ backgroundColor: "#2e4169" }}
    className="h-16 md:h-[5rem] xl:h-[6.4rem] w-full  bg-[#351F60] bg-opacity-20 rounded-[12px] md:rounded-[20px] flex items-center justify-center flex-row md:space-x-2 2xl:space-x-4 px-2 "
  >
    <div className="w-10 h-10 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 flex rounded-[12px] 2xl:rounded-[20px] ">
      {renderAvatars()}
    </div>
    <div className="flex flex-row space-y-[3px] xl:w-[60%] 2xl:w-[60%]  gap-12">
      <div className=" w-[50%] lg:text-xl 2xl:text-3xl text-Mercury tracking-wider font-teko hidden md:block ">
        {props.channelName}
      </div>
      <div className="w-[50%] font-poppins font-light text-GreenishYellow 2xl:text-sm 3xl:text-lg hidden xl:block ">
        <div className='flex items-end justify-end'>
        {props.channelType}

        </div>
      </div>
    </div>
  </motion.div>
  )
}

export default ModelChannel