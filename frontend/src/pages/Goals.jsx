import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Header from "../components/Header";
import Gauge from "../components/Gauge";
import AdjustBTN from "../components/AdjustBTN";
import ExpensesGoalsBTN from "../components/ExpensesGoalsBTN";
import Housing from "../assets/Housing.svg";
import PopUpInput1 from "../components/PopUpInput1";
import PopUpInput2 from "../components/PopUpInput2";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
];

export default function Goals() {
  const [isUser, setisUser] = useState({});
  const [pop1, setPop1] = useState(false);
  const [pop2, setPop2] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user && user.token) {
      const decoded = jwtDecode(user.token);
      axios
        .get(`http://localhost:5000/user/${decoded._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setisUser(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  return (
    <div className="flex h-[1024px]">
      <Navbar name={isUser.name} />
      <div className="px-8 pb-5 w-[1440px]">
        {/* Dashboard Header */}
        <Header className="hidden" />
        <div className="flex flex-col gap-3">
          <h1 className="text-neutral text-[22px]">Goals</h1>
          <div className="flex gap-6 relative">
            <div className="flex flex-col bg-white rounded-md w-[368px] py-6 px-5 gap-5 drop-shadow-lg">
              <div className="flex w-full justify-between items-center">
                <h1 className="font-bold text-base">Savings Goal</h1>
                <select className="select w-[156px]">
                  <option>01 May ~ 31 May</option>
                  <option>Marge</option>
                  <option>Bart</option>
                  <option>Lisa</option>
                  <option>Maggie</option>
                </select>
              </div>
              <div className="flex gap-8">
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M18.5833 4H5.41667C5.04094 4 4.68061 4.15223 4.41493 4.42319C4.14926 4.69416 4 5.06167 4 5.44487V9.62736C4.00035 9.90501 4.07914 10.1767 4.22692 10.4099C4.37471 10.643 4.58525 10.8279 4.83333 10.9422L10.05 13.3602C9.27758 13.8011 8.67035 14.4908 8.32341 15.3213C7.97647 16.1518 7.90942 17.0762 8.13277 17.9498C8.35612 18.8233 8.85724 19.5966 9.55765 20.1486C10.2581 20.7006 11.1182 21 12.0033 21C12.8885 21 13.7486 20.7006 14.449 20.1486C15.1494 19.5966 15.6505 18.8233 15.8739 17.9498C16.0972 17.0762 16.0302 16.1518 15.6833 15.3213C15.3363 14.4908 14.7291 13.8011 13.9567 13.3602L19.1667 10.9422C19.4148 10.8279 19.6253 10.643 19.7731 10.4099C19.9209 10.1767 19.9996 9.90501 20 9.62736V5.44487C20 5.06167 19.8507 4.69416 19.5851 4.42319C19.3194 4.15223 18.9591 4 18.5833 4ZM14.6667 5.35988V11.5363L12 12.7721L9.33333 11.5363V5.35988H14.6667ZM5.33333 9.62736V5.44487C5.33333 5.42233 5.34211 5.40071 5.35774 5.38477C5.37337 5.36884 5.39457 5.35988 5.41667 5.35988H8V10.9175L5.3825 9.7047C5.36788 9.698 5.35546 9.68713 5.34674 9.67342C5.33802 9.6597 5.33337 9.64371 5.33333 9.62736ZM12 19.6386C11.4726 19.6386 10.957 19.4791 10.5185 19.1803C10.0799 18.8814 9.73815 18.4566 9.53632 17.9597C9.33449 17.4627 9.28168 16.9158 9.38457 16.3883C9.48747 15.8607 9.74144 15.3761 10.1144 14.9957C10.4873 14.6153 10.9625 14.3563 11.4798 14.2514C11.997 14.1464 12.5332 14.2003 13.0205 14.4061C13.5078 14.612 13.9242 14.9606 14.2173 15.4078C14.5103 15.8551 14.6667 16.3809 14.6667 16.9189C14.6667 17.6402 14.3857 18.332 13.8856 18.842C13.3855 19.3521 12.7072 19.6386 12 19.6386ZM18.6667 9.62736C18.6666 9.64371 18.662 9.6597 18.6533 9.67342C18.6445 9.68713 18.6321 9.698 18.6175 9.7047L16 10.9175V5.35988H18.5833C18.6054 5.35988 18.6266 5.36884 18.6423 5.38477C18.6579 5.40071 18.6667 5.42233 18.6667 5.44487V9.62736Z"
                          fill="#525256"
                        />
                      </svg>
                      <p className="text-xs text-neutral">Target Achieved</p>
                    </div>
                    <h1 className="ml-6 font-bold text-base">$12,500</h1>
                  </div>
                  <div>
                    <div className=" flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M18.9187 5.08328H18.9176L20.7772 5.45514C20.8771 5.47512 20.9592 5.54838 20.988 5.64717C21.0026 5.69516 21.0039 5.74621 20.9918 5.79488C20.9797 5.84354 20.9546 5.88802 20.9192 5.92357L19.3958 7.44874C19.2136 7.63075 18.9666 7.73295 18.709 7.73291H17.4464L14.2731 10.9087C14.3337 11.1374 14.3448 11.3763 14.3058 11.6097C14.2668 11.843 14.1785 12.0653 14.0469 12.2619C13.9152 12.4584 13.7432 12.6246 13.5424 12.7494C13.3415 12.8742 13.1163 12.9548 12.8819 12.9857C12.6474 13.0166 12.4091 12.9972 12.1827 12.9288C11.9564 12.8603 11.7472 12.7444 11.5691 12.5887C11.3911 12.4331 11.2482 12.2412 11.1501 12.026C11.0519 11.8107 11.0008 11.5771 11 11.3405C11.0002 11.0851 11.059 10.8331 11.172 10.6041C11.2851 10.375 11.4492 10.175 11.6518 10.0196C11.8544 9.86411 12.09 9.75733 12.3404 9.70748C12.5908 9.65762 12.8493 9.66604 13.0959 9.73206L16.2703 6.55517V5.29308C16.2703 5.03555 16.3724 4.78802 16.5543 4.60597L18.0788 3.0808C18.1144 3.04542 18.1588 3.02034 18.2075 3.00822C18.2561 2.9961 18.3071 2.9974 18.3551 3.01198C18.4539 3.04084 18.5271 3.12298 18.5471 3.22288L18.9187 5.08328Z"
                          fill="#525256"
                        />
                        <path
                          d="M4.79654 12.0039C4.79777 13.0338 5.01985 14.0514 5.44777 14.9882C5.8757 15.9249 6.49953 16.759 7.27719 17.4341C8.05484 18.1093 8.96823 18.6098 9.95574 18.9019C10.9432 19.1939 11.9819 19.2708 13.0017 19.1273C14.0214 18.9838 14.9985 18.6233 15.8671 18.07C16.7357 17.5167 17.4755 16.7836 18.0367 15.92C18.5978 15.0565 18.9673 14.0826 19.1201 13.0642C19.273 12.0457 19.2056 11.0063 18.9226 10.016C18.8829 9.90033 18.8671 9.77776 18.8763 9.65578C18.8854 9.5338 18.9193 9.41495 18.9758 9.30648C19.0323 9.19801 19.1104 9.10218 19.2051 9.02483C19.2999 8.94747 19.4094 8.89021 19.5269 8.85653C19.6445 8.82285 19.7677 8.81345 19.8891 8.82892C20.0104 8.84438 20.1273 8.88437 20.2327 8.94646C20.3381 9.00855 20.4297 9.09145 20.5021 9.19009C20.5744 9.28874 20.6259 9.40107 20.6534 9.52026C21.2014 11.4379 21.0973 13.4832 20.3575 15.3353C19.6177 17.1875 18.284 18.7416 16.5658 19.7538C14.8475 20.7661 12.8418 21.1793 10.8634 20.9285C8.88499 20.6778 7.04579 19.7773 5.63434 18.3683C4.22442 16.9571 3.32305 15.1175 3.07175 13.1385C2.82044 11.1594 3.23343 9.15295 4.24588 7.43406C5.25833 5.71517 6.8129 4.38122 8.66551 3.64163C10.5181 2.90204 12.5639 2.79871 14.4816 3.34785C14.7099 3.4146 14.9026 3.56904 15.0174 3.77741C15.1322 3.98578 15.1599 4.23113 15.0944 4.45986C15.0289 4.68858 14.8755 4.88208 14.6678 4.99806C14.4601 5.11404 14.2149 5.14307 13.9859 5.07881C12.9135 4.77111 11.7844 4.71673 10.6874 4.91996C9.59045 5.12318 8.5557 5.57847 7.66472 6.24991C6.77373 6.92135 6.05088 7.7906 5.55315 8.78912C5.05541 9.78764 4.79641 10.8881 4.79654 12.0039Z"
                          fill="#525256"
                        />
                        <path
                          d="M8.6672 11.9997C8.66726 12.607 8.83314 13.2028 9.14693 13.7228C9.46073 14.2428 9.91053 14.6672 10.4478 14.9503C10.9851 15.2334 11.5895 15.3645 12.1958 15.3293C12.8021 15.2941 13.3873 15.0941 13.8883 14.7508C14.3892 14.4066 14.7864 13.9321 15.0371 13.3784C15.2878 12.8248 15.3823 12.2132 15.3105 11.6097C15.2911 11.4633 15.3111 11.3143 15.3684 11.1781C15.4256 11.042 15.5182 10.9235 15.6365 10.835C15.7547 10.7465 15.8945 10.6911 16.0413 10.6746C16.1881 10.658 16.3366 10.6809 16.4716 10.7408C16.6066 10.8 16.7235 10.8939 16.8104 11.0129C16.8972 11.132 16.951 11.272 16.9661 11.4186C17.0868 12.4498 16.8835 13.493 16.3844 14.4035C15.8853 15.3139 15.1152 16.0464 14.1809 16.4993C13.2466 16.9522 12.1945 17.103 11.1706 16.9307C10.1468 16.7585 9.20188 16.2718 8.46716 15.5382C7.73243 14.8046 7.24431 13.8605 7.07053 12.8369C6.89676 11.8132 7.04595 10.7609 7.4974 9.82593C7.94886 8.89095 8.68017 8.1197 9.58986 7.61923C10.4995 7.11876 11.5425 6.91388 12.5739 7.03305C12.6843 7.04329 12.7916 7.07548 12.8894 7.12773C12.9873 7.17998 13.0737 7.25123 13.1436 7.33731C13.2136 7.42339 13.2656 7.52256 13.2967 7.62902C13.3279 7.73548 13.3374 7.84708 13.3248 7.95728C13.3123 8.06748 13.2778 8.17406 13.2235 8.27077C13.1692 8.36749 13.0962 8.45239 13.0086 8.5205C12.9211 8.58861 12.8208 8.63857 12.7137 8.66743C12.6067 8.6963 12.4949 8.70349 12.385 8.6886C11.9179 8.63437 11.4447 8.67956 10.9963 8.82121C10.548 8.96285 10.1347 9.19775 9.78358 9.51046C9.43246 9.82317 9.15147 10.2066 8.95907 10.6356C8.76666 11.0647 8.66719 11.5295 8.6672 11.9997Z"
                          fill="#525256"
                        />
                      </svg>
                      <p className="text-xs text-neutral">This month Target</p>
                    </div>
                    <h1 className="ml-6 font-bold text-base">$20,000</h1>
                  </div>
                </div>
                <div className="">
                  <Gauge value={12000} />
                </div>
              </div>
              <div className="flex justify-center">
                <AdjustBTN set={() => setPop1(true)} text="Adjust Goal" />
              </div>
            </div>

            <div className="flex flex-col bg-white p-2 rounded-md drop-shadow-lg w-[712px]">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold">Monthly Comparison</h2>
                <div className="flex gap-6 ">
                  <div className="flex gap-2 items-center">
                    <span className="w-4 h-2 bg-primary"></span>
                    <p className="text-xs">This Month</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="w-4 h-2 bg-[#E8E8E8]"></span>
                    <p className="text-xs">Last Month</p>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={292}>
                <AreaChart
                  data={data}
                  margin={{ top: 20, right: 10, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stackId="1"
                    stroke="#299D91"
                    fill="#299D91"
                  />
                  <Area
                    type="monotone"
                    dataKey="pv"
                    stackId="1"
                    stroke="#D1D1D1"
                    fill="#ffffff"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {pop1 && <PopUpInput1 set={() => setPop1(false)} />}
            {pop2 && <PopUpInput2 set={() => setPop2(false)} />}
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-neutral text-[22px]">
              Expenses Goals by Category
            </h1>
            <div className="grid grid-flow-row grid-cols-3 grid-rows-2 gap-4">
              <ExpensesGoalsBTN
                img={Housing}
                userId={isUser._id}
                text="housing"
                set={() => setPop2(true)}
              />
              <ExpensesGoalsBTN
                img={Housing}
                userId={isUser._id}
                text="food"
                set={() => setPop2(true)}
              />
              <ExpensesGoalsBTN
                img={Housing}
                userId={isUser._id}
                text="transportation"
                set={() => setPop2(true)}
              />
              <ExpensesGoalsBTN
                img={Housing}
                userId={isUser._id}
                text="entertainment"
                set={() => setPop2(true)}
              />
              <ExpensesGoalsBTN
                img={Housing}
                userId={isUser._id}
                text="shopping"
                set={() => setPop2(true)}
              />
              <ExpensesGoalsBTN
                img={Housing}
                userId={isUser._id}
                text="others"
                set={() => setPop1(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
