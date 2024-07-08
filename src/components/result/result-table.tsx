import { ServerDetailsType } from "../main-body";

interface ServerDetailsTableProps {
  serverDetails: ServerDetailsType;
}
export default function ServerDetailsTable({
  serverDetails,
}: ServerDetailsTableProps) {
  return (
    <div>
      <h2 className="text-md font-bold mb-4 text-center">Server Details</h2>
      <table className="table-auto w-full text-sm text-left">
        <tbody>
          <tr>
            <td className="border px-4 py-2 font-semibold">Server Name</td>
            <td className="border px-4 py-2">{serverDetails.ServerName}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Project Name</td>
            <td className="border px-4 py-2">{serverDetails.ProjectName}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Issued Date</td>
            <td className="border px-4 py-2">{serverDetails.IssuedDate}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">CPU</td>
            <td className="border px-4 py-2">{serverDetails.CPU}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">GPU</td>
            <td className="border px-4 py-2">{serverDetails.GPU}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Memory</td>
            <td className="border px-4 py-2">{serverDetails.Memory}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">RAM</td>
            <td className="border px-4 py-2">{serverDetails.RAM}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
