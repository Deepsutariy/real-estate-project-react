import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout1 from "../../Layouts/Layout1";
import { add, deleteRed, editRed, searchGray, threeDot } from "../../assets";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import { BACKEND_BASE_URL } from "../../apiInstances/baseurl";
import { toast } from "react-toastify";

const AgencyList = () => {
  const navigate = useNavigate();

  useEffect(() => {
    GetAllAgencyData();
  }, []);

  const GetAllAgencyData = async () => {
    await axiosInstanceAuth
      .get("admin/ViewAllAgency")
      .then((res) => {
        const mydata = res?.data?.data;
        // console.log("--------->>ViewAllAgency", mydata);
        if (res?.data?.status) {
          setAgenciesInfo(mydata);
        } else {
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  const SearchAgency = async (search) => {
    // await axiosInstanceAuth
    //   .post(`searchAgency`, {
    //     key: search,
    //   })
    //   .then((res) => {
    //     const mydata = res?.data?.data;
    //     if (res?.data?.status) {
    //       setAgenciesInfo(mydata);
    //     } else {
    //       toast.error("Oops! Something went wrong");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("err --->", err);
    //   });
  };

  const [IsOpenModel, setIsOpenModel] = useState(false);
  const [DeleteConfirmation, setDeleteConfirmation] = useState(false);
  const [SelectedAgency, setSelectedAgency] = useState({});

  const handelDelete = () => {
    setIsOpenModel(false);
    setDeleteConfirmation(true);
  };

  const handelEdit = (SelectedAgency) => {
    setIsOpenModel(false);
    navigate(`/Agency/edit/${SelectedAgency?.id}`);
  };

  const ConfirmDelete = async (SelectedAgency) => {
    await axiosInstanceAuth
      .post(`admin/agency/delete/${SelectedAgency?.id}`)
      .then((res) => {
        if (res?.data?.status) {
          GetAllAgencyData();
          toast.success(res?.data?.message);
        } else {
          toast.error(res?.data?.message);
        }
        setDeleteConfirmation(false);
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  const [AgenciesInfo, setAgenciesInfo] = useState([
    // {
    //   _id: "6401945061bdf550871744ae",
    //   profileImg:
    //     "https://i2.au.reastatic.net/340x64-format=avif/a30614bfd1e68f2d0dadf788db4836e8ef26c4b9a772666a6fa11058d4e19de8/logo.jpg",
    //   principal_name: "Harcourts",
    //   display_email: "harcourts@realestate.com.au",
    // },
    // {
    //   _id: "1fdsgdg3579adgjjl2468qwyu",
    //   profileImg:
    //     "https://i2.au.reastatic.net/340x64-format=avif/496fb02069987aea95f85f930c046077ec5d80f5f2214750e14e7f51b433fd97/logo.jpg",
    //   principal_name: "Prime Agents",
    //   display_email: "primeagents@realestate.com.au",
    // },
    // {
    //   _id: "wvy13yku579adgjlrty2468qwyu",
    //   profileImg:
    //     "https://i2.au.reastatic.net/340x64-format=avif/c6d87fc6892fd6794838c9d43c5399596f6394119f147d33e41cc0521b7c2f11/logo.jpg",
    //   principal_name: "Century 21",
    //   display_email: "century21@realestate.com.au",
    // },
    // {
    //   _id: "6401945061bdf550871744ae",
    //   profileImg:
    //     "https://i2.au.reastatic.net/340x64-format=avif/ef65336d4a887e3597c38a4e892e58161f3085704c98c200e5ed24006138ef63/logo.gif",
    //   principal_name: "JTH Property",
    //   display_email: "jth@realestate.com.au",
    // },
  ]);
  return (
    <>
      <Layout1>
        <div className="container mx-auto px-5 xl:px-0">
          {/* ---------- section 1  ---------- */}
          <div className="flex flex-col justify-start gap-5 bg-white rounded-2xl shadow-md p-4 md:p-6">
            <h1 className="text-[#404040] font-extrabold text-lg md:text-xl lg:text-2xl">
              Your Agencies
            </h1>

            <div className="col-span-1 2xl:col-span-2 flex flex-row justify-start items-center gap-3">
              <div className="w-full md:h-12 flex justify-start items-center gap-2 border border-[#E5E5E5] rounded-3xl py-3 px-5 cursor-pointer">
                <img src={searchGray} alt="icon" className="w-3 lg:w-4" />
                <input
                  type="text"
                  onChange={(e) => {
                    SearchAgency(e.target.value);
                  }}
                  placeholder="Enter Property ID, Addres or Superb..."
                  className="w-full text-[#A3A3A3]  text-xs md:text-sm outline-none"
                />
              </div>

              <div className="border border-[#E5002A] bg-[#E5002A] rounded-3xl py-2 px-5 cursor-pointer">
                <div className="text-white font-medium text-xs md:text-sm lg:text-base">
                  Search
                </div>
              </div>
            </div>

            <div className="col-span-1 grid place-content-end">
              <div
                className="flex justify-center items-center gap-2 border border-[#E5002A] bg-[#E5002A] rounded-3xl py-2 px-4 cursor-pointer"
                onClick={() => navigate(`/agency/add`)}
              >
                <img src={add} alt="icon" className="w-3 lg:w-4" />
                <div className="text-white font-medium text-xs md:text-sm lg:text-base">
                  Add Agency
                </div>
              </div>
            </div>
          </div>

          {/* ---------- section 2  ---------- */}
          <div className="w-full flex flex-col justify-start bg-white rounded-2xl shadow-md  my-10">
            <div className="w-full flex justify-start gap-5 p-4">
              <div className="w-[40%] md:w-[15%] text-[#262626] font-bold text-sm lg:text-base">
                Logo
              </div>
              <div className="w-full md:w-[20%] text-[#262626] font-bold text-sm lg:text-base">
                Name
              </div>
              <div className="hidden md:block w-full text-[#262626] font-bold text-sm lg:text-base">
                Email
              </div>
              <div className="hidden w-[40%] md:w-[15%] text-[#262626] font-bold text-sm lg:text-base">
                Status
              </div>
              <div className="w-[20%] text-[#262626] font-bold text-sm lg:text-base">
                Action
              </div>
            </div>

            {AgenciesInfo?.length > 0 &&
              AgenciesInfo?.map((d, index) => (
                <div
                  key={index}
                  className="w-full flex justify-start items-center gap-5 p-4 border-t border-t-[#D4D4D4]"
                >
                  <div className="w-[40%] md:w-[15%]">
                    <img
                      src={`${BACKEND_BASE_URL}${d?.agencyLargeLogo}`}
                      alt=""
                      className="rounded-lg"
                    />
                  </div>
                  <div className="w-full md:w-[20%] text-[#262626] font-semibold text-sm lg:text-base">
                    {d?.principal_name}
                  </div>
                  <div className="hidden md:block w-full text-[#262626] font-medium text-xs md:text-sm lg:text-base">
                    {d?.display_email}
                  </div>
                  <div className="w-[20%] flex flex-row justify-center md:justify-start items-center gap-2">
                    <img
                      src={editRed}
                      alt=""
                      className="hidden md:block border border-[#FA979A] bg-[#FFEAEF] rounded-full p-2 cursor-pointer"
                      onClick={() => navigate(`/agency/edit/${d?.id}`)}
                    />
                    <img
                      src={deleteRed}
                      alt=""
                      className="hidden md:block border border-[#FA979A] bg-[#FFEAEF] rounded-full p-2 cursor-pointer"
                      onClick={() => {
                        setDeleteConfirmation(true);
                        setSelectedAgency(d);
                      }}
                    />
                    <img
                      src={threeDot}
                      alt=""
                      className="block md:hidden border border-[#FA979A] bg-[#FFEAEF] rounded-full p-[5px] sm:p-2 cursor-pointer"
                      onClick={(e) => {
                        setIsOpenModel(true);
                        setSelectedAgency(d);
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Layout1>
      {/* ----------- Agent Action Model ----------- */}

      {IsOpenModel === true && (
        <div className="block md:hidden fixed top-0 bottom-0 z-[9999999999999] backdrop-brightness-50 w-full h-full">
          <div className="fixed bottom-0 left-0 right-0 outline-none bg-white rounded-t-3xl shadow-2xl">
            {/* ------ Header ------ */}
            <div className="flex flex-col justify-center items-center mx-5">
              <div
                className="w-[15%] border-4 border-[#737373] rounded-full my-5 cursor-pointer"
                onClick={() => setIsOpenModel(false)}
              />
              <div className="w-full flex justify-start items-start gap-2 my-4">
                <div className="w-16 text-[#262626] font-bold text-xs sm:text-sm lg:text-base">
                  Email :-
                </div>
                <div className="w-full text-[#262626] font-medium text-xs sm:text-sm lg:text-base">
                  {SelectedAgency?.display_email}
                </div>
              </div>

              <div className="w-full border border-[#D4D4D4]" />

              <div className="w-full flex justify-center items-center gap-2 my-5">
                <div
                  className="w-full text-center text-white font-medium text-sm border border-[#E5002A] bg-[#E5002A] rounded-3xl py-3 px-5 cursor-pointer"
                  onClick={(e) => handelDelete(SelectedAgency)}
                >
                  Delete
                </div>
                <div
                  className="w-full text-center font-medium text-sm border border-[#E5002A] bg-[#FFEAEF] text-[#E5002A] rounded-3xl py-3 px-5 cursor-pointer"
                  onClick={(e) => handelEdit(SelectedAgency)}
                >
                  Edit
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -----------Delete Confirmation Pop Up ----------- */}
      {DeleteConfirmation === true && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999]  outline-none focus:outline-none border ">
            <div className="relative min-w-[285px] md:min-w-[350px] max-w-[90%] mx-auto  my-10 shadow-black shadow-2xl">
              {/* ------ Content ------ */}
              <div className="border-0 rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* ------ Header ------ */}
                <div className="grid place-items-center place-content-end">
                  <button
                    className="bg-transparent border-0 text-black opacity-9 text-2xl font-normal outline-none focus:outline-none mx-3 my-2"
                    onClick={(e) => setDeleteConfirmation(false)}
                  >
                    ×
                  </button>
                </div>
                {/* ------ Body ------ */}
                <div className="relative grid place-items-center px-6 md:px-10 py-4 flex-auto">
                  <h3 className="text-black font-semibold text-lg md:text-xl  leading-relaxed text-center mt-2">
                    Are You Sure ?
                  </h3>
                  <p className="text-black font-medium text-sm md:text-base leading-normal text-center mt-3">
                    You want to Delete this Agency
                  </p>
                </div>

                {/* ------ Fotter ------ */}
                <div className="flex justify-center items-center m-5">
                  <button
                    className="bg-[#009600] text-white font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:bg-[#008500] hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mx-2"
                    type="button"
                    onClick={(e) => ConfirmDelete(SelectedAgency)}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-[#E5002A] text-white font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:bg-[#D80022] hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mx-2"
                    type="button"
                    onClick={(e) => setDeleteConfirmation(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default AgencyList;
