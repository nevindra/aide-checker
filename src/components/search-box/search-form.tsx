import { useState } from "react";
import { ServerDetailsType, NotFoundType } from "../main-body";

interface SearchFormProps {
  setServerDetails: (details: ServerDetailsType[]) => void;
  setLoading: (isLoading: boolean) => void;
  setNotFound: (notFound: NotFoundType[]) => void;
}

export default function SearchForm({
  setServerDetails,
  setLoading,
  setNotFound,
}: SearchFormProps) {
  const [serialNumber, setSerialNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers, alphabets, and commas in the input
    const value = e.target.value;
    const validValue = value.replace(/[^a-zA-Z0-9,]/g, "");
    setSerialNumber(validValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setButtonLoading(true);
    setLoading(true);
    if (serialNumber === "") {
      setErrorMessage("Please enter at least one serial number");
      setLoading(false);
      setButtonLoading(false);
      return;
    }
    const serialNumbers = serialNumber.split(",").map((sn) => sn.trim());
    const uniqueSerialNumbers = [...new Set(serialNumbers)]; // Remove duplicates

    try {
      const response = await fetch("/api/getAppliancesData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serialNumbers: uniqueSerialNumbers }),
      });

      if (response.ok) {
        const details = await response.json();
        // map the details array object and check if the found is false
        const notFound = details.filter(
          (detail: ServerDetailsType) => detail.found === false,
        );
        if (notFound.length > 0) {
          setNotFound(notFound);
        } else {
          setNotFound([]);
        }
        setServerDetails(details);
        setErrorMessage("");
      } else {
        setErrorMessage("No details found for these serial numbers");
        setServerDetails([]);
      }
    } catch (error) {
      console.error("Error fetching server details:", error);
      setErrorMessage("An error occurred while fetching server details");
      setServerDetails([]);
    } finally {
      setLoading(false);
      setButtonLoading(false);
    }
  };

  return (
    <div className="card p-8 bg-base-200 shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-2 text-center">
        Search Serial Number
      </h1>
      <p className="text-sm mb-3 text-center">
        Search for the serial number of the appliance you want to check.
      </p>
      <form className="form-control" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter serial number(s) separated by commas"
          className="input input-bordered w-full mb-4 text-sm"
          value={serialNumber}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className={`btn btn-success w-full ${
            buttonLoading ? "btn-disabled" : ""
          }`}
        >
          {buttonLoading ? "Searching..." : "Search"}
        </button>
      </form>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
    </div>
  );
}
