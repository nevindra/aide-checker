import SearchForm from "./search-form";
import { ServerDetailsType, NotFoundType } from "../main-body";

interface SearchBoxProps {
  setServerDetails: (details: ServerDetailsType[]) => void;
  setLoading: (isLoading: boolean) => void;
  setNotFound: (notFound: NotFoundType[]) => void;
}

export default function SearchBox({
  setServerDetails,
  setLoading,
  setNotFound,
}: SearchBoxProps) {
  return (
    <div className="flex flex-col items-center">
      <SearchForm
        setServerDetails={setServerDetails}
        setLoading={setLoading}
        setNotFound={setNotFound}
      />
    </div>
  );
}
