import React from "react";

function MovieDetailPage() {
  return (
    <div className="flex justify-center ">
      <div className="bg-[#2e2c2c] w-[80%] h-screen  ">
        <div className="top flex">
          <div className="right">
            <img
              src="https://image.tmdb.org/t/p/w342/kyeqWdyUXW608qlYkRqosgbbJyK.jpg"
              alt=""
              className="h-96 object-contain m-9"
            />
          </div>
          <div className="left  flex flex-col py-9">
            <div className="mt-auto text-white text-4xl font-bold">Any Div</div>
            <div className="mt-4 text-white text-lg">7.3⭐ | 2025 </div>

            <div className="mt-4 flex gap-3">
              <div className="bg-[#3e3e3e] text-white rounded-full py-1.5 px-2.5 hover:bg-[#353535]">
                Adventure
              </div>
              <div className="bg-[#3e3e3e] text-white rounded-full py-1.5 px-2.5 hover:bg-[#353535]">
                Action
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="bg-[#1a1a1a] w-[80%] p-4 border-l-8 border-black">
            <div className="text-white italic text-lg mb-2">Description:</div>
            <div className="text-gray-300 leading-relaxed">
              In the 22nd century, a paraplegic Marine is dispatched to the moon
              Pandora on a unique mission, but becomes torn between following
              orders and protecting an alien civilization.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;

// import React from "react";

// function MovieDetailPage() {
//   return (
//     <div className="flex justify-center">
//       <div className="bg-[#2e2c2c] w-[80%] h-screen text-white">
//         {/* 👇 Parent remains a simple flex container */}
//         <div className="top flex">
//           <div className="right">
//             <img
//               src="https://image.tmdb.org/t/p/w342/kyeqWdyUXW608qlYkRqosgbbJyK.jpg"
//               alt="Movie Poster"
//               className="h-96 object-contain m-9"
//             />
//           </div>

//           {/* This div is now a flex column */}
//           <div className="left flex flex-col py-9">
//             {/* 👇 This `mt-auto` pushes this div and the one below it
//                  to the bottom of the container.
//             */}
//             <div className="mt-auto">
//               <h1 className="text-4xl font-bold">Movie Title</h1>
//             </div>

//             <div className="mt-4 flex gap-x-2">
//               <span className="bg-gray-500 px-2 py-1 rounded-full text-sm">Action</span>
//               <span className="bg-gray-500 px-2 py-1 rounded-full text-sm">Adventure</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MovieDetailPage;
