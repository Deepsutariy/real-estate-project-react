import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout1 from "../../Layouts/Layout1";
import { deleteRed } from "../../assets";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import { BACKEND_BASE_URL } from "../../apiInstances/baseurl";
import { toast } from "react-toastify";

const UserList = () => {
  const navigate = useNavigate();

  useEffect(() => {
    GetAllUserData();
  }, []);

  const GetAllUserData = async () => {
    await axiosInstanceAuth
      .get("admin/ViewAllUser")
      .then((res) => {
        const mydata = res?.data?.data;
        console.log("--------->>ViewAllUser", mydata);

        if (res?.data?.status) {
          setUsersInfo(mydata);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  const [DeleteConfirmation, setDeleteConfirmation] = useState(false);
  const [SelectedUser, setSelectedUser] = useState({});

  const ConfirmDelete = async (SelectedUser) => {
    await axiosInstanceAuth
      .post(`admin/User/delete/${SelectedUser?.id}`)
      .then((res) => {
        if (res?.data?.status) {
          GetAllUserData();
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

  const [UsersInfo, setUsersInfo] = useState([]);

  return (
    <>
      <Layout1>
        <div className="container mx-auto px-5 xl:px-0">
          {/* ---------- section 1  ---------- */}
          <div className="flex flex-col justify-start gap-5 bg-white rounded-2xl shadow-md p-4 md:p-6">
            <h1 className="text-[#404040] font-extrabold text-lg md:text-xl lg:text-2xl">
              All Users
            </h1>
          </div>

          {/* ---------- section 2  ---------- */}
          <div className="w-full flex flex-col justify-start bg-white rounded-2xl shadow-md  my-10">
            <div className="w-full flex justify-start gap-5 p-4">
              <div className="w-full text-[#262626] font-bold text-sm lg:text-base">
                Email
              </div>
              <div className="w-[20%] text-[#262626] font-bold text-sm lg:text-base">
                Action
              </div>
            </div>

            {UsersInfo?.length > 0 &&
              UsersInfo?.map((d, index) => (
                <div
                  key={index}
                  className="w-full flex justify-start items-center gap-5 p-4 border-t border-t-[#D4D4D4]"
                >
                  <div className="w-full text-[#262626] font-semibold text-sm lg:text-base">
                    {d?.email}
                  </div>

                  <div className="w-[20%] flex flex-row justify-center md:justify-start items-center gap-2">
                    <img
                      src={deleteRed}
                      alt="icon"
                      className="hidden md:block border border-[#FA979A] bg-[#FFEAEF] rounded-full p-2 cursor-pointer"
                      onClick={() => {
                        setDeleteConfirmation(true);
                        setSelectedUser(d);
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Layout1>

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
                    You want to Delete this Agent
                  </p>
                </div>

                {/* ------ Fotter ------ */}
                <div className="flex justify-center items-center m-5">
                  <button
                    className="bg-[#009600] text-white font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:bg-[#008500] hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mx-2"
                    type="button"
                    onClick={(e) => ConfirmDelete(SelectedUser)}
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

export default UserList;
