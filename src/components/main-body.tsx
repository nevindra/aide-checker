"use client";
import { useState } from "react";

import ResultCollapse from "./result/result-collapse";
import InfoAlert from "./alert/info-alert";
import SearchBox from "./search-box/search-card";
import Loading from "./loading/loading";
import InfoError from "./alert/info-error";

export interface ServerDetailsType {
  found: boolean;
  SerialNumber: string;
  ServerName: string;
  ProjectName: string;
  IssuedDate: string;
  CPU: string;
  GPU: string;
  Memory: string;
  RAM: string;
}

export interface NotFoundType {
  found: boolean;
  SerialNumber: string;
}

export default function MainBody() {
  const [serverDetails, setServerDetails] = useState<ServerDetailsType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<NotFoundType[]>([]);

  return (
    <div className="flex flex-col flex-grow p-2 m-3 overflow-y-auto items-center">
      <div className="w-full max-w-md">
        <InfoAlert />
        <SearchBox
          setServerDetails={setServerDetails}
          setLoading={setLoading}
          setNotFound={setNotFound}
        />
        {notFound.length !== 0 && <InfoError serverDetails={notFound} />}
        {loading && <Loading />}
        {serverDetails && !loading && (
          <div className="w-full">
            <ResultCollapse serverDetailsList={serverDetails} />
          </div>
        )}
      </div>
    </div>
  );
}
