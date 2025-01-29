import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import isAuthenticated from "auth/auth";
import { nanoid } from "nanoid";
import axios from "../utils/axiosInterceptor.js";

const Rental = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchingData = () =>
      axios
        .get("http://localhost:5000/adminpanel/getVinyls")
        .then((response) => {
          const vinyls = response.data;
          setData(vinyls);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    fetchingData();
  }, []);

  const anyVinylAvailable = data?.every((vinyl) => vinyl.isReserved);

  return (
    <div>
      <h1 className="header-page-text mb-4">Discover the joy of Vinyl World</h1>
      <div className="global-centering">
        <h1 className="mb-4 font-extralight text-white text-xl">
          {anyVinylAvailable ? (
            <p>All vinyls have been reserved</p>
          ) : (
            <>
              {isAuthenticated() ? (
                <p>To proceed to the reservation, click on the vinyl</p>
              ) : (
                <p className="text-3xl ">
                  To access the vinyl inventory and reservations, please log in.
                </p>
              )}
            </>
          )}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {data
            ?.filter((vinyl) => !vinyl.isReserved)
            .map((vinyl) => {
              return (
                <div key={nanoid()}>
                  {isAuthenticated() ? (
                    <Link
                      key={vinyl._id}
                      to={`/rental/vinyl/${
                        vinyl._id
                      }?artist=${encodeURIComponent(
                        vinyl.artist
                      )}&title=${encodeURIComponent(vinyl.title)}`}
                    >
                      <div className="home-page-button rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 ease-in-out opacity-100">
                        <img
                          src={vinyl.image}
                          alt={vinyl.title}
                          className="w-full h-64 object-cover"
                        />
                        <div className="p-4 bg-gray-300 flex flex-col">
                          <p className="text-lg font-bold mb-2 text-black">
                            {vinyl.artist}
                          </p>
                          <p className="text-lg font-semibold mb-2 text-black">
                            {vinyl.title}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div
                      key={vinyl._id}
                      className="without-hover rounded-lg overflow-hidden shadow-md transition-all duration-200 ease-in-out opacity-100"
                    >
                      <img
                        src={vinyl.image}
                        alt={vinyl.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4 bg-gray-300">
                        <p className="text-lg font-bold mb-2 text-black">
                          {vinyl.artist} - {vinyl.title}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Rental;
