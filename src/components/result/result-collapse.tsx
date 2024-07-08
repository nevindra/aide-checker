import { ServerDetailsType } from "../main-body";
import ServerDetailsTable from "./result-table";

export interface ResultCollapseProps {
  serverDetailsList: ServerDetailsType[];
}

export default function ResultCollapse({
  serverDetailsList,
}: ResultCollapseProps) {
  const serverDetailsElements = [];

  for (const key in serverDetailsList) {
    if (
      serverDetailsList.hasOwnProperty(key) &&
      serverDetailsList[key].found === true
    ) {
      const serverDetails = serverDetailsList[key];
      serverDetailsElements.push(
        <div
          key={key}
          className="collapse my-3 border-base-300 bg-base-300 shadow-md w-full max-w-md"
        >
          <input type="checkbox" />
          <div className="collapse-title text-l font-bold text-center px-5">
            Serial Number: {serverDetails.SerialNumber}
          </div>
          <div className="collapse-content max-h-64 overflow-y-auto">
            <ServerDetailsTable serverDetails={serverDetails} />
          </div>
        </div>,
      );
    }
  }

  return <div className="w-full max-w-md">{serverDetailsElements}</div>;
}
