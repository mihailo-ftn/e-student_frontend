import React from "react";

export const IndexSideCard = ({ post }: any) => {
  return (
    <div className="flex w-full py-4 border-b border-gray-300">
      <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full"></span>
      <div className="flex flex-col flex-grow ml-2">
        <div className="flex text-sm">
          <span className="font-semibold">{post.creator.firstName}</span>
          <span className="ml-1 font-semibold">{post.creator.lastName}</span>
        </div>
        <p className="mt-1 text-sm">{post.text}</p>
      </div>
    </div>
  );
};
