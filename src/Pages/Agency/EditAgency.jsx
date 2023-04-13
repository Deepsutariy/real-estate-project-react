import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import {
  questionMark,
  searchGray,
  agencyLargeLogo,
  AgencyLogo,
  agencyMediumLogo,
  agencySmallLogo,
  commercialAgencyExtraLargeLogo,
  commercialAgencyLargeLogo,
  commercialAgencyMediumLogo,
  commercialAgencySmallLogo,
  heroImg,
} from "../../assets";
import Layout1 from "../../Layouts/Layout1";
import { BACKEND_BASE_URL } from "../../apiInstances/baseurl";
import { TextColor } from "../../Constants";
import axiosInstanceAuthFormData from "../../apiInstances/axiosInstanceAuthFormData";

const EditAgency = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    GetAgencyBranding(id);
  }, []);

  const GetAgencyBranding = async (id) => {
    await axiosInstanceAuth
      .get(`admin/Agency/view/${id}`)
      .then((res) => {
        const mydata = res?.data?.data;
        if (res?.data?.status) {
          setAgencyProfileDetails(mydata);
          setAgentImages({
            ...AgentImages,
            agencySmallLogo: mydata?.agencySmallLogo,
            agencyMediumLogo: mydata?.agencyMediumLogo,
            agencyLargeLogo: mydata?.agencyLargeLogo,
            commercialAgencySmallLogo: mydata?.commercialAgencySmallLogo,
            commercialAgencyMediumLogo: mydata?.commercialAgencyMediumLogo,
            commercialAgencyLargeLogo: mydata?.commercialAgencyLargeLogo,
            commercialAgencyExtraLargeLogo:
              mydata?.commercialAgencyExtraLargeLogo,
            heroImg: mydata?.heroImg,
          });

          setAgencyBranding({
            ...AgencyBranding,
            text_color: mydata?.text_color,
            primary_color: mydata?.primary_color,
            secondary_color: mydata?.secondary_color,
          });
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [Credentials, setCredentials] = useState("");
  const [textAreaLength, setTextAreaLength] = useState();
  const [AgencyProfileDetails, setAgencyProfileDetails] = useState({
    street: "",
    suburb_area: "",
    postcode: "",
    state_region: "",
    country: "",
    mailing_address_street: "",
    mailing_address_suburb_area: "",
    mailing_address_postcode: "",
    mailing_address_state_region: "",
    mailing_address_country: "",
    fax: "",
    phone: "",
    email: "",
    web: "",
    facebook_page: "",
    twitter_profile_url: "",
    principal_name: "",
    display_email: "",
    office_description: "",
  });

  const [AgentImages, setAgentImages] = useState({
    agencySmallLogo: null,
    agencySmallLogoShow: null,
    agencyMediumLogo: null,
    agencyMediumLogoShow: null,
    agencyLargeLogo: null,
    agencyLargeLogoShow: null,
    commercialAgencySmallLogo: null,
    commercialAgencySmallLogoShow: null,
    commercialAgencyMediumLogo: null,
    commercialAgencyMediumLogoShow: null,
    commercialAgencyLargeLogo: null,
    commercialAgencyLargeLogoShow: null,
    commercialAgencyExtraLargeLogo: null,
    commercialAgencyExtraLargeLogoShow: null,
    heroImg: null,
    heroImgShow: null,
  });

  const [AgencyBranding, setAgencyBranding] = useState({
    text_color: "black",
    primary_color: "",
    secondary_color: "",
  });

  const onChangeImages = (e) => {
    const { name } = e.target;
    setAgentImages({
      ...AgentImages,
      [name]: e.target.files[0],
      [`${name}Show`]: URL.createObjectURL(e.target.files[0]),
    });
  };

  const onChangeAllImages = (e) => {
    const { name } = e.target;

    if (e.target.files?.length < 3) {
      toast.error("Please upload All Logo");
    } else {
      setAgentImages({
        ...AgentImages,
        agencySmallLogo: e.target.files[0],
        agencySmallLogoShow: URL.createObjectURL(e.target.files[0]),
        agencyMediumLogo: e.target.files[1],
        agencyMediumLogoShow: URL.createObjectURL(e.target.files[1]),
        agencyLargeLogo: e.target.files[2],
        agencyLargeLogoShow: URL.createObjectURL(e.target.files[2]),
      });
    }
  };

  const onChangeAllCommercialImages = (e) => {
    const { name } = e.target;

    if (e.target.files?.length < 4) {
      toast.error("Please upload All Commercial Logo");
    } else {
      setAgentImages({
        ...AgentImages,
        commercialAgencySmallLogo: e.target.files[0],
        commercialAgencySmallLogoShow: URL.createObjectURL(e.target.files[0]),
        commercialAgencyMediumLogo: e.target.files[1],
        commercialAgencyMediumLogoShow: URL.createObjectURL(e.target.files[1]),
        commercialAgencyLargeLogo: e.target.files[2],
        commercialAgencyLargeLogoShow: URL.createObjectURL(e.target.files[2]),
        commercialAgencyExtraLargeLogo: e.target.files[3],
        commercialAgencyExtraLargeLogoShow: URL.createObjectURL(
          e.target.files[3]
        ),
      });
    }
  };

  const onDeleteImages = (e) => {
    setAgentImages({
      ...AgentImages,
      [e]: null,
      [`${e}Show`]: null,
    });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setAgencyBranding({ ...AgencyBranding, [name]: value });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setAgencyProfileDetails({ ...AgencyProfileDetails, [name]: value });
  };

  const EditAgency = async () => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("street", AgencyProfileDetails?.street);
      formData.append("suburb_area", AgencyProfileDetails?.suburb_area);
      formData.append("postcode", AgencyProfileDetails?.postcode);
      formData.append("state_region", AgencyProfileDetails?.state_region);
      formData.append("country", AgencyProfileDetails?.country);
      formData.append(
        "mailing_address_street",
        AgencyProfileDetails?.mailing_address_street
      );
      formData.append(
        "mailing_address_suburb_area",
        AgencyProfileDetails?.mailing_address_suburb_area
      );
      formData.append(
        "mailing_address_postcode",
        AgencyProfileDetails?.mailing_address_postcode
      );
      formData.append(
        "mailing_address_state_region",
        AgencyProfileDetails?.mailing_address_state_region
      );
      formData.append(
        "mailing_address_country",
        AgencyProfileDetails?.mailing_address_country
      );
      formData.append("fax", AgencyProfileDetails?.fax);
      formData.append("phone", AgencyProfileDetails?.phone);
      formData.append("email", AgencyProfileDetails?.email);
      formData.append("web", AgencyProfileDetails?.web);
      formData.append("facebook_page", AgencyProfileDetails?.facebook_page);
      formData.append(
        "twitter_profile_url",
        AgencyProfileDetails?.twitter_profile_url
      );
      formData.append("principal_name", AgencyProfileDetails?.principal_name);
      formData.append("display_email", AgencyProfileDetails?.display_email);
      formData.append(
        "office_description",
        AgencyProfileDetails?.office_description
      );
      formData.append("text_color", AgencyBranding?.text_color);
      formData.append("primary_color", AgencyBranding?.primary_color);
      formData.append("secondary_color", AgencyBranding?.secondary_color);
      formData.append("agencySmallLogo", AgentImages?.agencySmallLogo);
      formData.append("agencyMediumLogo", AgentImages?.agencyMediumLogo);
      formData.append("agencyLargeLogo", AgentImages?.agencyLargeLogo);
      formData.append(
        "commercialAgencySmallLogo",
        AgentImages?.commercialAgencySmallLogo
      );
      formData.append(
        "commercialAgencyMediumLogo",
        AgentImages?.commercialAgencyMediumLogo
      );
      formData.append(
        "commercialAgencyLargeLogo",
        AgentImages?.commercialAgencyLargeLogo
      );
      formData.append(
        "commercialAgencyExtraLargeLogo",
        AgentImages?.commercialAgencyExtraLargeLogo
      );
      formData.append("heroImg", AgentImages?.heroImg);

      await axiosInstanceAuthFormData
        .post(`admin/agency/edit/${id}`, formData)
        .then((res) => {
          if (res?.data?.status) {
            toast.success("Agency Edited Successfuly");
            navigate(`/agency`);
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log("------>> Error", err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout1>
      <div className="w-full bg-white rounded-t-xl">
        <div className="bg-[#E5002A] text-white font-semibold text-sm md:text-base lg:text-lg rounded-t-xl p-5">
          Edit Agency Profile
        </div>

        <div className="p-6">
          <div className="text-black font-semibold text-sm md:text-base lg:text-lg my-4 mb-8">
            Mandatory fields are marked with an asterisk (
            <span className="text-[#E5002A]">*</span>)
          </div>

          {/* -------- credentials -------- */}
          <div className="font-semibold text-[#E5002A] my-5 md:my-8">
            Credentials
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm ">
                Email :<span className="px-1 text-red-500">*</span>
              </div>

              <input
                type="email"
                value={AgencyProfileDetails?.email}
                name="email"
                onChange={onInputChange}
                placeholder="Enter Email"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
            </div>
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Password :<span className="px-1 text-red-500">*</span>
              </div>
              <input
                type="password"
                value={Credentials?.password}
                name="password"
                onChange={(e) => {
                  setCredentials(e?.target?.value);
                }}
                placeholder="Enter Password"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
            </div>
          </div>

          {/* -------- Address -------- */}
          <div className="font-semibold text-[#E5002A] my-5 md:my-8">
            Address
          </div>
          <div className="">
            <div className="font-medium text-[#171717] text-xs md:text-sm">
              Street : <span className="px-1 text-[#E5002A]">*</span>
            </div>
            <input
              type="text"
              value={AgencyProfileDetails?.street}
              name="street"
              onChange={onInputChange}
              placeholder="Enter street"
              className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-3xl py-3 px-5  mt-3"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm ">
                Suburb/Area :<span className="px-1 text-red-500">*</span>
              </div>

              <input
                type="text"
                value={AgencyProfileDetails?.suburb_area}
                name="suburb_area"
                onChange={onInputChange}
                placeholder="Enter suburb area"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
            </div>
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Postcode :<span className="px-1 text-red-500">*</span>
              </div>
              <input
                type="number"
                value={AgencyProfileDetails?.postcode}
                name="postcode"
                onChange={onInputChange}
                placeholder="Enter postcode"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm ">
                State/Region :<span className="px-1 text-red-500">*</span>
              </div>
              <select
                name="state_region"
                value={AgencyProfileDetails?.state_region}
                onChange={onInputChange}
                className="w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              >
                <option value="">Select state / region</option>
                <option value="Western Australia">Western Australia</option>
                <option value="South Australia">South Australia</option>
              </select>
            </div>
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Country :<span className="px-1 text-red-500">*</span>
              </div>
              <select
                name="country"
                value={AgencyProfileDetails?.country}
                onChange={onInputChange}
                className="w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              >
                <option value="">Select country</option>
                <option value="Australia">Australia</option>
                <option value="United States">United States</option>
              </select>
            </div>
          </div>
          {/* -------- Mailing Address -------- */}
          <div className="font-semibold text-[#E5002A] my-5 md:my-8">
            Mailing Address
          </div>
          <div className="font-medium text-[#737373] text-xs md:text-sm mb-4">
            These fields will only display on your specialized agency website.
            To update your agency billing address please contact Customer Care.
          </div>
          <div className="">
            <div className="font-medium text-[#171717] text-xs md:text-sm">
              Street/P.O. Box :
            </div>
            <input
              type="text"
              value={AgencyProfileDetails?.mailing_address_street}
              name="mailing_address_street"
              onChange={onInputChange}
              placeholder="Enter street"
              className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-3xl py-3 px-5  mt-3"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm ">
                Suburb/Area :
              </div>

              <input
                type="text"
                value={AgencyProfileDetails?.mailing_address_suburb_area}
                name="mailing_address_suburb_area"
                onChange={onInputChange}
                placeholder="Enter suburb area"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
            </div>
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Postcode :
              </div>
              <input
                type="number"
                value={AgencyProfileDetails?.mailing_address_postcode}
                name="mailing_address_postcode"
                onChange={onInputChange}
                placeholder="Enter postcode"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm ">
                State/Region :<span className="px-1 text-red-500">*</span>
              </div>
              <select
                name="mailing_address_state_region"
                value={AgencyProfileDetails?.mailing_address_state_region}
                onChange={onInputChange}
                className="w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              >
                <option value="">Select state / region</option>
                <option value="Western Australia">Western Australia</option>
                <option value="South Australia">South Australia</option>
              </select>
            </div>
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Country :<span className="px-1 text-red-500">*</span>
              </div>
              <select
                name="mailing_address_country"
                value={AgencyProfileDetails?.mailing_address_country}
                onChange={onInputChange}
                className="w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              >
                <option value="">Select country</option>
                <option value="Australia">Australia</option>
                <option value="United States">United States</option>
              </select>
            </div>
          </div>
          {/* -------- Contact Info -------- */}
          <div className="font-semibold text-[#E5002A] my-5 md:my-8">
            Contact Info
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm ">
                Fax :
              </div>
              <input
                type="text"
                value={AgencyProfileDetails?.fax}
                name="fax"
                onChange={onInputChange}
                placeholder="Enter fax"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
              <div className="text-[#737373] text-xs md:text-sm p-2 ">
                If supplying a fax number, please include prefix as above.
              </div>
            </div>
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Phone : <span className="px-1 text-red-500">*</span>
              </div>
              <input
                type="number"
                value={AgencyProfileDetails?.phone}
                name="phone"
                onChange={onInputChange}
                placeholder="Enter phone"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
              <div className="text-[#737373] text-xs md:text-sm p-2 ">
                (Please include prefix, eg. 03 9555 1777 for Australian Agents,
                or 9 2673656 for New Zealand Agents.)
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm ">
                Email : <span className="px-1 text-red-500">*</span>
              </div>
              <input
                type="email"
                value={AgencyProfileDetails?.email}
                name="email"
                onChange={onInputChange}
                placeholder="Enter email"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
            </div>
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Web :
              </div>
              <input
                type="text"
                value={AgencyProfileDetails?.web}
                name="web"
                onChange={onInputChange}
                placeholder="Enter web"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm ">
                Facebook Page :
              </div>
              <div className="w-full flex flex-row justify-start items-center gap-2 mt-3">
                <input
                  type="text"
                  value={AgencyProfileDetails?.facebook_page}
                  name="facebook_page"
                  onChange={onInputChange}
                  placeholder="Enter facebook page"
                  className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5"
                />
                <img
                  src={questionMark}
                  alt="icon"
                  className="w-5 cursor-pointer"
                />
              </div>
              <div className="text-[#3B8FD4] font-semibold text-xs md:text-sm p-2 cursor-pointer">
                More about Facebook
              </div>
            </div>
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Twitter Profile URL :
              </div>
              <div className="w-full flex flex-row justify-start items-center gap-2 mt-3">
                <input
                  type="text"
                  value={AgencyProfileDetails?.twitter_profile_url}
                  name="twitter_profile_url"
                  onChange={onInputChange}
                  placeholder="Enter twitter profile url"
                  className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5"
                />
                <img
                  src={questionMark}
                  alt="icon"
                  className="w-5 cursor-pointer"
                />
              </div>
              <div className="text-[#3B8FD4] font-semibold text-xs md:text-sm p-2 cursor-pointer">
                More about Twitter
              </div>
            </div>
          </div>
          {/* -------- Wbsite Link -------- */}
          <div className="font-semibold text-[#E5002A] my-5 md:my-8">
            These fields will only display on your specialised agency website
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm ">
                Principal Name :
              </div>
              <input
                type="text"
                value={AgencyProfileDetails?.principal_name}
                name="principal_name"
                onChange={onInputChange}
                placeholder="Enter your principal name"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
            </div>
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Display Email :
              </div>
              <input
                type="text"
                value={AgencyProfileDetails?.display_email}
                name="display_email"
                onChange={onInputChange}
                placeholder="Enter your display email"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
            </div>
          </div>
          {/* -------- Office Description -------- */}
          <div className="font-semibold text-[#E5002A] my-5 md:my-8">
            Office Description
          </div>

          <div className="font-medium text-[#737373] text-xs md:text-sm lg:text-base">
            The description is used as part of the{`  `}
            <span className="text-[#3B8FD4] font-semibold cursor-pointer">
              Feature Agent Package
            </span>
            {`  `}& for Platinum subscribers.
          </div>

          <div className="text-[#262626] text-xs md:text-sm lg:text-base font-semibold cursor-pointer">
            Office Description
          </div>

          <div className="mt-4 md:mt-6">
            <div className="font-medium text-[#171717] text-xs md:text-sm">
              Limited to 700 characters. No HTML tags.
            </div>
            <textarea
              rows={6}
              type="text"
              value={AgencyProfileDetails?.office_description}
              name="office_description"
              onChange={(e) => {
                const { name, value } = e.target;
                setAgencyProfileDetails({
                  ...AgencyProfileDetails,
                  [name]: value,
                });
                setTextAreaLength(value.split("").length);
              }}
              placeholder="Enter office description"
              className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-xl py-3 px-5  mt-3"
            />
            {textAreaLength < 701 ? (
              <div className="font-medium text-[#171717] text-xs px-2">
                Characters left: {`  `}
                {textAreaLength !== undefined ? `${textAreaLength - 700}` : 0}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col justify-start bg-white rounded-b-2xl shadow-md text-[#404040] font-medium p-6 mb-10">
        {/* ----------- Upload agency logo ---------- */}

        <div className="my-2">
          <div className="w-full border border-[#E5E5E5]" />

          <div className="text-black font-semibold text-base md:text-xl lg:text-2xl my-3 md:my-5">
            Upload agency logo
          </div>
          <div className="w-full border border-[#E5E5E5]" />

          <div className="font-medium text-xs md:text-sm lg:text-base my-3 md:my-5">
            <div>
              Upload the agency logo that you would like to appear on the
              website. Logos must meet our
              <span className="px-2 text-[#3B8FD4] cursor-pointer">
                Acceptable use policy.
              </span>
            </div>
            <div>
              <span className="font-semibold text-[#262626]">JPG, GIF</span>
              {` `}or{` `}
              <span className="font-semibold text-[#262626]">PNG</span>
              {` `} formats only.
            </div>
          </div>

          <div className="border border-[#262626] rounded-lg p-6">
            <div className="flex justify-start items-end gap-2 text-xs md:text-sm lg:text-base text-[#525252]">
              We will resize your logo to the required sizes (For best results
              upload as 510px by 96px).
              <img
                src={questionMark}
                alt="icon"
                className="w-4 md:w-5 mx-1 cursor-pointer"
              />
            </div>

            <div className="w-full flex justify-center md:justify-start items-center  text-white text-xs md:text-sm my-4 md:my-6">
              <label
                htmlFor="allLogos"
                className="cursor-pointer py-2 px-5 bg-[#E5002A] rounded-3xl"
                onClick={() => {}}
              >
                Upload and replace all logos
                <input
                  id="allLogos"
                  type="file"
                  multiple
                  name="allLogos"
                  onChange={onChangeAllImages}
                />
              </label>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center md:items-end gap-5">
              {/* ----- Small Logo ----- */}
              <div className="flex flex-col justify-center items-center gap-4">
                {AgentImages?.agencySmallLogoShow ? (
                  <img
                    src={AgentImages?.agencySmallLogoShow}
                    alt="profile"
                    className="border-2 border-dashed border-black rounded-lg"
                  />
                ) : AgentImages?.agencySmallLogo ? (
                  <img
                    src={`${BACKEND_BASE_URL}${AgentImages?.agencySmallLogo}`}
                    alt=""
                    className="border-2 border-dashed border-black rounded-2xl"
                  />
                ) : (
                  <img
                    src={agencySmallLogo}
                    alt=""
                    className="border-2 border-dashed border-black rounded-2xl"
                  />
                )}

                <div className="w-full text-center text-[#3B8FD4] font-medium text-sm md:text-base">
                  <label
                    htmlFor="agencySmallLogo"
                    className="px-2 cursor-pointer"
                    onClick={() => {}}
                  >
                    Replace
                    <input
                      id="agencySmallLogo"
                      type="file"
                      name="agencySmallLogo"
                      onChange={onChangeImages}
                    />
                  </label>
                  |
                  <span
                    className="px-2 cursor-pointer"
                    onClick={(e) => onDeleteImages(`agencySmallLogo`)}
                  >
                    Delete
                  </span>
                </div>
              </div>

              {/* ----- Medium Logo ----- */}

              <div className="flex flex-col justify-center items-center gap-4">
                {AgentImages?.agencyMediumLogoShow ? (
                  <img
                    src={AgentImages?.agencyMediumLogoShow}
                    alt="profile"
                    className="border-2 border-dashed border-black rounded-lg"
                  />
                ) : AgentImages?.agencyMediumLogo ? (
                  <img
                    src={`${BACKEND_BASE_URL}${AgentImages?.agencyMediumLogo}`}
                    alt=""
                    className="border-2 border-dashed border-black rounded-2xl"
                  />
                ) : (
                  <img
                    src={agencyMediumLogo}
                    alt=""
                    className="border-2 border-dashed border-black rounded-2xl"
                  />
                )}

                <div className="w-full text-center text-[#3B8FD4] font-medium text-sm md:text-base">
                  <label
                    htmlFor="agencyMediumLogo"
                    className="px-2 cursor-pointer"
                    onClick={() => {}}
                  >
                    Replace
                    <input
                      id="agencyMediumLogo"
                      type="file"
                      name="agencyMediumLogo"
                      onChange={onChangeImages}
                    />
                  </label>
                  |
                  <span
                    className="px-2 cursor-pointer"
                    onClick={(e) => onDeleteImages(`agencyMediumLogo`)}
                  >
                    Delete
                  </span>
                </div>
              </div>

              {/* ----- Large Logo ----- */}

              <div className="flex flex-col justify-center items-center gap-4">
                {AgentImages?.agencyLargeLogoShow ? (
                  <img
                    src={AgentImages?.agencyLargeLogoShow}
                    alt="profile"
                    className="border-2 border-dashed border-black rounded-lg"
                  />
                ) : AgentImages?.agencyLargeLogo ? (
                  <img
                    src={`${BACKEND_BASE_URL}${AgentImages?.agencyLargeLogo}`}
                    alt=""
                    className="border-2 border-dashed border-black rounded-2xl"
                  />
                ) : (
                  <img
                    src={agencyLargeLogo}
                    alt=""
                    className="border-2 border-dashed border-black rounded-2xl"
                  />
                )}

                <div className="w-full text-center text-[#3B8FD4] font-medium text-sm md:text-base">
                  <label
                    htmlFor="agencyLargeLogo"
                    className="px-2 cursor-pointer"
                    onClick={() => {}}
                  >
                    Replace
                    <input
                      id="agencyLargeLogo"
                      type="file"
                      name="agencyLargeLogo"
                      onChange={onChangeImages}
                    />
                  </label>
                  |
                  <span
                    className="px-2 cursor-pointer"
                    onClick={(e) => onDeleteImages(`agencyLargeLogo`)}
                  >
                    Delete
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="font-medium text-xs md:text-sm lg:text-base text-[#404040] py-3 mt-4 md:mt-6">
            Upload your logo for Commercial property (www.realcommercial.com.au)
          </div>

          <div className="border border-[#262626] rounded-lg p-6">
            <div className="flex justify-start items-end gap-2 text-xs md:text-sm lg:text-base text-[#525252]">
              We will resize your logo to the required sizes (For best results
              upload as 172px by 128px).
              <img
                src={questionMark}
                alt="icon"
                className="w-4 md:w-5 mx-1 cursor-pointer"
              />
            </div>

            <div className="w-full flex justify-center md:justify-start items-center  text-white text-xs md:text-sm my-4 md:my-6">
              <label
                htmlFor="allCommercialLogos"
                className="cursor-pointer py-2 px-5 bg-[#E5002A] rounded-3xl"
                onClick={() => {}}
              >
                Upload and replace all logos
                <input
                  id="allCommercialLogos"
                  type="file"
                  multiple
                  name="allCommercialLogos"
                  onChange={onChangeAllCommercialImages}
                />
              </label>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center md:items-end gap-5">
              {/* ----- Small Logo ----- */}
              <div className="flex flex-col justify-center items-center gap-4">
                {AgentImages?.commercialAgencySmallLogoShow ? (
                  <img
                    src={AgentImages?.commercialAgencySmallLogoShow}
                    alt="profile"
                    className="border-2 border-dashed border-black rounded-lg"
                  />
                ) : AgentImages?.commercialAgencySmallLogo ? (
                  <img
                    src={`${BACKEND_BASE_URL}${AgentImages?.commercialAgencySmallLogo}`}
                    alt=""
                    className="border-2 border-dashed border-black rounded-2xl"
                  />
                ) : (
                  <img
                    src={commercialAgencySmallLogo}
                    alt=""
                    className="border-2 border-dashed border-black rounded-2xl"
                  />
                )}

                <div className="w-full text-center text-[#3B8FD4] font-medium text-sm md:text-base">
                  <label
                    htmlFor="commercialAgencySmallLogo"
                    className="px-2 cursor-pointer"
                    onClick={() => {}}
                  >
                    Replace
                    <input
                      id="commercialAgencySmallLogo"
                      type="file"
                      name="commercialAgencySmallLogo"
                      onChange={onChangeImages}
                    />
                  </label>
                  |
                  <span
                    className="px-2 cursor-pointer"
                    onClick={(e) => onDeleteImages(`commercialAgencySmallLogo`)}
                  >
                    Delete
                  </span>
                </div>
              </div>

              {/* ----- Medium Logo ----- */}

              <div className="flex flex-col justify-center items-center gap-4">
                {AgentImages?.commercialAgencyMediumLogoShow ? (
                  <img
                    src={AgentImages?.commercialAgencyMediumLogoShow}
                    alt="profile"
                    className="border-2 border-dashed border-black rounded-lg"
                  />
                ) : AgentImages?.commercialAgencyMediumLogo ? (
                  <img
                    src={`${BACKEND_BASE_URL}${AgentImages?.commercialAgencyMediumLogo}`}
                    alt=""
                    className="border-2 border-dashed border-black rounded-2xl"
                  />
                ) : (
                  <img
                    src={commercialAgencyMediumLogo}
                    alt=""
                    className="border-2 border-dashed border-black rounded-2xl"
                  />
                )}

                <div className="w-full text-center text-[#3B8FD4] font-medium text-sm md:text-base">
                  <label
                    htmlFor="commercialAgencyMediumLogo"
                    className="px-2 cursor-pointer"
                    onClick={() => {}}
                  >
                    Replace
                    <input
                      id="commercialAgencyMediumLogo"
                      type="file"
                      name="commercialAgencyMediumLogo"
                      onChange={onChangeImages}
                    />
                  </label>
                  |
                  <span
                    className="px-2 cursor-pointer"
                    onClick={(e) =>
                      onDeleteImages(`commercialAgencyMediumLogo`)
                    }
                  >
                    Delete
                  </span>
                </div>
              </div>

              {/* ----- Large Logo ----- */}

              <div className="flex flex-col justify-center items-center gap-4">
                {AgentImages?.commercialAgencyLargeLogoShow ? (
                  <img
                    src={AgentImages?.commercialAgencyLargeLogoShow}
                    alt="profile"
                    className="border-2 border-dashed border-black rounded-lg"
                  />
                ) : AgentImages?.commercialAgencyLargeLogo ? (
                  <img
                    src={`${BACKEND_BASE_URL}${AgentImages?.commercialAgencyLargeLogo}`}
                    alt=""
                    className="border-2 border-dashed border-black rounded-2xl"
                  />
                ) : (
                  <img
                    src={commercialAgencyLargeLogo}
                    alt=""
                    className="border-2 border-dashed border-black rounded-2xl"
                  />
                )}

                <div className="w-full text-center text-[#3B8FD4] font-medium text-sm md:text-base">
                  <label
                    htmlFor="commercialAgencyLargeLogo"
                    className="px-2 cursor-pointer"
                    onClick={() => {}}
                  >
                    Replace
                    <input
                      id="commercialAgencyLargeLogo"
                      type="file"
                      name="commercialAgencyLargeLogo"
                      onChange={onChangeImages}
                    />
                  </label>
                  |
                  <span
                    className="px-2 cursor-pointer"
                    onClick={(e) => onDeleteImages(`commercialAgencyLargeLogo`)}
                  >
                    Delete
                  </span>
                </div>
              </div>

              {/* ----- Extra Large Logo ----- */}

              <div className="flex flex-col justify-center items-center gap-4">
                {AgentImages?.commercialAgencyExtraLargeLogoShow ? (
                  <img
                    src={AgentImages?.commercialAgencyExtraLargeLogoShow}
                    alt="profile"
                    className="border-2 border-dashed border-black rounded-lg"
                  />
                ) : AgentImages?.commercialAgencyExtraLargeLogo ? (
                  <img
                    src={`${BACKEND_BASE_URL}${AgentImages?.commercialAgencyExtraLargeLogo}`}
                    alt=""
                    className="border-2 border-dashed border-black rounded-2xl"
                  />
                ) : (
                  <img
                    src={commercialAgencyExtraLargeLogo}
                    alt=""
                    className="border-2 border-dashed border-black rounded-2xl"
                  />
                )}

                <div className="w-full text-center text-[#3B8FD4] font-medium text-sm md:text-base">
                  <label
                    htmlFor="commercialAgencyExtraLargeLogo"
                    className="px-2 cursor-pointer"
                    onClick={() => {}}
                  >
                    Replace
                    <input
                      id="commercialAgencyExtraLargeLogo"
                      type="file"
                      name="commercialAgencyExtraLargeLogo"
                      onChange={onChangeImages}
                    />
                  </label>
                  |
                  <span
                    className="px-2 cursor-pointer"
                    onClick={(e) =>
                      onDeleteImages(`commercialAgencyExtraLargeLogo`)
                    }
                  >
                    Delete
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----------- Upload Hero Image ---------- */}

        <div className="my-2">
          <div className="font-bold text-base md:text-xl lg:text-2xl my-3 md:my-5">
            Upload Hero Image
          </div>
          <div className="w-full border border-[#E5E5E5]" />

          <div className="font-medium text-xs md:text-sm lg:text-base my-3 md:my-5">
            <div>
              Upload the agency logo that you would like to appear on the
              website. Logos must meet our
              <span className="px-2 text-[#3B8FD4] cursor-pointer">
                Acceptable use policy.
              </span>
            </div>
            <div>
              <span className="font-semibold text-[#262626]">JPG, GIF</span>
              {` `}or{` `}
              <span className="font-semibold text-[#262626]">PNG</span>
              {` `} formats only.
            </div>
          </div>

          <div className="border border-[#262626] rounded-lg p-6">
            <div className="flex justify-start items-end gap-2 text-xs md:text-sm lg:text-base text-[#525252]">
              We will resize your logo to the required sizes (For best results
              upload as 510px by 96px).
              <img
                src={questionMark}
                alt="icon"
                className="w-4 md:w-5 mx-1 cursor-pointer"
              />
            </div>

            <div className="w-full flex justify-center md:justify-start items-center  text-white text-xs md:text-sm my-4 md:my-6">
              <label
                htmlFor="heroImg"
                className="cursor-pointer py-2 px-5 bg-[#E5002A] rounded-3xl"
                onClick={() => {}}
              >
                Upload and replace all logos
                <input
                  id="heroImg"
                  type="file"
                  name="heroImg"
                  onChange={onChangeImages}
                />
              </label>
            </div>

            <div className="flex flex-col justify-center items-center gap-4 md:gap-6">
              {AgentImages?.heroImgShow ? (
                <img
                  src={AgentImages?.heroImgShow}
                  alt="profile"
                  className="border-2 border-dashed border-black rounded-lg"
                />
              ) : AgentImages?.heroImg ? (
                <img
                  src={`${BACKEND_BASE_URL}${AgentImages?.heroImg}`}
                  alt=""
                  className="border-2 border-dashed border-black rounded-2xl"
                />
              ) : (
                <img
                  src={heroImg}
                  alt=""
                  className="border-2 border-dashed border-black rounded-2xl"
                />
              )}

              <div className="w-full text-center text-[#3B8FD4] font-medium text-sm md:text-base">
                <label
                  htmlFor="heroImg"
                  className="px-2 cursor-pointer"
                  onClick={() => {}}
                >
                  Replace
                  <input
                    id="heroImg"
                    type="file"
                    name="heroImg"
                    onChange={onChangeImages}
                  />
                </label>
                |
                <span
                  className="px-2 cursor-pointer"
                  onClick={(e) => onDeleteImages(`heroImg`)}
                >
                  Delete
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ----------- Customize colors ---------- */}

        <div className="my-2">
          <div className="font-bold text-base md:text-xl lg:text-2xl my-3 md:my-5">
            Customize colors
          </div>
          <div className="w-full border border-[#E5E5E5]" />

          <div className="flex justify-start items-end gap-2 text-xs md:text-sm lg:text-base text-[#525252] my-3 md:my-5">
            We will resize your logo to the required sizes (For best results
            upload as 510px by 96px).
            <img
              src={questionMark}
              alt="icon"
              className="w-4 md:w-5 mx-1 cursor-pointer"
            />
          </div>

          <div className="border border-[#262626] rounded-lg p-6">
            <div className="font-semibold text-xs md:text-sm lg:text-base">
              Select your primary and secondary colours
            </div>

            <div className="flex flex-row justify-start items-center my-4">
              <div className="flex flex-row justify-start items-center border border-[#737373] rounded-3xl px-5">
                <div className="w-4 h-4 border border-black bg-[#002F4B] rounded-sm"></div>
                <select
                  name="primary_color"
                  value={AgencyBranding?.primary_color}
                  onChange={onChangeInput}
                  className="!text-[#404040] text-xs md:text-sm lg:text-base outline-none py-2 px-5 cursor-pointer"
                >
                  <option value="#002F4B">Primary Color</option>
                  <option value="#111111">Black Dark</option>
                  <option value="#222222">Black </option>
                  <option value="#333333">Black Light</option>
                </select>
              </div>
            </div>

            <div className="flex flex-row justify-start items-center my-4">
              <div className="flex flex-row justify-start items-center border border-[#737373] rounded-3xl px-5">
                <div className="w-4 h-4 border border-black bg-[#FFFFFF] rounded-sm"></div>
                <select
                  name="secondary_color"
                  value={AgencyBranding?.secondary_color}
                  onChange={onChangeInput}
                  className="!text-[#404040] text-xs md:text-sm lg:text-base outline-none py-2 px-5 cursor-pointer"
                >
                  <option value="#FFFFFF">Secondary Color</option>
                  <option value="#111111">Black Dark</option>
                  <option value="#222222">Black </option>
                  <option value="#333333">Black Light</option>
                </select>
              </div>
            </div>

            <div className="font-semibold text-xs md:text-sm lg:text-base">
              Select your text colour
            </div>

            <div className="flex flex-col justify-start items-start gap-3 my-4">
              {TextColor?.length > 0 &&
                TextColor?.map((d, index) => (
                  <div
                    key={index}
                    className={`flex justify-center items-center gap-3 border  rounded-3xl font-medium text-xs md:text-sm cursor-pointer py-2 px-5 ${
                      AgencyBranding?.text_color === d?.name &&
                      `text-[#E5002A] bg-[#FFEAEF] border-[#E5002A]`
                    }`}
                    onClick={() => {
                      setAgencyBranding({
                        ...AgencyBranding,
                        text_color: d?.name,
                      });
                    }}
                  >
                    <div className="grid place-content-center rounded-2xl">
                      <input
                        type="checkbox"
                        checked={AgencyBranding?.text_color === d?.name}
                        name={d?.name}
                        className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                      />
                    </div>
                    <div>{d?.title}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="w-full border border-[#E5E5E5] mt-6" />

        {/* ----------- Button ---------- */}

        <div className="w-full flex justify-start items-center  text-white text-xs md:text-sm mt-4 md:mt-6">
          <button
            className="py-2 px-5 bg-[#E5002A] rounded-3xl"
            onClick={EditAgency}
          >
            Save Changes
          </button>
        </div>
      </div>
    </Layout1>
  );
};
export default EditAgency;
