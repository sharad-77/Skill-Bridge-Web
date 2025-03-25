import React from "react";
import { CertificateCard } from "../ui/Card";
import Button from "../ui/Button";

export default function CertificationForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Certification form submitted");
  };

  return (
    <div className="h-full w-full py-5">
      <div className="text-3xl font-bold py-6 px-4 text-[var(--primary-color)]">Certification Tracker</div>
      <div className="h-full w-full grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-10 p-4">
        <div className="h-full w-full ">
          <div className="text-4xl font-semibold p-2">Your Certifications</div>

          <div className="grid grid-col h-full w-full gap-8 px-2 pb-15">
            <CertificateCard
              title={"Certification Name"}
              issuer={"Tulsi Mam"}
              dateObtained={"2025-04-01"}
              expirationDate={"2050-05-05"}
            />

            <CertificateCard
              title={"Certification Name"}
              issuer={"Tulsi Mam"}
              dateObtained={"2025-04-01"}
              expirationDate={"2050-05-05"}
            />

            <CertificateCard
              title={"Certification Name"}
              issuer={"Tulsi Mam"}
              dateObtained={"2025-04-01"}
              expirationDate={"2050-05-05"}
            />
          </div>
        </div>

        <div className="h-full w-full">
          <div className="text-4xl font-semibold p-2">
            Add New Certification
          </div>
          <div className="mx-auto p-6 bg-white rounded-lg border border-gray-300 w-full">
            <h2 className="text-2xl font-bold mb-6">New Certification</h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Certification Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Issuing Organization"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <div className="relative">
                    <input
                      type="date"
                      placeholder="dd-mm-yyyy"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <input
                      type="date"
                      placeholder="dd-mm-yyyy"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <Button
                    Varient="primary"
                    className="px-6 py-3 w-full h-full"
                  >
                    Add Certification
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}